"use client";
import { useEffect, useState } from "react";
export function useBlink() {
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    let timeout;
    function schedule() {
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => { setIsBlinking(false); schedule(); }, 120);
      }, 2200 + Math.random() * 2000);
    }
    schedule();
    return () => clearTimeout(timeout);
  }, []);
  return isBlinking;
}
