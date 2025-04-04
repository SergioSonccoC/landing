"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// Asegurar que el tema por defecto sea oscuro
// Aunque ya está configurado como "dark", voy a asegurarme de que se aplique correctamente
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider defaultTheme="dark" attribute="class" {...props}>
      {children}
    </NextThemesProvider>
  )
}

