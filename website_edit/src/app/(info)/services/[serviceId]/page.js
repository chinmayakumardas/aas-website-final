'use client';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const serviceDetails = {
  'web-development': {
    name: 'Web Development',
    description: 'We build modern and scalable web applications using cutting-edge technologies.',
    banner: '/assets/web-dev.jpg',
    features: [
      'Custom Web Application Development',
      'E-commerce Solutions',
      'Progressive Web Apps (PWA)',
      'API Development & Integration',
      'Database Design & Optimization',
      'Web Security Implementation'
    ],
    technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'AWS'],
    process: [
      'Requirement Analysis',
      'Design & Architecture',
      'Development',
      'Testing & QA',
      'Deployment',
      'Maintenance & Support'
    ]
  },
  'mobile-development': {
    name: 'Mobile Development',
    description: 'Custom Android and iOS applications tailored to your business needs with native performance and seamless user experience across all mobile platforms.',
    banner: '/assets/mobile-dev.jpg',
    features: [
      'Native iOS Development',
      'Native Android Development',
      'Cross-platform Solutions',
      'Mobile App UI/UX Design',
      'App Store Optimization',
      'Push Notifications Integration'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    process: [
      'Market Research',
      'UI/UX Design',
      'App Development',
      'Testing',
      'App Store Submission',
      'Post-launch Support'
    ]
  },
  'ui-ux': {
    name: 'UI/UX Design',
    description: 'Creating user-friendly and beautiful designs that enhance user engagement and satisfaction while delivering intuitive and memorable digital experiences.',
    banner: '/assets/ui-ux.jpg',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design',
      'Interaction Design',
      'Usability Testing',
      'Design Systems Creation'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin'],
    process: [
      'User Research',
      'Information Architecture',
      'Wireframing',
      'Visual Design',
      'Prototyping',
      'User Testing'
    ]
  },
  'cloud-services': {
    name: 'Cloud Solutions',
    description: 'Scalable and secure cloud infrastructure solutions to power your digital transformation journey with optimized performance and cost-effective resource management.',
    banner: '/assets/cloud.jpg',
    features: [
      'Cloud Infrastructure Setup',
      'Cloud Migration Services',
      'DevOps Implementation',
      'Serverless Architecture',
      'Cloud Security & Compliance',
      'Performance Optimization'
    ],
    technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
    process: [
      'Cloud Assessment',
      'Architecture Planning',
      'Migration Strategy',
      'Implementation',
      'Testing & Validation',
      'Monitoring & Support'
    ]
  },
  'data-analytics': {
    name: 'Data Analytics',
    description: 'Transform your raw data into actionable insights with our advanced analytics and visualization solutions.',
    banner: '/assets/analytics.jpg',
    features: [
      'Business Intelligence',
      'Predictive Analytics',
      'Data Visualization',
      'Real-time Analytics',
      'Machine Learning Integration',
      'Custom Dashboard Development'
    ],
    technologies: ['Python', 'R', 'Tableau', 'Power BI', 'TensorFlow'],
    process: [
      'Data Collection',
      'Data Cleaning',
      'Analysis & Modeling',
      'Visualization Design',
      'Implementation',
      'Continuous Monitoring'
    ]
  },
  'ar-vr': {
    name: 'AR/VR Solutions',
    description: 'Immersive augmented and virtual reality experiences that revolutionize how users interact with digital content.',
    banner: '/assets/ar-vr.jpg',
    features: [
      'Virtual Reality Applications',
      'Augmented Reality Solutions',
      '3D Environment Design',
      'Interactive Experiences',
      'VR/AR Training Solutions',
      'Product Visualization'
    ],
    technologies: ['Unity', 'Unreal Engine', 'ARKit', 'ARCore', 'WebXR'],
    process: [
      'Experience Design',
      '3D Modeling',
      'Interaction Development',
      'Environment Creation',
      'Testing & Optimization',
      'Deployment & Support'
    ]
  },
  'erp-system': {
    name: 'ERP System',
    description: 'Comprehensive Enterprise Resource Planning solutions to streamline your business operations and improve efficiency.',
    banner: '/assets/erp.jpg',
    features: [
      'Financial Management',
      'Inventory Management',
      'Human Resources Management',
      'Supply Chain Management',
      'Business Intelligence',
      'Workflow Automation'
    ],
    technologies: ['SAP', 'Oracle', 'Microsoft Dynamics', 'NetSuite', 'Odoo'],
    process: [
      'Business Analysis',
      'System Design',
      'Configuration',
      'Data Migration',
      'User Training',
      'Go-Live Support'
    ]
  },
  'whatsapp-bot': {
    name: 'WhatsApp Bot',
    description: 'Automated WhatsApp solutions for enhanced customer engagement and business communication.',
    banner: '/assets/whatsapp-bot.jpeg',
    features: [
      'Automated Customer Support',
      'Order Processing',
      'Appointment Scheduling',
      'Product Catalog Integration',
      'Payment Integration',
      'Analytics Dashboard'
    ],
    technologies: ['WhatsApp Business API', 'Node.js', 'DialogFlow', 'MongoDB', 'WebSocket'],
    process: [
      'Bot Strategy Planning',
      'Conversation Flow Design',
      'Integration Setup',
      'Testing & Training',
      'Deployment',
      'Performance Monitoring'
    ]
  },
  'headless-cms': {
    name: 'Headless CMS',
    description: 'Flexible content management solutions that separate content from presentation for seamless multi-platform delivery.',
    banner: '/assets/headless-cms.webp',
    features: [
      'Content Modeling',
      'API-First Architecture',
      'Multi-Channel Publishing',
      'Content Version Control',
      'Asset Management',
      'Workflow Management'
    ],
    technologies: ['Strapi', 'Contentful', 'Sanity', 'GraphQL', 'REST API'],
    process: [
      'Content Strategy',
      'Architecture Design',
      'Content Modeling',
      'API Development',
      'Frontend Integration',
      'Content Migration'
    ]
  },
  'crm': {
    name: 'CRM Solutions',
    description: 'Customer Relationship Management systems to enhance customer experience and boost sales efficiency.',
    banner: '/assets/crm.jpg',
    features: [
      'Contact Management',
      'Sales Pipeline Management',
      'Email Marketing Integration',
      'Analytics & Reporting',
      'Task Automation',
      'Mobile CRM Access'
    ],
    technologies: ['Salesforce', 'HubSpot', 'Microsoft Dynamics', 'Zoho', 'REST API'],
    process: [
      'Requirements Gathering',
      'CRM Configuration',
      'Data Migration',
      'Integration Setup',
      'User Training',
      'Support & Maintenance'
    ]
  }
};

export default function ServiceViewPage() {
  const { serviceId } = useParams();
  const router = useRouter();
  const service = serviceDetails[serviceId];

  if (!service) {
    return <p className="text-center text-gray-500">Service Not Found</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={service.banner}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">{service.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto p-6 py-16"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faCheck} className="text-gray-700" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Technologies We Use</h3>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Our Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.process.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" />
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push('/contact')}
                  className="px-8 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors duration-300"
                >
                  Get a Quote
                </button>
                <button
                  onClick={() => router.back()}
                  className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors duration-300"
                >
                  Back to Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}