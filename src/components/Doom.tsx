"use client";

import { useEffect } from "react";

declare global{
  interface Window {
    Module ?: any;
  }
}

export function Doom(){
  useEffect(()=>{
  window.Module = {
    locateFile: (path:string) => `${path}`,
    canvas: document.getElementById("canvas"),
    print: (text:string) => console.log(text),
    printErr: (text:string) => console.error(text),
  };
    const script = document.createElement("script");
    script.src ="/doomgeneric.js";
    script.async = true;
    document.body.appendChild(script);
    return ()=>{
      document.body.removeChild(script);
      delete window.Module;
    }
  },[]);

  return (<canvas  className="emscripten" id="canvas" onContextMenu={(e)=>e.preventDefault()} tabIndex={-1}></canvas>)
    
}
