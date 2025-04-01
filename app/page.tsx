"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Code, Database, Users, Layers, Shield, Menu, X, Settings, BarChart } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ProcessSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-40 w-full backdrop-blur-md transition-all duration-300 ${
        scrolled ? "bg-white/80 shadow-lg border-b border-gray-200/20" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Code className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Next Codex</span>
        </motion.div>

        <motion.nav
          className="hidden md:flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, staggerChildren: 0.1 }}
        >
          {["Servicios", "Clientes", "Proceso", "Contacto"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
            >
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium relative group px-3 py-2 rounded-md transition-all duration-300 hover:bg-primary/10"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          className="hidden md:flex gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="border-primary text-primary hover:bg-primary/10 transition-all duration-300"
          >
            Portafolio
          </Button>
          <Button size="sm" className="bg-primary hover:bg-emphasis transition-all duration-300">
            Solicitar Presupuesto
          </Button>
        </motion.div>

        <motion.button
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Alternar menú"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="container md:hidden py-4 border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col gap-4">
              {["Servicios", "Clientes", "Proceso", "Contacto"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="flex gap-4 pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                  Portafolio
                </Button>
                <Button size="sm" className="bg-primary hover:bg-emphasis">
                  Solicitar Presupuesto
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

  return (
    <section className="w-full min-h-[90vh] flex items-center py-20 md:py-28 lg:py-32 xl:py-36 overflow-hidden relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-[#60A5FA] filter blur-[80px]"></div>
          <div className="absolute bottom-[20%] left-[5%] w-72 h-72 rounded-full bg-[#818CF8] filter blur-[100px]"></div>
          <div className="absolute top-[40%] left-[30%] w-80 h-80 rounded-full bg-[#34D399] filter blur-[120px] opacity-30"></div>
        </div>

        {/* Patrón de puntos */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ij48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:gap-24 xl:grid-cols-[1fr_600px] items-center">
          <motion.div
            className="flex flex-col justify-center space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ y, opacity }}
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-block rounded-lg bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white font-medium border border-white/20"
              >
                Soluciones de Software Personalizadas
              </motion.div>
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Desarrollo de Software a Medida para Tu Negocio
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-gray-300 text-lg md:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Creamos soluciones de software personalizadas que se adaptan perfectamente a tus necesidades
                específicas, procesos únicos y objetivos de negocio.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-5 sm:flex-row sm:gap-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="px-8 py-6 text-base bg-primary hover:bg-white hover:text-[#0F172A] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Solicitar Presupuesto
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-base bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/30 hover:border-white transition-all duration-300 shadow-lg"
              >
                Ver Proyectos
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto lg:mx-0 max-w-[500px] w-full mt-12 lg:mt-0"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#60A5FA] to-[#34D399] rounded-xl blur-sm opacity-70"
              animate={{
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            ></motion.div>
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Software personalizado Next Codex"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full relative z-10 shadow-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Línea divisoria con efecto de brillo */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </section>
  )
}

function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Animación de fondo
  const backgroundVariants = {
    hidden: {
      backgroundPosition: "0% 0%",
    },
    visible: {
      backgroundPosition: "100% 100%",
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        duration: 20,
        ease: "linear",
      },
    },
  }

  return (
    <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Fondo animado */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-white to-secondary/70"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Elementos decorativos */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-primary filter blur-[80px]"></div>
          <div className="absolute bottom-[20%] left-[5%] w-72 h-72 rounded-full bg-emphasis filter blur-[100px]"></div>
        </div>

        {/* Patrón de puntos */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzM0NjhDQyIgZmlsbC1vcGFjaXR5PSIwLjA1Ij48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10" ref={ref}>
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <motion.div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nuestros Servicios
            </motion.div>
            <motion.h2
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-emphasis to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Soluciones de software adaptadas a tus necesidades
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Desarrollamos software personalizado que resuelve problemas específicos de tu negocio y te ayuda a
              alcanzar tus objetivos.
            </motion.p>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Layers className="h-10 w-10" />,
                title: "Aplicaciones Web",
                description:
                  "Desarrollamos aplicaciones web a medida con interfaces intuitivas y funcionalidades adaptadas a tus procesos de negocio.",
              },
              {
                icon: <Settings className="h-10 w-10" />,
                title: "Software Empresarial",
                description:
                  "Creamos sistemas de gestión empresarial personalizados que automatizan y optimizan tus operaciones diarias.",
              },
              {
                icon: <Database className="h-10 w-10" />,
                title: "Integración de Sistemas",
                description:
                  "Conectamos tus sistemas existentes para crear flujos de trabajo eficientes y eliminar la duplicación de datos.",
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Seguridad y Cumplimiento",
                description:
                  "Implementamos soluciones seguras que cumplen con los estándares y regulaciones de tu industria.",
              },
              {
                icon: <BarChart className="h-10 w-10" />,
                title: "Análisis de Datos",
                description:
                  "Desarrollamos herramientas personalizadas para visualizar y analizar tus datos empresariales.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Consultoría Tecnológica",
                description:
                  "Asesoramos en la selección e implementación de tecnologías que mejor se adapten a tus necesidades.",
              },
            ].map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
                isInView={isInView}
                isHovered={hoveredIndex === index}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description, index, isInView, isHovered, onHover, onLeave }) {
  // Referencias para el efecto 3D
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  // Efecto para manejar la rotación 3D basada en la posición del mouse
  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = ((y - centerY) / centerY) * 5
    const rotateYValue = ((centerX - x) / centerX) * 5

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const resetRotation = () => {
    setRotateX(0)
    setRotateY(0)
  }

  // Variantes para las animaciones
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 0,
      rotateY: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: 0.1 + index * 0.1,
      },
    },
    hover: {
      y: -20,
      scale: 1.05,
      rotateX: rotateX,
      rotateY: rotateY,
      boxShadow: "0 25px 50px -12px rgba(52, 104, 204, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  }

  const iconContainerVariants = {
    hidden: {
      scale: 0.8,
      backgroundColor: "rgba(228, 235, 248, 1)",
    },
    visible: {
      scale: 1,
      backgroundColor: "rgba(228, 235, 248, 1)",
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.3,
      },
    },
    hover: {
      scale: 1.2,
      backgroundColor: "rgba(52, 104, 204, 1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const iconVariants = {
    hidden: {
      scale: 1,
      color: "rgba(52, 104, 204, 1)",
    },
    visible: {
      scale: 1,
      color: "rgba(52, 104, 204, 1)",
      transition: {
        delay: 0.3 + index * 0.1,
      },
    },
    hover: {
      scale: 1,
      color: "rgba(255, 255, 255, 1)",
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  const titleVariants = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + index * 0.1,
      },
    },
    hover: {
      color: "#2A54A0",
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const descriptionVariants = {
    hidden: {
      y: 10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5 + index * 0.1,
      },
    },
  }

  // Efecto de partículas para el hover
  const particlesVariants = {
    hidden: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative flex flex-col items-center rounded-xl border border-primary/10 bg-white p-8 shadow-lg overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      onMouseEnter={onHover}
      onMouseOut={onLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Efecto de brillo en hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-emphasis/20 opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Partículas decorativas */}
      <motion.div className="absolute inset-0 pointer-events-none" variants={particlesVariants}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
            }}
            animate={
              isHovered
                ? {
                    x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    opacity: [0, 0.7, 0],
                    scale: [0, 1, 0],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 flex flex-col items-center space-y-6 text-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div className="p-3 rounded-full" variants={iconContainerVariants}>
          <motion.div variants={iconVariants} className="relative z-10">
            {icon}
          </motion.div>
        </motion.div>

        <div className="space-y-3">
          <motion.h3 className="text-xl font-bold" variants={titleVariants}>
            {title}
          </motion.h3>

          <motion.p className="text-muted-foreground" variants={descriptionVariants}>
            {description}
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="clientes" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emphasis rounded-full filter blur-3xl opacity-30"></div>
      </motion.div>

      <div className="container px-4 md:px-6" ref={ref}>
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <motion.div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Clientes Satisfechos
            </motion.div>
            <motion.h2
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-emphasis"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Historias de éxito de nuestros clientes
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Descubre cómo nuestras soluciones personalizadas han transformado negocios en diferentes industrias.
            </motion.p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote:
                "Next Codex desarrolló un sistema de gestión que se adaptó perfectamente a nuestros procesos únicos. Aumentamos nuestra eficiencia operativa en un 40%.",
              author: "Carlos Méndez",
              role: "Director de Operaciones, LogisTech",
            },
            {
              quote:
                "La aplicación web que crearon para nuestro servicio de atención al cliente ha mejorado drásticamente nuestra capacidad de respuesta y satisfacción del cliente.",
              author: "Ana Martínez",
              role: "Gerente de Servicio al Cliente, RetailPlus",
            },
            {
              quote:
                "Gracias a la solución de integración desarrollada por Next Codex, ahora todos nuestros sistemas se comunican perfectamente, eliminando la duplicación de trabajo.",
              author: "Roberto Sánchez",
              role: "CIO, FinancialGroup",
            },
          ].map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ quote, author, role, index, isInView }) {
  return (
    <motion.div
      className="flex flex-col justify-between space-y-4 rounded-lg border bg-white p-6 shadow-sm hover-card"
      initial={{ opacity: 0, y: 20, rotateY: -5 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 20, rotateY: -5 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1 + index * 0.08,
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(52, 104, 204, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.p
        className="text-muted-foreground relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      >
        <span className="text-primary text-4xl absolute -top-2 -left-2 opacity-20">"</span>
        {quote}
        <span className="text-primary text-4xl absolute -bottom-5 -right-2 opacity-20">"</span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      >
        <p className="font-semibold text-emphasis">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </motion.div>
    </motion.div>
  )
}

function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="proceso" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6" ref={ref}>
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-2">
            <motion.div
              className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nuestro Proceso
            </motion.div>
            <motion.h2
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-emphasis"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Cómo trabajamos
            </motion.h2>
            <motion.p
              className="max-w-[900px] text-muted-foreground md:text-xl/relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Nuestro enfoque metódico garantiza que entregamos soluciones que realmente satisfacen tus necesidades.
            </motion.p>
          </div>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 relative">
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1 bg-primary/30 -z-10 hidden lg:block"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {[
            {
              number: "1",
              title: "Descubrimiento",
              description:
                "Analizamos a fondo tus necesidades, procesos y objetivos para entender completamente tu negocio.",
            },
            {
              number: "2",
              title: "Diseño",
              description:
                "Creamos prototipos y diseños detallados de la solución, asegurando que cumpla con tus expectativas.",
            },
            {
              number: "3",
              title: "Desarrollo",
              description:
                "Construimos tu solución utilizando metodologías ágiles, con revisiones regulares para garantizar la calidad.",
            },
            {
              number: "4",
              title: "Implementación",
              description: "Desplegamos la solución, proporcionamos capacitación y ofrecemos soporte continuo.",
            },
          ].map((process, index) => (
            <ProcessCard
              key={index}
              number={process.number}
              title={process.title}
              description={process.description}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProcessCard({ number, title, description, index, isInView }) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm hover-card relative z-10"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1 + index * 0.12,
      }}
      whileHover={{
        y: -5,
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(52, 104, 204, 0.2)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground"
        initial={{ scale: 0.8 }}
        animate={isInView ? { scale: [0.8, 1.2, 1] } : { scale: 0.8 }}
        transition={{
          duration: 0.5,
          delay: 0.4 + index * 0.15,
          times: [0, 0.6, 1],
        }}
      >
        {number}
      </motion.div>
      <h3 className="text-xl font-bold text-emphasis">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  return (
    <section id="contacto" className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-emphasis/10"></div>
      </motion.div>

      <div className="container px-4 md:px-6" ref={ref}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary font-medium border border-primary/20"
              >
                Comienza Tu Proyecto
              </motion.div>
              <motion.h2
                className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-emphasis"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                ¿Listo para transformar tu negocio con software a medida?
              </motion.h2>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl/relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos con soluciones
                personalizadas.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-4 sm:flex-row sm:gap-6 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="px-8 py-5 text-base bg-primary hover:bg-emphasis transition-all duration-300 transform hover:scale-105 btn-pulse shadow-lg"
              >
                Solicitar Presupuesto
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-5 text-base border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Agendar Consulta
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              className="rounded-xl border border-primary/20 bg-white/80 backdrop-blur-sm p-8 shadow-lg w-full max-w-md"
              initial={{ y: 20 }}
              animate={isInView ? { y: 0 } : { y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ boxShadow: "0 15px 30px rgba(52, 104, 204, 0.15)" }}
            >
              <div className="relative">
                <h3 className="text-2xl font-bold mb-6 text-emphasis">Cuéntanos sobre tu proyecto</h3>
                <form className="space-y-5">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <label htmlFor="name" className="text-sm font-medium text-emphasis">
                      Nombre
                    </label>
                    <input
                      id="name"
                      className="w-full rounded-md border border-primary/20 bg-white/50 px-4 py-2.5 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all duration-300"
                      placeholder="Ingresa tu nombre"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <label htmlFor="email" className="text-sm font-medium text-emphasis">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border border-primary/20 bg-white/50 px-4 py-2.5 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all duration-300"
                      placeholder="Ingresa tu correo electrónico"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <label htmlFor="company" className="text-sm font-medium text-emphasis">
                      Empresa
                    </label>
                    <input
                      id="company"
                      className="w-full rounded-md border border-primary/20 bg-white/50 px-4 py-2.5 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all duration-300"
                      placeholder="Ingresa el nombre de tu empresa"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    <label htmlFor="message" className="text-sm font-medium text-emphasis">
                      Describe tu proyecto
                    </label>
                    <textarea
                      id="message"
                      className="w-full rounded-md border border-primary/20 bg-white/50 px-4 py-2.5 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all duration-300 min-h-[100px] resize-none"
                      placeholder="Cuéntanos sobre tus necesidades y objetivos"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="pt-2"
                  >
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-emphasis transition-all duration-300 py-5 text-base font-medium shadow-md"
                    >
                      Enviar
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <motion.footer
      className="w-full border-t py-6 md:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Code className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Next Codex</span>
        </motion.div>
        <motion.nav
          className="flex gap-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {["Política de Privacidad", "Términos de Servicio", "Carreras", "Blog"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
            >
              <Link
                href="#"
                className="text-sm font-medium hover:underline underline-offset-4 hover:text-primary transition-colors duration-300"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          © {new Date().getFullYear()} Next Codex. Todos los derechos reservados.
        </motion.div>
      </div>
    </motion.footer>
  )
}

