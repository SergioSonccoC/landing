"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Code,
  Database,
  FileCode,
  Globe,
  Layers,
  MessageSquare,
  Menu,
  Shield,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowDown,
} from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const headerRef = useRef<HTMLElement>(null)

  // Estados para los carousels
  const [serviceIndex, setServiceIndex] = useState(0)
  const [projectIndex, setProjectIndex] = useState(0)

  // Valores para animaciones basadas en scroll
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8])
  const headerHeight = useTransform(scrollY, [0, 100], [88, 64])
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9])

  // Datos para las secciones
  const services = [
    {
      title: "Desarrollo de Software a Medida",
      description:
        "Soluciones personalizadas diseñadas específicamente para las necesidades y flujos de trabajo de su empresa.",
      icon: <Code className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      title: "Sistemas Empresariales",
      description:
        "Sistemas robustos y escalables que crecen con su empresa y se integran con sus herramientas existentes.",
      icon: <Database className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      title: "Soluciones en la Nube",
      description: "Aplicaciones seguras y flexibles basadas en la nube, accesibles desde cualquier lugar del mundo.",
      icon: <Globe className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      title: "Seguridad y Cumplimiento",
      description: "Características de seguridad integradas y cumplimiento de las normativas y estándares del sector.",
      icon: <Shield className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      title: "Integración de API",
      description: "Integración perfecta con servicios de terceros y sistemas empresariales existentes.",
      icon: <FileCode className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      title: "Soporte 24/7",
      description: "Soporte técnico y mantenimiento las 24 horas para sus sistemas críticos para el negocio.",
      icon: <MessageSquare className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
  ]

  const projects = [
    {
      title: "Sistema ERP para Logística Global",
      description:
        "Desarrollamos un sistema ERP personalizado que aumentó la eficiencia operativa en un 40% para una empresa de logística internacional.",
      image: "/placeholder.svg?height=400&width=600",
      tag: "Logística",
    },
    {
      title: "Plataforma de Gestión de Inventario",
      description:
        "Creamos una solución de gestión de inventario en tiempo real que redujo los costos de almacenamiento en un 25% para un minorista con múltiples ubicaciones.",
      image: "/placeholder.svg?height=400&width=600",
      tag: "Retail",
    },
    {
      title: "Aplicación de Servicio al Cliente",
      description:
        "Implementamos una aplicación omnicanal de servicio al cliente que mejoró la satisfacción del cliente en un 35% para una empresa de telecomunicaciones.",
      image: "/placeholder.svg?height=400&width=600",
      tag: "Telecomunicaciones",
    },
  ]

  const processes = [
    {
      step: "1",
      title: "Descubrimiento",
      description: "Analizamos sus necesidades y objetivos para entender completamente su negocio.",
      icon: <Users className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      step: "2",
      title: "Planificación",
      description: "Diseñamos la arquitectura y definimos el alcance del proyecto con plazos claros.",
      icon: <Layers className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      step: "3",
      title: "Desarrollo",
      description: "Construimos su solución con metodologías ágiles y revisiones periódicas.",
      icon: <Code className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
    {
      title: "Implementación",
      description: "Desplegamos la solución y proporcionamos capacitación y soporte continuo.",
      icon: <Globe className="h-10 w-10 text-[#3468CC] dark:text-[#5C8AE6]" />,
    },
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { name: "Servicios", id: "services" },
    { name: "Clientes", id: "clients" },
    { name: "Proyectos", id: "projects" },
    { name: "Proceso", id: "process" },
    { name: "Contacto", id: "contact" },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  // Funciones para controlar los carousels
  const nextService = () => {
    setServiceIndex((prev) => (prev + 1) % services.length)
  }

  const prevService = () => {
    setServiceIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  const nextProject = () => {
    setProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <div className="flex min-h-screen flex-col dark:text-white transition-colors duration-500">
      {/* Topbar mejorado con animaciones */}
      <motion.header
        ref={headerRef}
        style={{
          height: headerHeight,
          backdropFilter: scrolled ? `blur(${headerBlur.get()}px)` : "none",
        }}
        className="fixed top-0 z-50 w-full transition-all duration-500"
      >
        <motion.div
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: headerOpacity,
            backgroundColor: theme === "dark" ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.8)",
            borderBottom: scrolled
              ? theme === "dark"
                ? "1px solid rgba(75, 85, 99, 0.3)"
                : "1px solid rgba(229, 231, 235, 0.5)"
              : "none",
          }}
        />

        <div className="container relative z-10 mx-auto flex h-full items-center justify-between px-4 md:px-6">
          <motion.div className="flex items-center gap-6 md:gap-10" style={{ scale: logoScale }}>
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{
                  rotate: 360,
                  boxShadow: "0 0 15px rgba(52, 104, 204, 0.5)",
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
                className="relative flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 overflow-hidden group-hover:shadow-lg transition-all duration-300"
              >
                <Code className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6] relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#3468CC]/20 to-[#5C8AE6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.span
                className="inline-block font-bold text-base md:text-lg text-gray-900 dark:text-white"
                whileHover={{
                  color: "#3468CC",
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                Next Codex
              </motion.span>
            </Link>

            {/* Navegación de escritorio con animaciones mejoradas */}
            <nav className="hidden gap-1 md:flex">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#3468CC] dark:text-gray-300 dark:hover:text-[#5C8AE6] transition-colors rounded-md overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </nav>
          </motion.div>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(52, 104, 204, 0.4), 0 8px 10px -6px rgba(52, 104, 204, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Button
                size="sm"
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-[#3468CC] to-[#2A54A0] hover:from-[#2A54A0] hover:to-[#1E3C7A] dark:from-[#5C8AE6] dark:to-[#3468CC] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.span initial={{ x: 0 }} whileHover={{ x: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                  Contáctanos
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="ml-1"
                >
                  →
                </motion.span>
              </Button>
            </motion.div>

            {/* Botón de menú móvil */}
            <motion.button
              className="flex md:hidden h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 text-[#3468CC] dark:text-[#5C8AE6]" />
              ) : (
                <Menu className="h-4 w-4 text-[#3468CC] dark:text-[#5C8AE6]" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Menú móvil */}
        <motion.div
          className={`absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg md:hidden overflow-hidden ${mobileMenuOpen ? "block" : "hidden"}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: mobileMenuOpen ? "auto" : 0,
            opacity: mobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto py-2 px-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex w-full items-center px-4 py-2 text-left text-sm font-medium text-gray-600 hover:text-[#3468CC] dark:text-gray-300 dark:hover:text-[#5C8AE6] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="flex w-full items-center px-4 py-2 mt-2 text-left text-sm font-medium bg-gradient-to-r from-[#3468CC] to-[#2A54A0] text-white rounded-md"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Contáctanos
              </motion.button>
            </nav>
          </div>
        </motion.div>
      </motion.header>

      {/* Main Info Section with Modern Gradient - MEJORADO */}
      <section id="home" className="relative w-full flex items-center justify-center overflow-hidden">
        {/* Fondo con efectos mejorados */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated gradient orbs - Más grandes y con más variedad */}
          <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#3468CC]/20 to-[#5C8AE6]/10 blur-3xl animate-pulse dark:from-[#3468CC]/10 dark:to-[#5C8AE6]/5"></div>
          <div
            className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#2A54A0]/15 to-[#3468CC]/10 blur-3xl animate-pulse dark:from-[#2A54A0]/10 dark:to-[#3468CC]/5"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-[40%] right-[25%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#5C8AE6]/15 to-[#3468CC]/10 blur-3xl animate-pulse dark:from-[#5C8AE6]/10 dark:to-[#3468CC]/5"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-[30%] left-[25%] w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#3468CC]/15 to-[#2A54A0]/10 blur-3xl animate-pulse dark:from-[#3468CC]/10 dark:to-[#2A54A0]/5"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Patrón de grilla en X - COMPLETAMENTE REDISEÑADO */}
          <div className="absolute inset-0 opacity-50 dark:opacity-30">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path
                    d="M 0 0 L 100 100 M 100 0 L 0 100"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                    className="text-[#3468CC]/50 dark:text-[#5C8AE6]/50"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          {/* Partículas flotantes */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-[#3468CC]/20 dark:bg-[#5C8AE6]/20"
                style={{
                  width: Math.random() * 10 + 5 + "px",
                  height: Math.random() * 10 + 5 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  y: [0, Math.random() * 100 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Additional gradient layers - Más intensos */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#3468CC]/10 to-transparent dark:from-transparent dark:via-[#5C8AE6]/10 dark:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#3468CC]/15 to-transparent dark:from-[#5C8AE6]/15 dark:to-transparent"></div>

          {/* Líneas decorativas */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,0 Q50,50 100,0"
                stroke="rgba(52, 104, 204, 0.1)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,100 Q50,50 100,100"
                stroke="rgba(52, 104, 204, 0.1)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          </div>
          {/* Efecto de malla moderna */}
          <div className="absolute inset-0 bg-[radial-gradient(#3468CC_1px,transparent_1px)] dark:bg-[radial-gradient(#5C8AE6_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>

          {/* Efecto de luz brillante */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#3468CC]/20 dark:bg-[#5C8AE6]/20 blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[#2A54A0]/20 dark:bg-[#3468CC]/20 blur-[100px]"></div>
        </div>

        {/* Main content - Rediseñado con más espacio */}
        <div className="bg-gradient-to-br from-[#E4EBF8]/80 via-white to-[#E4EBF8]/80 dark:from-gray-800/90 dark:via-gray-900 dark:to-gray-800/90 w-full min-h-screen md:min-h-screen flex items-center py-16 md:py-0 backdrop-blur-sm transition-colors duration-500">
          <div className="container px-4 md:px-8 relative pt-16 md:pt-16 mx-auto">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-6 md:space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      duration: 0.8,
                    },
                  },
                }}
              >
                <div className="space-y-4 md:space-y-6">
                  {/* Título reducido de tamaño */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-transparent bg-gradient-to-r from-[#2A54A0] to-[#3468CC] bg-clip-text dark:from-[#5C8AE6] dark:to-[#3468CC]">
                    Soluciones de software a medida para tu empresa
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                    Optimiza operaciones, aumenta la productividad y potencia el crecimiento con nuestros sistemas de
                    software personalizados diseñados para el futuro.
                  </p>
                </div>

                {/* Valores de la empresa en lugar de estadísticas */}
                <div className="grid grid-cols-3 gap-2 md:gap-4 py-2 md:py-4">
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-bold text-[#3468CC] dark:text-[#5C8AE6]">Innovación</span>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Soluciones creativas</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-bold text-[#3468CC] dark:text-[#5C8AE6]">Calidad</span>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Código limpio</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg md:text-xl font-bold text-[#3468CC] dark:text-[#5C8AE6]">Soporte</span>
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Siempre disponible</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-[#3468CC] to-[#2A54A0] hover:from-[#2A54A0] hover:to-[#1E3C7A] dark:from-[#5C8AE6] dark:to-[#3468CC] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                      onClick={() => scrollToSection("contact")}
                    >
                      Solicitar Demo
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-[#3468CC] text-[#3468CC] hover:bg-[#E4EBF8] dark:border-[#5C8AE6] dark:text-[#5C8AE6] dark:hover:bg-gray-800 transition-all duration-300 text-sm md:text-base"
                    >
                      Conocer Más
                    </Button>
                  </motion.div>
                </div>

                {/* Scroll indicator - Mejorado */}
                <motion.div
                  className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm font-medium text-[#3468CC] dark:text-[#5C8AE6] mt-4 md:mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  onClick={() => scrollToSection("services")}
                >
                  <span>Descubre más</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="bg-[#E4EBF8] dark:bg-gray-800 rounded-full p-1"
                  >
                    <ArrowDown className="h-3 w-3 md:h-4 md:w-4" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Imagen principal mejorada con más cards alrededor */}
              <motion.div
                className="flex items-center justify-center mt-4 md:mt-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="relative">
                  {/* Círculos decorativos */}
                  <div className="absolute -z-10 -left-5 md:-left-10 -top-5 md:-top-10 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full border border-[#3468CC]/10 dark:border-[#5C8AE6]/10"></div>
                  <div className="absolute -z-10 -left-3 md:-left-5 -top-3 md:-top-5 w-[275px] md:w-[550px] h-[275px] md:h-[550px] rounded-full border border-[#3468CC]/10 dark:border-[#5C8AE6]/10"></div>
                  <div className="absolute -z-10 left-0 top-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full border border-[#3468CC]/10 dark:border-[#5C8AE6]/10"></div>

                  {/* Glowing effect behind image */}
                  <div className="absolutete inset-0 bg-gradient-to-br from-[#3468CC]/30 to-transparent rounded-full blur-3xl"></div>

                  {/* Animated rings */}
                  <div
                    className="absolute inset-0 rounded-full border border-[#3468CC]/20 dark:border-[#5C8AE6]/20 animate-ping"
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-full border-2 border-[#3468CC]/10 dark:border-[#5C8AE6]/10 animate-ping"
                    style={{ animationDuration: "4s", animationDelay: "1s" }}
                  ></div>

                  {/* Elementos flotantes alrededor de la imagen - Más pequeños y modernos */}
                  <motion.div
                    className="absolute -right-4 md:-right-8 top-1/4 bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Shield className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6]" />
                  </motion.div>

                  <motion.div
                    className="absolute -left-4 md:-left-8 top-2/3 bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Database className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6]" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 md:-bottom-8 left-1/3 bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Globe className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6]" />
                  </motion.div>

                  {/* Nuevas cards adicionales - ajustadas para móvil */}
                  <motion.div
                    className="absolute -top-4 md:-top-8 left-1/3 bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <Code className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6]" />
                  </motion.div>

                  <motion.div
                    className="absolute right-1/4 -bottom-4 md:-bottom-8 bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                  >
                    <FileCode className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6]" />
                  </motion.div>

                  <motion.div
                    className="absolute -left-3 md:-left-6 top-1/4 bg-white dark:bg-gray-800 rounded-lg p-2 md:p-3 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <Layers className="h-4 w-4 md:h-6 md:w-6 text-[#3468CC] dark:text-[#5C8AE6]" />
                  </motion.div>

                  {/* Imagen principal con tamaño ajustado para móvil */}
                  <div className="relative h-[250px] w-[300px] sm:h-[350px] sm:w-[400px] md:h-[450px] md:w-[550px] lg:h-[500px] lg:w-[600px] group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3468CC]/10 to-[#5C8AE6]/5 dark:from-[#3468CC]/5 dark:to-[#5C8AE6]/10 group-hover:from-[#3468CC]/20 group-hover:to-[#5C8AE6]/10 transition-all duration-700"></div>

                    {/* Mantener los efectos de partículas y animaciones */}
                    {/* ... */}

                    <Image
                      src="/placeholder.svg?height=500&width=600"
                      alt="Dashboard Preview"
                      fill
                      className="object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-105 z-20"
                      priority
                    />

                    {/* Mantener los efectos adicionales */}
                    {/* ... */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Carousel */}
      <section
        id="services"
        className="w-full py-12 md:py-20 bg-gradient-to-br from-white to-[#E4EBF8] dark:from-gray-900 dark:to-gray-800 border-t border-transparent dark:border-gray-700 transition-colors duration-500"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-lg bg-gradient-to-r from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 px-3 py-1 text-sm text-[#3468CC] dark:text-[#5C8AE6] font-semibold"
              >
                Servicios
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-[#2A54A0] to-[#3468CC] bg-clip-text dark:from-[#5C8AE6] dark:to-[#3468CC] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Soluciones Integrales de Software
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed"
              >
                Nuestros sistemas empresariales están diseñados para resolver los desafíos más complejos de su negocio.
              </motion.p>
            </div>
          </motion.div>

          {/* Carousel para móvil */}
          <div className="mt-8 md:hidden">
            <div className="relative px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={serviceIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Card className="flex flex-col items-center text-center h-[300px] border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3468CC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader>
                      <motion.div
                        className="mb-2 bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 p-3 rounded-full"
                        whileHover={{
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        {services[serviceIndex].icon}
                      </motion.div>
                      <CardTitle className="text-xl text-[#2A54A0] dark:text-[#5C8AE6] group-hover:text-[#3468CC] dark:group-hover:text-white transition-colors duration-300">
                        {services[serviceIndex].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base dark:text-gray-300">
                        {services[serviceIndex].description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Mantener los controles del carousel */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevService}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                </button>

                <div className="flex space-x-2 items-center">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setServiceIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === serviceIndex ? "w-6 bg-[#3468CC] dark:bg-[#5C8AE6]" : "w-2 bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextService}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid para desktop */}
          <motion.div
            className="mx-auto hidden md:grid max-w-full grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-8 md:py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeInScale}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="flex flex-col items-center text-center h-full border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3468CC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader>
                    <motion.div
                      className="mb-2 bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 p-3 rounded-full"
                      whileHover={{
                        rotate: [0, 10, -10, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-xl text-[#2A54A0] dark:text-[#5C8AE6] group-hover:text-[#3468CC] dark:group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base dark:text-gray-300">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clients Section - 2 por fila */}
      <section
        id="clients"
        className="w-full py-12 md:py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-lg bg-gradient-to-r from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 px-3 py-1 text-sm text-[#3468CC] dark:text-[#5C8AE6] font-semibold"
              >
                Clientes
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-[#2A54A0] to-[#3468CC] bg-clip-text dark:from-[#5C8AE6] dark:to-[#3468CC] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Empresas que confían en nosotros
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed"
              >
                Trabajamos con empresas líderes en diversos sectores para impulsar su transformación digital.
              </motion.p>
            </div>
          </motion.div>

          {/* Grid de clientes - 2 por fila en móvil */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 py-8 md:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="flex items-center justify-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: i * 0.1,
                    },
                  },
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                <Image
                  src={`/placeholder.svg?height=60&width=180&text=Cliente+${i}`}
                  alt={`Cliente ${i}`}
                  width={180}
                  height={60}
                  className="opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Carousel */}
      <section
        id="projects"
        className="w-full py-12 md:py-20 bg-gradient-to-br from-white to-[#E4EBF8] dark:from-gray-900 dark:to-gray-800 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-lg bg-gradient-to-r from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 px-3 py-1 text-sm text-[#3468CC] dark:text-[#5C8AE6] font-semibold"
              >
                Proyectos
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-[#2A54A0] to-[#3468CC] bg-clip-text dark:from-[#5C8AE6] dark:to-[#3468CC] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Casos de Éxito
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed"
              >
                Descubra cómo hemos ayudado a empresas como la suya a alcanzar sus objetivos tecnológicos.
              </motion.p>
            </div>
          </motion.div>

          {/* Carousel para móvil */}
          <div className="mt-8 md:hidden">
            <div className="relative px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={projectIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Card className="overflow-hidden h-[400px] border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={projects[projectIndex].image || "/placeholder.svg"}
                        alt={projects[projectIndex].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC] px-3 py-1 text-xs font-medium text-white shadow-lg">
                        {projects[projectIndex].tag}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-[#2A54A0] dark:text-[#5C8AE6] group-hover:text-[#3468CC] dark:group-hover:text-white transition-colors duration-300">
                        {projects[projectIndex].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                        {projects[projectIndex].description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        className="text-[#3468CC] hover:bg-[#E4EBF8] hover:text-[#2A54A0] dark:text-[#5C8AE6] dark:hover:bg-gray-700 group transition-all duration-300"
                      >
                        Ver Caso Completo
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Mantener los controles del carousel */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevProject}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                </button>

                <div className="flex space-x-2 items-center">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setProjectIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === projectIndex ? "w-6 bg-[#3468CC] dark:bg-[#5C8AE6]" : "w-2 bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextProject}
                  className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid para desktop */}
          <motion.div
            className="mx-auto hidden md:grid max-w-full grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-8 md:py-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={fadeInScale}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute right-2 top-2 rounded-full bg-gradient-to-r from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC] px-3 py-1 text-xs font-medium text-white shadow-lg">
                      {project.tag}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#2A54A0] dark:text-[#5C8AE6] group-hover:text-[#3468CC] dark:group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="text-[#3468CC] hover:bg-[#E4EBF8] hover:text-[#2A54A0] dark:text-[#5C8AE6] dark:hover:bg-gray-700 group transition-all duration-300"
                    >
                      Ver Caso Completo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Work Process Section - COMPLETAMENTE REDISEÑADO */}
      <section
        id="process"
        className="w-full py-12 md:py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-lg bg-gradient-to-r from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 px-3 py-1 text-sm text-[#3468CC] dark:text-[#5C8AE6] font-semibold"
              >
                Proceso
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-[#2A54A0] to-[#3468CC] bg-clip-text dark:from-[#5C8AE6] dark:to-[#3468CC] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                Nuestro Enfoque de Trabajo
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed"
              >
                Un proceso estructurado y transparente para garantizar el éxito de su proyecto.
              </motion.p>
            </div>
          </motion.div>

          {/* Proceso completamente rediseñado */}
          <div className="mx-auto mt-12 max-w-full">
            {/* Versión móvil */}
            <div className="md:hidden">
              {processes.map((process, i) => (
                <motion.div
                  key={i}
                  className="mb-12 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC] text-white font-bold text-lg shadow-lg">
                      {process.step}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-[#2A54A0] dark:text-[#5C8AE6]">{process.title}</h3>
                    </div>
                  </div>
                  <div className="pl-16">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 rounded-full">
                        {process.icon}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
                    </div>
                  </div>
                  {i < processes.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC]"></div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Versión desktop */}
            <div className="hidden md:block relative">
              <div className="grid grid-cols-4 gap-6">
                {/* Línea de conexión horizontal - AJUSTADA PARA QUE NO SE SOBREPONGA */}
                <div className="absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC] rounded-full z-0"></div>

                {processes.map((process, i) => (
                  <motion.div
                    key={i}
                    className="relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <div className="flex flex-col items-center">
                      {/* Número del paso */}
                      <div className="z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC] text-white font-bold text-lg shadow-lg mb-4">
                        {process.step}
                      </div>

                      {/* Línea vertical que conecta con la tarjeta */}
                      <div className="w-1 h-8 bg-gradient-to-b from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC]"></div>

                      {/* Tarjeta con contenido */}
                      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-full w-full">
                        {/* Indicador de completado - REPOSICIONADO */}
                        <motion.div
                          className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: i * 0.3 + 0.5, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </motion.div>

                        <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 rounded-full">
                          {process.icon}
                        </div>
                        <h3 className="text-xl font-bold text-[#2A54A0] dark:text-[#5C8AE6] text-center mb-3">
                          {process.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center">{process.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full py-12 md:py-20 bg-gradient-to-br from-white to-[#E4EBF8] dark:from-gray-900 dark:to-gray-800 border-t border-gray-100 dark:border-gray-800 transition-colors duration-500"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block rounded-lg bg-gradient-to-r from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800 px-3 py-1 text-sm text-[#3468CC] dark:text-[#5C8AE6] font-semibold"
              >
                Contacto
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-[#2A54A0] to-[#3468CC] bg-clip-text dark:from-[#5C8AE6] dark:to-[#3468CC] sm:text-4xl md:text-5xl lg:text-6xl"
              >
                ¿Listo para Transformar su Negocio?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="max-w-[900px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed"
              >
                Contáctenos hoy mismo para una consulta gratuita y descubra cómo Next Codex puede ayudarle a alcanzar
                sus objetivos empresariales.
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto mt-8 md:mt-12 max-w-full grid gap-6 md:gap-8 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInScale}>
              <Card className="border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#2A54A0] dark:text-[#5C8AE6]">Envíenos un Mensaje</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Complete el formulario y nos pondremos en contacto con usted lo antes posible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium leading-none">
                        Nombre
                      </label>
                      <input
                        id="name"
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 focus:border-[#3468CC] dark:focus:border-[#5C8AE6] transition-colors"
                        placeholder="Ingrese su nombre"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 focus:border-[#3468CC] dark:focus:border-[#5C8AE6] transition-colors"
                        placeholder="Ingrese su email"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="company" className="text-sm font-medium leading-none">
                        Empresa
                      </label>
                      <input
                        id="company"
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 focus:border-[#3468CC] dark:focus:border-[#5C8AE6] transition-colors"
                        placeholder="Ingrese el nombre de su empresa"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 focus:border-[#3468CC] dark:focus:border-[#5C8AE6] transition-colors"
                        placeholder="¿Cómo podemos ayudarle?"
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full bg-gradient-to-r from-[#3468CC] to-[#2A54A0] hover:from-[#2A54A0] hover:to-[#1E3C7A] dark:from-[#5C8AE6] dark:to-[#3468CC] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                        Enviar Mensaje
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={fadeInScale} className="flex flex-col justify-center space-y-4">
              <Card className="border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#2A54A0] dark:text-[#5C8AE6]">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800">
                      <MessageSquare className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">info@nextcodex.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800">
                      <MessageSquare className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E4EBF8] to-[#C9D6F1] dark:from-gray-700 dark:to-gray-800">
                      <MessageSquare className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dirección</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Av. Tecnológica 123, Ciudad Innovación</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-[#E4EBF8]/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#2A54A0] dark:text-[#5C8AE6]">Horario de Atención</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Soporte Técnico: 24/7</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-[#3468CC] to-[#2A54A0] dark:from-[#5C8AE6] dark:to-[#3468CC] py-12 md:py-16 transition-colors duration-500">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
                ¿Listo para comenzar su proyecto?
              </h2>
              <p className="max-w-[600px] text-[#E4EBF8]">
                Agende una demostración gratuita con nuestros expertos hoy mismo.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-white text-[#3468CC] hover:bg-[#E4EBF8] shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Solicitar Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6 md:py-0 transition-colors duration-500">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-[#3468CC] dark:text-[#5C8AE6]" />
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              © 2025 Next Codex. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground dark:text-gray-400 hover:text-[#3468CC] dark:hover:text-[#5C8AE6] transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground dark:text-gray-400 hover:text-[#3468CC] dark:hover:text-[#5C8AE6] transition-colors"
            >
              Términos de Servicio
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground dark:text-gray-400 hover:text-[#3468CC] dark:hover:text-[#5C8AE6] transition-colors"
            >
              Mapa del Sitio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

