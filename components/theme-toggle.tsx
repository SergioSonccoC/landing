"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = (e: React.MouseEvent) => {
    // Obtener la posición del botón
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = rect.left
    const y = rect.top

    // Establecer la posición en el estado
    setButtonPosition({ x, y })
    setIsAnimating(true)
    setTheme(theme === "dark" ? "light" : "dark")

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1500)
  }

  if (!mounted) return null

  return (
    <div className="relative">
      <motion.button
        onClick={toggleTheme}
        className="relative z-20 flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 overflow-hidden hover:shadow-md transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 180 }}
        transition={{ duration: 0.5 }}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-[#3468CC]" />}
      </motion.button>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-10 pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                initial={{
                  scale: 0,
                  opacity: 0.8,
                  top: buttonPosition.y + 20,
                  left: buttonPosition.x + 20,
                }}
                animate={{
                  scale: 15 * (i + 1),
                  opacity: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                style={{
                  transformOrigin: "center center",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

