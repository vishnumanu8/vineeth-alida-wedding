import React from 'react';
import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0.07,
  className = '',
  animateBy = 'words',
  direction = 'bottom',
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {elements.map((element, i) => (
        <motion.span
          key={i}
          initial={{
            filter: 'blur(10px)',
            opacity: 0,
            y: direction === 'top' ? -14 : 14,
          }}
          whileInView={{
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{
            duration: 0.6,
            delay: i * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block will-change-[filter,transform,opacity]"
        >
          {element}
        </motion.span>
      ))}
    </span>
  );
};
