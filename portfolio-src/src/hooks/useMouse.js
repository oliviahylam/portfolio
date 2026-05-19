"use client";
import { useEffect, useRef, useState } from "react";
export function useMouse() {
  const [pos, setPos] = useState({ mx: 0.5, my: 0.5 });
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        setPos({ mx: Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)), my: Math.max(0,Math.min(1,(e.clientY-r.top)/r.height)) });
      } else {
        setPos({ mx: e.clientX/window.innerWidth, my: e.clientY/window.innerHeight });
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return { ...pos, ref };
}
