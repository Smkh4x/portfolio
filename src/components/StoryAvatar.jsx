import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const StoryAvatar = ({ defaultImg, hoverImg, className = "w-48 h-48" }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Spring for the mask radius size (expands on hover)
  const maskRadius = useSpring(0, { damping: 20, stiffness: 150 });

  useEffect(() => {
    // When hovered, expand mask. When not, shrink to 0.
    maskRadius.set(isHovered ? 80 : 0);
  }, [isHovered, maskRadius]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Calculate mouse position relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    // Instantly set mouse position so mask doesn't fly in from corner
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Build the dynamic CSS mask image string
  const maskImage = useTransform(
    [smoothX, smoothY, maskRadius],
    ([x, y, radius]) => `radial-gradient(circle at ${x}px ${y}px, black 0%, black ${radius}px, transparent ${radius + 30}px)`
  );

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* AI Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? -20 : -10 }}
        className="absolute top-0 flex items-center gap-2 pointer-events-none z-10"
      >
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#007acc]"></div>
        <span className="text-primary font-bold text-[10px] tracking-widest font-editor-code uppercase bg-surface-container/80 px-2 py-0.5 rounded backdrop-blur-sm border border-primary/30">
          AI Mode Active
        </span>
      </motion.div>

      {/* Main Circular Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full rounded-full cursor-crosshair overflow-hidden border-2 border-outline-variant hover:border-primary transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
      >
        {/* Glow behind everything, activates on hover */}
        <div className={`absolute -inset-1 bg-primary rounded-full blur-xl transition-opacity duration-700 ${isHovered ? 'opacity-30' : 'opacity-0'}`}></div>

        {/* 1. Base Human Image */}
        <img
          src={defaultImg}
          alt="Developer Profile"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 pointer-events-none"
        />

        {/* 2. Masked AI/Robot Layer */}
        <motion.div
          style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src={hoverImg}
            alt="AI Profile"
            className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-125"
          />
          
          {/* Subtle scanline overlay just inside the mask */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_50%,rgba(0,122,204,0.3)_50%)] bg-[length:100%_4px] animate-[scanlines_1s_linear_infinite]"></div>
          
          {/* Glow ring around the revealed edge (using a trick: a border on the mask edge isn't possible, but we can do an inner shadow or brightness tweak. Here the radial-gradient mask fade acts as a soft edge.) */}
        </motion.div>

        {/* Scanline animation keyframes */}
        <style>{`
          @keyframes scanlines {
            0% { background-position: 0 0; }
            100% { background-position: 0 4px; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default StoryAvatar;
