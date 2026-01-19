"use client"

import { useState, useEffect } from "react"

declare global {
  interface Window {
    Module?: any
  }
}

function RunDoom({ onClose }) {
  return (
    <>
      <div className="freedoom-blur" onClick={onClose} />
      <div className="freedoom-computer">
        <div className="freedoom-title">FREEDOOM</div>
      <div className="freedoom-dialog">
        <iframe
          src="/doom.html"
          className="freedoom-iframe"
          allow="autoplay"
        />
        <div className="freedoom-scanline"></div>
      </div>
      </div>
    </>
  )
}

function RunDoom2({ setToggle }) {
  function shutdown(){
    window.location.reload()
  }
  useEffect(() => {
    if (!window.Module) {
      window.Module = {
        locateFile: (path: string) => `${path}`,
        canvas: document.getElementById("canvas"),
        print: (text: string) => console.log(text),
        printErr: (text: string) => console.error(text),
      }

    }
      const script = document.createElement("script")
      script.src = `/doomgeneric.js`
      script.id = "freedoom-script"
      script.async = true
      document.body.appendChild(script)
  }, [])

  return (
    <>
      <div className="freedoom-blur" onClick={() => shutdown()}></div>
      <div className="freedoom-dialog">
        <canvas
          className="freedoom-canvas"
          id="canvas"
          onContextMenu={(e) => e.preventDefault()}
          tabIndex={-1}
        ></canvas>
        <div className="freedoom-scanline"></div>
      </div>
    </>
  )
}

export function OldDoom() {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <button
        onClick={() => setToggle(true)}
        className="launch-freedoom-button"
      >
        FREEDOOM
      </button>
      {toggle && <RunDoom key={Date.now()} setToggle={setToggle} />}
    </>
  )
}

export function Doom() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="launch-freedoom-button" onClick={() => setOpen(true)}>FREEDOOM</button>
      {open && <RunDoom onClose={() => setOpen(false)} />}
    </>
  )
}
