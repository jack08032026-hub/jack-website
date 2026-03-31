"use client";

import { motion, HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    const variants = {
      primary: "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900",
      secondary: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
      outline: "border-2 border-zinc-200 text-zinc-900 dark:border-zinc-700 dark:text-zinc-50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-base",
      lg: "px-7 py-3.5 text-lg",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`rounded-xl font-medium transition-colors hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export default AnimatedButton;
