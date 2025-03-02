'use client';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaBriefcase, FaDollarSign, FaGraduationCap } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
 
export default function JobDetails({ job, onApply }) {
  if (!job) return null;
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#AF9B5C]/10 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.jobTitle}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#AF9B5C]" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-[#AF9B5C]" />
                  <span>{job.workingSchedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-[#AF9B5C]" />
                  <span>{job.experience} Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-[#AF9B5C]" />
                  <span>${job.salary}</span>
                </div>
              </div>
            </div>
            <Button
              onClick={onApply}
              className="bg-[#AF9B5C] hover:bg-[#AF9B5C]/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
            </Button>
          </div>
        </div>
 
        <div className="p-8">
          {/* Job Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </section>
 
          {/* Requirements */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-3">
              {job.requirements.map((req, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#AF9B5C]" />
                  <span>{req}</span>
                </motion.li>
              ))}
            </ul>
          </section>
 
          {/* Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {job.responsibilities.map((resp, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-gray-600"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#AF9B5C]" />
                  <span>{resp}</span>
                </motion.li>
              ))}
            </ul>
          </section>
 
          {/* Qualifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Qualifications</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <FaGraduationCap className="text-[#AF9B5C] text-xl" />
              <span>{job.qualification}</span>
            </div>
          </section>
 
          {/* Benefits */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-[#AF9B5C]" />
                  <span className="text-gray-600">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}