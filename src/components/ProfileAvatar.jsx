import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileAvatar = ({ defaultImg, hoverImg, className = "w-48 h-48" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-full cursor-pointer group shrink-0 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)} // For mobile toggle
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Subtle Glow Effect */}
      <div className="absolute -inset-1 bg-primary rounded-full blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700"></div>

      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-outline-variant group-hover:border-primary transition-colors duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(0,122,204,0.3)]">
        <AnimatePresence initial={false} mode="wait">
          {!isHovered ? (
            <motion.img
              key="human"
              src={defaultImg}
              alt="Developer Profile"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          ) : (
            <motion.img
              key="robot"
              src={hoverImg}
              alt="AI Profile"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProfileAvatar;
