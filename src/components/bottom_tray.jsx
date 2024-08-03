import React from "react";
import classNames from "classnames";

const COLLAPSED_HEIGHT = 200;

const getCoordinatesFromEvent = (e) => {
    let [x, y] = [0, 0];
    if (e.clientX) {
      x = e.clientX;
      y = e.clientY;
    } else if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    return [x, y];
  };

class BottomTray extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          x: null,
          y: null,
          move: 0,
          resized: 0,
          bodyHeight: null,
        };
        this.mouseTime = 0;
        this.secondInterval = null;
    }
    
    componentDidMount() {
        (window.visualViewport || window).addEventListener("resize", this.onResize);
        this.onResize();
        window.addEventListener("mousemove", this.onPointerMove, { passive: true });
        window.addEventListener("touchmove", this.onPointerMove, { passive: true });
        window.addEventListener("mouseup", this.onPointerUp, { passive: true });
        window.addEventListener("touchend", this.onPointerUp, { passive: true });
    }
    
    componentWillUnmount() {
        clearInterval(this.secondInterval);
        (window.visualViewport || window).removeEventListener("resize", this.onResize);
        window.removeEventListener("mousemove", this.onPointerMove, {
          passive: true,
        });
        window.removeEventListener("touchmove", this.onPointerMove, {
          passive: true,
        });
        window.removeEventListener("mouseup", this.onPointerUp, { passive: true });
        window.removeEventListener("touchend", this.onPointerUp, { passive: true });
    }
    
      componentDidUpdate(prevProps) {
        const { bodyHeight: newBodyHeight } = this.props;
        const { bodyHeight } = prevProps;
        const { move } = this.state;
    
        // Handle resize for bottom tray sizing
        const delta = bodyHeight ? newBodyHeight - bodyHeight : 0;
        this.setState({
          move: move < -COLLAPSED_HEIGHT ? move - delta : move,
        });
    
    }
    
    onPointerDown = (e) => {
        if (window.innerWidth > 999) {
          return;
        }
        const [x, y] = getCoordinatesFromEvent(e);
        this.mouseTime = performance.now();
        this.setState({ x, y });
    };
    
    onPointerMove = (e) => {
        e.stopPropagation();
        if (this.state.x === null) {
          return;
        }
        const [x, y] = getCoordinatesFromEvent(e);
        this.setState(({ move }) => ({
            move: Math.max(
                move + y - this.state.y,
                -window.innerHeight + COLLAPSED_HEIGHT,
            ),
            y,
        }));
    };
    
    onPointerUp = () => {
        if (this.state.x === null) {
            return;
        }
        this.setState({
          x: null,
          y: null,
        });
        if (this.state.move < -COLLAPSED_HEIGHT - 50) {
          // Touch moved up by a significant value above the midway height
          this.setState({
            move: -window.innerHeight + COLLAPSED_HEIGHT,
          });
        }
        else {
          // Touch moved up but not significant
          this.setState({
            move: 0,
          });
        }
    };

    onResize = () => {
        this.setState({
            bodyHeight: window.visualViewport?.height || window.innerHeight,
        });
    };
    render() {
        const {
            children,
            headerContent,
          } = this.props;
          const { move, bodyHeight } = this.state;
          return (
            <div
                id="bottom-tray"
                style={{
                    top: `${bodyHeight - COLLAPSED_HEIGHT + move}px`,
                    height: `${
                        -move + COLLAPSED_HEIGHT
                    }px`,
                }}
                className={classNames({
                    "sharp-corners": move < -COLLAPSED_HEIGHT,
                })}
            >
                <div id="bottom-tray-drag-indicator" />
                <div
                    id="bottom-tray-header"
                    onMouseDown={this.onPointerDown}
                    onTouchStart={this.onPointerDown}
                >
                    { headerContent }
                </div>
                <div id="bottom-tray-content">
                    { children }
                </div>
            </div>
          )
    }
};

export default BottomTray;
