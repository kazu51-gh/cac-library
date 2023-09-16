"use client"

import { useState } from "react";

export default function Tooltip({children, text}: {children: React.ReactNode, text: string}) {
  const [show, setShow] = useState(false);
  let timeout: NodeJS.Timeout;

  function handleMouseEnter() {
    timeout = setTimeout(() => {
      setShow(true);
    }, 500);
  }

  function handleMouseLeave() {
    if (timeout) {
      clearTimeout(timeout);
    }
    setShow(false);
  }

  return (
    <div className="relative cursor-pointer"  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {show && 
        <div className="absolute bg-secondary shadow-xl rounded-md p-4 font-semibold text-sm">{text}</div>
      }
    </div>
  );
}