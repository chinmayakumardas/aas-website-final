import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
 
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(null)
 
  const slides = [
    {
      src: "/assets/hero-bg-1.jpg",
      category: "WE ARE LEADING TECHNOLOGY SOLUTIONS PROVIDING COMPANY",
      heading: "Get The Best IT Solutions From Us",
      description: "Get the best IT solutions with tailored services to optimize your business, from cloud solutions to cybersecurity and software development.",
      ctaText: "Learn More",
      ctaLink: "/services"
    },
    {
      src: "/assets/hero-bg-2.jpg",
      category: "WE ARE LEADING TECHNOLOGY SOLUTIONS PROVIDING COMPANY",
      heading: "We Are Professional Tech Solution",
      description: "We are a digital agency and tech solution provider, offering innovative strategies and cutting-edge technology to elevate your business.",
      ctaText: "Learn More",
      ctaLink: "/services"
    },
    {
      src: "/assets/hero-bg-3.jpg",
      category: "WE ARE LEADING TECHNOLOGY SOLUTIONS PROVIDING COMPANY",
      heading: "Excelent IT Services For Your Success",
      description: "We provide excellent IT services designed to drive your business success with scalable, and innovative solutions. Trust our expertise to enhance your efficiency and growth.",
      ctaText: "Learn More",
      ctaLink: "/services"
    },
  ]
 
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentIndex])
 
  const handleNext = () => {
    setDirection("right")
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === slides.length ? 0 : prevIndex + 1
    )
  }
 
  const handlePrevious = () => {
    setDirection("left")
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
  }
 
  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction === "right" ? -1000 : 1000,
      opacity: 0
    })
  }
 
  return (
    <div className="relative h-[60vh] md:h-[90vh] overflow-hidden ">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full"
        >
          {/* Slide Container */}
          <div className="relative w-full h-full ">
            {/* Image and Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
              <img
                src={slides[currentIndex].src}
                alt={slides[currentIndex].heading}
                className="w-full h-full object-cover object-center"
              />
            </div>
 
            {/* Content */}
            <div className="relative h-full flex items-center ">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-3xl">
                  {/* Category */}
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-block text-sm md:text-base text-[#dfc268] font-semibold tracking-wider mb-4"
                  >
                    {slides[currentIndex].category}
                  </motion.span>
 
                  {/* Heading */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-white mb-8"
                  >
                    {slides[currentIndex].heading}
                  </motion.h1>
                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[#fefefe] md:text-xl text-gray-400 mb-12"
                  >
                    {slides[currentIndex].description}
                  </motion.p>
 
                  {/* CTA Button */}
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    href={slides[currentIndex].ctaLink}
                    className="inline-block bg-[#af9a57] hover:bg-[#fff] text-white hover:text-[#000] px-8 py-3 rounded-full
                             transition-all duration-300 transform hover:scale-105 text-lg"
                  >
                    {slides[currentIndex].ctaText}
                  </motion.a>
                </div>
              </div>
            </div>
 
            {/* Navigation Dots */}
            <div className="absolute hidden sm:block bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 ">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300
                    ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
 
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10  group hidden sm:block "
      >
        <div className="bg-white/10 hover:bg-[#AF9A57] p-3 rounded-full backdrop-blur-sm
                      transition-all duration-300 group-hover:scale-110">
          <ChevronLeft className="w-6 h-6 text-white" />
        </div>
      </button>
 
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 group hidden sm:block"
      >
        <div className="bg-white/10 hover:bg-[#AF9A57] p-3 rounded-full backdrop-blur-sm
                      transition-all duration-300 group-hover:scale-110">
          <ChevronRight className="w-6 h-6 text-white" />
        </div>
      </button>
    </div>
  )
}