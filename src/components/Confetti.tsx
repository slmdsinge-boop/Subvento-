"use client";
import { useEffect, useState } from "react";
export function Confetti() {
 const [visible, setVisible] = useState(true);
 useEffect(() => {
  const timeout = setTimeout(() => setVisible(false), 3500);
  return () => clearTimeout(timeout);
 }, []);
 if (!visible) return null;
 return (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
   {Array.from({ length: 35 }, (_, i) => (
    <span key={i} className="absolute animate-confetti" style={{
     left: `${(i * 73) % 100}%`,
     top: "-20px",
     width: "8px",
     height: "14px",
     borderRadius: "2px",
     background: ["#c9a24a", "#2f6f5a", "#8fae6f"][i % 3],
     animationDelay: `${(i % 12) * 0.12}s`,
    }} />
   ))}
  </div>
 );
}
