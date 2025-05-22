import { useEffect, useState } from "react";

export const useDebouncedValue = (inputValue, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(inputValue);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, delay]);
  
    return debouncedValue;
};

export const getUrlParameter = (paramName) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);
};

export const setUrlParameter = (paramName, paramValue) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set(paramName, paramValue);
  return urlParams;
};

export const deleteUrlParameter = (paramName) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.delete(paramName);
  return urlParams;
};

export const afterMapLoad = (map, fn) => {
  if(map._loaded) {
    fn();
  } else {
    map?.on("load", () => {
      fn();
    });
  }
};

export const isWebglSupported = () => {
  if (window.WebGLRenderingContext) {
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (context && typeof context.getParameter == "function") {
        return true;
      }
    } catch (e) {
      // WebGL is supported, but disabled
    }
    return false;
  }
  // WebGL not supported
  return false;
}