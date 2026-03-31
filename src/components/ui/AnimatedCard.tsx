"use client";

import { motion, HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEnabled?: boolean;
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, hoverEnabled = true, className = "", style, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        style={style}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hoverEnabled ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={`rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-800 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";

export default AnimatedCard;
