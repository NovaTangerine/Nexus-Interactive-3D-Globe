import { useEffect, useRef } from 'react';

export function BackgroundGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };
    
    const animate = () => {
      const { targetX, targetY, currentX, currentY } = mouseRef.current;
      
      // Lerp factor determines the "drag" or "lag" (lower = more drag)
      const lerpFactor = 0.08;
      
      mouseRef.current.currentX += (targetX - currentX) * lerpFactor;
      mouseRef.current.currentY += (targetY - currentY) * lerpFactor;
      
      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${mouseRef.current.currentX}px`);
        containerRef.current.style.setProperty('--y', `${mouseRef.current.currentY}px`);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize to center of screen
    mouseRef.current.targetX = window.innerWidth / 2;
    mouseRef.current.targetY = window.innerHeight / 2;
    mouseRef.current.currentX = window.innerWidth / 2;
    mouseRef.current.currentY = window.innerHeight / 2;
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // SVG for the base faint grid (thinner stroke, square caps)
  const basePlusSvg = `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 9V15M9 12H15' stroke='black' stroke-width='0.3' /%3E%3C/svg%3E`;
  
  // SVG for the hovered highlight grid (slightly thicker stroke, square caps)
  const hoverPlusSvg = `data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 9V15M9 12H15' stroke='black' stroke-width='0.75' /%3E%3C/svg%3E`;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-[#f8fafc] pointer-events-none z-0">
      {/* Base faint grid */}
      <div 
        className="absolute inset-0 opacity-[0.12]" 
        style={{ 
          backgroundImage: `url("${basePlusSvg}")`, 
          backgroundSize: '56px 56px',
          backgroundPosition: 'center center'
        }} 
      />
      
      {/* Highlight grid that follows cursor */}
      <div 
        className="absolute inset-0 transition-opacity duration-300"
        style={{ 
          WebkitMaskImage: `
            radial-gradient(280px 90px at var(--x, 50vw) var(--y, 50vh), black 0%, transparent 100%),
            radial-gradient(90px 280px at var(--x, 50vw) var(--y, 50vh), black 0%, transparent 100%)
          `,
          maskImage: `
            radial-gradient(280px 90px at var(--x, 50vw) var(--y, 50vh), black 0%, transparent 100%),
            radial-gradient(90px 280px at var(--x, 50vw) var(--y, 50vh), black 0%, transparent 100%)
          `
        }}
      >
        <div 
          className="absolute inset-0 opacity-90"
          style={{ 
            background: 'radial-gradient(circle 240px at var(--x, 50vw) var(--y, 50vh), #d946ef 0%, #6366f1 40%, #ec4899 100%)',
            WebkitMaskImage: `url("${hoverPlusSvg}")`, 
            maskImage: `url("${hoverPlusSvg}")`, 
            WebkitMaskSize: '56px 56px',
            maskSize: '56px 56px',
            WebkitMaskPosition: 'center center',
            maskPosition: 'center center'
          }} 
        />
      </div>
    </div>
  );
}
