import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 42;

export default function GravityTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -500, y: -500, active: false };
    let frameId;
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        x: width * (0.32 + Math.random() * 0.36),
        y: height * (0.25 + Math.random() * 0.5),
        vx: 0,
        vy: 0,
        size: 1.2 + Math.random() * 2.8,
        opacity: 0.15 + (index / PARTICLE_COUNT) * 0.55,
        delay: index * 0.018,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        if (pointer.active) {
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distance = Math.max(80, Math.hypot(dx, dy));
          const pull = Math.min(0.95, 1200 / (distance * distance));
          particle.vx += dx * pull;
          particle.vy += dy * pull;
        }
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;
        context.beginPath();
        context.fillStyle = `rgba(255,255,255,${particle.opacity})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      if (!reducedMotion) frameId = requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      if (reducedMotion) draw();
    };
    const onPointerLeave = () => { pointer.active = false; };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="gravity-trail" aria-hidden="true" />;
}
