'use client';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ChartBar, Clock, Target, CheckCircle, ShoppingCart, Heart, Wallet, Store, Truck } from 'lucide-react';

const caseStudyDetails = {
  'ecommerce-growth': {
    title: 'E-commerce Growth Strategies',
    client: 'Leading Online Retailer',
    industry: 'E-commerce',
    duration: '6 months',
    challenge: 'The client struggled with low conversion rates, poor user engagement, and inefficient marketing spend.',
    description: 'A comprehensive transformation of an e-commerce platform resulting in 300% growth.',
    solution: [
      'Implemented advanced analytics and heat mapping',
      'Redesigned user journey and checkout process',
      'Optimized mobile experience',
      'Developed targeted marketing campaigns'
    ],
    result: [
      '300% increase in sales',
      '250% improvement in conversion rate',
      '2x higher customer retention rate',
      '45% reduction in cart abandonment'
    ],
    metrics: {
      roi: '450%',
      timeframe: '6 months',
      satisfaction: '98%'
    }
  },
  'ai-in-healthcare': {
    title: 'AI in Healthcare',
    client: 'Major Healthcare Provider',
    industry: 'Healthcare',
    duration: '12 months',
    challenge: 'The client was facing diagnostic delays and inconsistent accuracy. They needed advanced AI solutions to process large volumes of patient data efficiently.',
    description: 'Implementing AI for better diagnosis and treatment planning.',
    solution: [
      'Developed AI-based diagnostic tools using image recognition',
      'Implemented patient monitoring systems with real-time analytics',
      'Integrated with EHR systems for seamless data sharing',
      'Trained medical staff to adopt AI-driven workflows'
    ],
    result: [
      '20% faster diagnosis with 95% accuracy',
      '30% reduction in misdiagnosis incidents',
      'Improved patient outcomes and reduced wait times',
      'Greater physician and patient satisfaction'
    ],
    metrics: {
      roi: '300%',
      timeframe: '12 months',
      satisfaction: '92%'
    }
  },
  'fintech-security': {
    title: 'Fintech Security Solutions',
    client: 'Innovative Fintech Startup',
    industry: 'Fintech',
    duration: '9 months',
    challenge: 'Frequent security breaches led to compromised user trust and regulatory concerns. A robust, modern security framework was needed.',
    description: 'Strengthening security in fintech applications.',
    solution: [
      'Implemented blockchain-based authentication for user verification',
      'Enhanced encryption and key management systems',
      'Introduced multi-factor authentication for high-risk transactions',
      'Deployed real-time fraud detection algorithms'
    ],
    result: [
      'Reduced fraud cases by 50%',
      'Improved transaction security and user trust',
      'Secured compliance with financial regulations',
      'Strengthened reputation in the fintech market'
    ],
    metrics: {
      roi: '250%',
      timeframe: '9 months',
      satisfaction: '95%'
    }
  },
  'edtech-transformation': {
    title: 'EdTech Transformation',
    client: 'Global Online Learning Platform',
    industry: 'Education',
    duration: '8 months',
    challenge: 'Low student engagement and high dropout rates. The platform lacked personalization and real-time feedback loops.',
    description: 'AI-driven engagement for online learning platforms.',
    solution: [
      'Integrated adaptive learning algorithms for personalized content',
      'Added real-time progress tracking and feedback tools',
      'Implemented gamification features to boost student motivation',
      'Optimized mobile experience for remote learners'
    ],
    result: [
      '35% increase in student retention',
      'Higher course completion rates',
      'Improved student satisfaction scores',
      'Positive educator feedback on analytics'
    ],
    metrics: {
      roi: '200%',
      timeframe: '8 months',
      satisfaction: '90%'
    }
  },
  'retail-optimization': {
    title: 'Retail Sales Optimization',
    client: 'National Retail Chain',
    industry: 'Retail',
    duration: '7 months',
    challenge: 'Fragmented customer data and ineffective in-store promotions led to stagnant sales. The client needed a data-centric strategy.',
    description: 'Leveraging data analytics to boost in-store & online performance.',
    solution: [
      'Unified customer data into a single analytics platform',
      'Deployed targeted in-store promotions via digital signage',
      'Revamped online storefront for mobile and desktop',
      'Rolled out loyalty programs with personalized offers'
    ],
    result: [
      '25% boost in overall sales',
      'Higher foot traffic in key store locations',
      'Improved repeat purchases via loyalty program',
      'Better marketing spend efficiency'
    ],
    metrics: {
      roi: '280%',
      timeframe: '7 months',
      satisfaction: '93%'
    }
  },
  'logistics-ai': {
    title: 'AI in Logistics',
    client: 'Global Supply Chain Enterprise',
    industry: 'Logistics',
    duration: '10 months',
    challenge: 'Inefficient route planning and unpredictable demand spikes led to delays and cost overruns. A predictive AI approach was needed.',
    description: 'Optimizing supply chain efficiency with predictive AI models.',
    solution: [
      'Developed AI-driven demand forecasting models',
      'Implemented route optimization algorithms',
      'Automated warehouse operations with machine learning',
      'Integrated real-time tracking for transparent logistics'
    ],
    result: [
      '30% reduction in delivery delays',
      '20% decrease in overall transportation costs',
      'Improved customer satisfaction due to faster deliveries',
      'Enhanced visibility across the entire supply chain'
    ],
    metrics: {
      roi: '320%',
      timeframe: '10 months',
      satisfaction: '96%'
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CaseStudyViewPage() {
  const { caseStudyId } = useParams();
  const router = useRouter();
  const study = caseStudyDetails[caseStudyId];

  if (!study) {
    return <p className="text-center text-gray-500">Case Study Not Found</p>;
  }

  return (
    <>
      {/* Hero Banner */}
      <div className="relative h-[42vh]">
        <div className="absolute inset-0 bg-[url('/assets/client-banner02.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#AF9B5C]/10 to-[#AF9B5C]/5" />
        <div className="relative max-w-6xl mx-auto px-8 py-12">
          <Button
            onClick={() => router.push('/insights/case-studies')}
            className="mb-6 bg-black/20 hover:bg-black/30 text-white border-white/20"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Case Studies
          </Button>
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#AF9B5C] to-[#AF9B5C]/80 bg-clip-text text-transparent">
              {study.title}
            </h1>
            <p className="text-xl text-[#AF9B5C]">{study.client}</p>
            <div className="flex gap-6 mt-6 text-gray-300">
              <span className="flex items-center gap-2">
                <Target size={20} className="text-[#AF9B5C]" /> {study.industry}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={20} className="text-[#AF9B5C]" /> {study.duration}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 -mt-3 relative z-10 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl border-[#AF9B5C]/20">
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid gap-12"
              >
                {/* Challenge */}
                {study.challenge && (
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 mb-4">The Challenge</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{study.challenge}</p>
                  </section>
                )}

                {/* Solution */}
                {study.solution && (
                  <section className="bg-gradient-to-br from-[#AF9B5C]/5 to-white p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-[#AF9B5C] mb-6">Our Solution</h3>
                    <ul className="grid gap-4">
                      {study.solution.map((sol, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3 text-gray-600 text-lg"
                        >
                          <CheckCircle size={24} className="text-black-500 mt-1" />
                          <span>{sol}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Results */}
                {study.result && (
                  <section>
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Key Results</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {study.result.map((res, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="bg-black p-6 rounded-xl text-white border border-[#AF9B5C]/20"
                        >
                          <ChartBar size={28} className="text-[#AF9B5C] mb-3" />
                          <p className="text-lg font-medium">{res}</p>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Metrics */}
                {study.metrics && (
                  <section className="border-t border-[#AF9B5C]/20 pt-12">
                    <div className="grid grid-cols-3 gap-8">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-[#AF9B5C] mb-2">{study.metrics.roi}</p>
                        <p className="text-gray-600">Return on Investment</p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-[#AF9B5C] mb-2">{study.metrics.timeframe}</p>
                        <p className="text-gray-600">Implementation Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-[#AF9B5C] mb-2">{study.metrics.satisfaction}</p>
                        <p className="text-gray-600">Client Satisfaction</p>
                      </div>
                    </div>
                  </section>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
}