"use client";
import { useEffect, useRef, useState } from "react";

export function useMouse(externalRef) {
  const internalRef = useRef(null);
  const ref = externalRef ?? internalRef;
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handler = (e) => {
      let x, y;
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
        y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      } else {
        x = e.clientX / window.innerWidth;
        y = e.clientY / window.innerHeight;
      }
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [ref]);

  return { x: pos.x, y: pos.y, raw: pos, ref };
}
