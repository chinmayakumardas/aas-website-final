"use client";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeroHighlight } from "../ui/hero-highlight";
 
 
// Project data
export const projects = [
    {
      title: "AR/VR",
      icon: "🕶️", // AR/VR Icon
      category: "Technology",
      status: "Active",
      createdAt: "2024-01-01",
      description:
        "Immersive AR/VR experiences for education, entertainment, and training simulations.",
      link: "/services/ar-vr",
    },
    {
      title: "ERP System",
      icon: "📊", // ERP Icon
      category: "Business Software",
      status: "Active",
      createdAt: "2024-02-10",
      description:
        "Comprehensive enterprise resource planning to streamline operations and management.",
      link: "/services/erp-system",
    },
    {
      title: "WhatsApp Bot",
      icon: "🤖", // WhatsApp Bot Icon
      category: "Automation",
      status: "Beta",
      createdAt: "2024-01-15",
      description:
        "Automated WhatsApp communication for customer support, notifications, and marketing.",
      link: "/services/whatsapp-bot",
    },
    {
      title: "Headless CMS",
      icon: "📚", // CMS Icon
      category: "Content Management",
      status: "Active",
      createdAt: "2024-01-20",
      description:
        "Flexible content management system for modern websites and applications.",
      link: "/services/headless-cms",
    },
    {
      title: "Website Development",
      icon: "🌐", // Website Icon
      category: "Web Development",
      status: "In Progress",
      createdAt: "2024-02-05",
      description:
        "Custom website development with modern UI/UX and seamless performance.",
      link: "/services/web-development",
    },
    {
      title: "CRM",
      icon: "💼", // CRM Icon
      category: "Business Software",
      status: "Active",
      createdAt: "2024-01-28",
      description:
        "Customer Relationship Management system for sales, marketing, and support.",
      link: "/services/crm",
    },
 
 
];
 
export default function ServiceSection() {
  const router = useRouter();
 
  return (
 
    <HeroHighlight className='h-full py-1'>
  <motion.div
    className=" inset-0 z-0  to-red-500 opacity-30"
    initial={{
      opacity: 0,
      scale: 1.1,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    transition={{
      duration: 1.5,
      ease: [0.4, 0.0, 0.2, 1],
    }}
  >
    <div className="flex flex-col z-10 min-h-[100vh] py-8 justify-around ">
        <div className="container flex flex-col  text-left ">
          {/* Section Title */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="scroll-m-20  font-extrabold ml-2  tracking-tight text-4xl lg:text-5xl z-10 "
          >
            Our Experties
          </motion.h1>
 
          {/* Hover Effect for Projects */}
          <div className="flex flex-col  justify-between  z-10">
            
            <HoverEffect items={projects} />
 
            {/* Related Services Button */}
            <span className="flex justify-center w-full">
         
              <button onClick={() => router.push('/services')} className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
              Related Services
          </button>
            </span>
          </div>
        </div>
    </div>
  </motion.div>
</HeroHighlight>
 
   
  );
}