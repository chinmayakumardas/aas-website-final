

"use client";
 
import { useEffect, useState } from "react";
import {
  LightBulbIcon,
  EyeIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from 'next/image';
 
export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);
 
  useEffect(() => {
    setIsVisible(true);
  }, []);
 
  const aboutSections = [
    {
      subtitle: "Who We Are",
      title: "Our Company",
      icon: <BuildingOffice2Icon className="w-20 h-20 text-[#AF9B5C]" />,
      description:
        "AAS International Private Limited is a dynamic, multi-sector company excelling in mining, IT, hospitality, and agriculture. Committed to innovation and growth, we focus on creating job opportunities and fostering skilled labor development.",
      listItems: [
        "Diverse Expertise",
        "Tailored Solutions",
        "Commitment to Excellence",
        "Innovation-Driven",
        "Collaborative Approach",
        "Proven Track Record",
      ],
      image: "assets/about02.jpg",
    }
  ];
 
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-0 h-[40vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[url('/assets/about08.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#AF9B5C]/10 to-[#AF9B5C]/5" />
        <div className="relative max-w-6xl mx-auto px-8 py-24">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#AF9B5C] font-medium block mb-4"
            >
              Who We Are
            </motion.span>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-bold mb-6 bg-gradient-to-r from-[#AF9B5C] to-[#AF9B5C]/80 bg-clip-text text-transparent"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              Innovating Tomorrow's Solutions Today
            </motion.p>
          </div>
        </div>
      </motion.section>
 
      {/* Company Section */}
      <section className="py-16">
        {aboutSections.map((section, index) => (
          <div key={index} className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Section */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-black rounded-lg">{section.icon}</div>
                    <div>
                      <div>
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-[#AF9B5C] font-large"
                        >
                          {section.subtitle}
                        </motion.span>
                      </div>
                      <h2 className="text-4xl font-bold text-gray-800">{section.title}</h2>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{section.description}</p>
                <ul className="grid grid-cols-2 gap-4 mt-6">
                  {section.listItems.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center space-x-2 text-gray-700 hover:text-[#AF9B5C] transition-colors duration-300"
                    >
                      <span className="w-2 h-2 bg-[#AF9B5C] rounded-full" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
 
              {/* Image Section */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl group">
                  <img
                    src={`/${section.image}`}
                    alt={`about-img-${index}`}
                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#AF9B5C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#AF9B5C]/20 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        ))}
      </section>
 
      {/* Mission & Vision Section with Parallax */}
      <section className="relative py-24 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 bg-[url('/assets/breadcrumb.jpg')] bg-cover bg-fixed bg-center opacity-20"/>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black rounded-lg">
                  <RocketLaunchIcon className="w-16 h-16 text-[#AF9B5C]" />
                </div>
                <div>
                  <motion.span className="text-[#AF9B5C] font-medium block">Our Purpose</motion.span>
                  <h2 className="text-4xl font-bold text-gray-800">Our Mission</h2>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower businesses by providing innovative and AI-driven solutions that solve complex challenges and streamline operations. We are committed to unlocking the full potential of your data, enabling smarter decisions and driving growth through cutting-edge technology.
              </p>
            </motion.div>
 
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black rounded-lg">
                  <EyeIcon className="w-16 h-16 text-[#AF9B5C]" />
                </div>
                <div>
                  <div>
                    <motion.span className="text-[#AF9B5C] font-medium block">Our Goal</motion.span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-800">Our Vision</h2>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where businesses thrive through seamless automation, data intelligence, and transformative technology. Our goal is to lead the way in delivering solutions that not only meet today's needs but also prepare companies for the challenges of tomorrow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
 