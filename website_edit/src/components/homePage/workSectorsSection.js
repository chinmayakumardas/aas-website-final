'use client';
import { motion } from "framer-motion";
import { FaIndustry, FaHospital, FaGraduationCap, FaShoppingBag, FaPlane, FaLaptopCode } from 'react-icons/fa';
import { MdEngineering, MdBiotech } from 'react-icons/md';

const industries = [
  {
    icon: FaIndustry,
    title: "Manufacturing",
    description: "Smart manufacturing solutions with IoT integration and automation",
    color: "from-blue-300 to-blue-500"
  },
  {
    icon: FaHospital,
    title: "Healthcare",
    description: "Digital health solutions and medical technology integration",
    color: "from-green-300 to-green-500"
  },
  {
    icon: FaGraduationCap,
    title: "Education",
    description: "E-learning platforms and educational technology solutions",
    color: "from-purple-300 to-purple-500"
  },
  {
    icon: FaShoppingBag,
    title: "Retail",
    description: "E-commerce and omnichannel retail solutions",
    color: "from-red-300 to-red-500"
  },
  {
    icon: FaPlane,
    title: "Aviation",
    description: "Aviation software and logistics management systems",
    color: "from-sky-300 to-sky-500"
  },
  {
    icon: MdEngineering,
    title: "Engineering",
    description: "CAD/CAM solutions and engineering software",
    color: "from-orange-300 to-orange-500"
  },
  {
    icon: MdBiotech,
    title: "Biotech",
    description: "Biotechnology and research management systems",
    color: "from-teal-300 to-teal-500"
  },
  {
    icon: FaLaptopCode,
    title: "Technology",
    description: "Custom software solutions and digital transformation",
    color: "from-indigo-300 to-indigo-500"
  }
];
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function IndustriesSection() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-left">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600  mx-auto text-left">
            Delivering innovative solutions across diverse sectors with expertise and precision
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${industry.color}`}
            >
              <div className={`p-8 relative z-10 transition-colors duration-300 group-hover:bg-white`}>
                <div className={`w-16 h-16 rounded-xl bg-white/20 group-hover:bg-gradient-to-br ${industry.color} mb-6 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300`}>
                  <industry.icon className="w-8 h-8 text-white group-hover:text-gray-800 transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white group-hover:text-gray-900 mb-3 transition-colors duration-300">
                  {industry.title}
                </h3>
                <p className="text-white/90 group-hover:text-black transition-colors duration-300 text-lg">
                  {industry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
