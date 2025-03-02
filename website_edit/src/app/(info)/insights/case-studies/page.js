'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Briefcase, ShoppingCart, Heart, Wallet, Store, Truck, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import motion components with SSR disabled
const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div),
  { ssr: false }
);

const caseStudies = [
  {
    id: 'ecommerce-growth',
    title: 'E-commerce Growth Strategies',
    description: 'How we helped an online store increase sales by 300%',
    industry: 'E-commerce',
    duration: '6 months',
    tags: ['Digital Marketing', 'UX Design', 'Analytics']
  },
  {
    id: 'ai-in-healthcare',
    title: 'AI in Healthcare',
    description: 'Implementing AI solutions for better diagnostics',
    industry: 'Healthcare',
    duration: '12 months',
    tags: ['Artificial Intelligence', 'Machine Learning', 'Healthcare Tech']
  },
  {
    id: 'fintech-security',
    title: 'Fintech Security Solutions',
    description: 'Enhancing cybersecurity in the fintech sector',
    industry: 'Fintech',
    duration: '9 months',
    tags: ['Cybersecurity', 'Blockchain', 'Finance']
  },
  {
    id: 'edtech-transformation',
    title: 'EdTech Transformation',
    description: 'AI-driven engagement for online learning platforms',
    industry: 'Education',
    duration: '8 months',
    tags: ['E-learning', 'Artificial Intelligence', 'Student Engagement']
  },
  {
    id: 'retail-optimization',
    title: 'Retail Sales Optimization',
    description: 'Leveraging data analytics to boost in-store & online performance',
    industry: 'Retail',
    duration: '7 months',
    tags: ['Data Analytics', 'Customer Experience', 'Retail Tech']
  },
  {
    id: 'logistics-ai',
    title: 'AI in Logistics',
    description: 'Optimizing supply chain efficiency with predictive AI models',
    industry: 'Logistics',
    duration: '10 months',
    tags: ['Artificial Intelligence', 'Supply Chain', 'Predictive Analytics']
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function CaseStudyPage() {
  const getIcon = (industry) => {
    switch (industry.toLowerCase()) {
      case 'e-commerce':
        return <ShoppingCart className="w-6 h-6 text-[#AF9B5C]" />;
      case 'healthcare':
        return <Heart className="w-6 h-6 text-[#AF9B5C]" />;
      case 'fintech':
        return <Wallet className="w-6 h-6 text-[#AF9B5C]" />;
      case 'education':
        return <GraduationCap className="w-6 h-6 text-[#AF9B5C]" />;
      case 'retail':
        return <Store className="w-6 h-6 text-[#AF9B5C]" />;
      case 'logistics':
        return <Truck className="w-6 h-6 text-[#AF9B5C]" />;
      default:
        return <Building2 className="w-6 h-6 text-[#AF9B5C]" />;
    }
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/assets/client-banner02.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#AF9B5C]/10 to-[#AF9B5C]/5" />
        <div className="relative max-w-6xl mx-auto px-8 py-24">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#AF9B5C] font-medium block mb-4"
            >
              Our Success Stories
            </MotionDiv>
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-[#AF9B5C] to-[#AF9B5C]/80 bg-clip-text text-transparent">
              Case Studies
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore how we've helped businesses across industries achieve extraordinary results
            </p>
          </MotionDiv>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <MotionDiv
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => (
            <MotionDiv
              key={study.id}
              variants={item}
              className="group"
            >
              <Link href={`/insights/case-studies/${study.id}`}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl border-[#AF9B5C]/20 hover:border-[#AF9B5C]/40 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-black">
                        {getIcon(study.industry)}
                      </div>
                      <div>
                        <p className="text-[#AF9B5C] text-sm">{study.industry}</p>
                        <CardTitle className="text-xl font-semibold text-gray-800">{study.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{study.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm bg-[#AF9B5C] text-white font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                      <Clock size={16} className="text-[#AF9B5C]" />
                      {study.duration}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </>
  );
}