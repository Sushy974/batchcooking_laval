"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Révèle son contenu (fondu + léger glissement) quand il entre dans le viewport.
 * - `prefers-reduced-motion` est neutralisé globalement (globals.css) : la
 *   transition devient instantanée → le contenu apparaît sans animation.
 * - À NE PAS utiliser sur l'élément LCP (hero) : un fondu d'opacité y dégrade le LCP.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
