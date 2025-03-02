

// 'use client';
// import { useParams, useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useDispatch, useSelector } from 'react-redux';
// import { getJobById } from "@/redux/slices/careerSlice";  // Import the thunk to fetch job details

// export default function JobDetailsPage() {
//   const { jobid } = useParams();  // Extract jobid from URL parameters
//   const dispatch = useDispatch();
//   const router = useRouter();
  
//   // Select job details and loading/error states from Redux
//   const { jobDetails, loading, error } = useSelector((state) => state.career);
  
//   useEffect(() => {
//     // Dispatch the action to get job details by jobid when the component mounts
//     if (jobid) {
//       dispatch(getJobById(jobid));
//     }
//   }, [dispatch, jobid]);

//   // Show loading state while fetching job details
//   if (loading) {
//     return <div>Loading job details...</div>;
//   }

//   // Show error state if there is an error in fetching job details
//   if (error) {
//     return <div className="text-red-500 text-center">{error}</div>;
//   }

//   console.log(jobDetails);

//   // If no job details found, show a message
//   if (!jobDetails) {
//     return <p className="text-center text-gray-500">Job not found</p>;
//   }

//   return (
//     <div className="mx-auto p-6">
//       {/* Single Card for All Details */}
//       <Card className="w-full p-6 relative"> {/* Set relative positioning for the card */}
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">{jobDetails.jobTitle}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Two-Column Layout */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Job Details Column */}
//             <div className="space-y-3">
//               <p><strong>Job ID:</strong> {jobDetails.job.jobId}</p>
//               <p><strong>Experience:</strong> {jobDetails.job.experience}</p>
//               <p><strong>Role:</strong> {jobDetails.job.jobRole.join(", ")}</p>
//               <p><strong>Location:</strong> {jobDetails.job.location}</p>
//               <p><strong>Salary:</strong> ${jobDetails.job.salary}</p>
//               <p><strong>Type:</strong> {jobDetails.job.workingSchedule}</p>
//               <p><strong>Job Category:</strong> {jobDetails.job.jobCategory}</p>
//               <p><strong>Skills Required:</strong> {jobDetails.job.skills.join(", ")}</p>
//               <p><strong>Number of Vacancies:</strong> {jobDetails.job.numberOfVacancies}</p>
//               <p><strong>Interview Type:</strong> {jobDetails.job.interviewType}</p>
//               <p><strong>Interview Rounds:</strong> {jobDetails.job.interviewRounds.join(", ")}</p>
//               <p><strong>Published On:</strong> {new Date(jobDetails.job.publishDate).toLocaleDateString()}</p>
//               <p><strong>Expiration Date:</strong> {new Date(jobDetails.job.expiredDate).toLocaleDateString()}</p>
//             </div>

//             {/* Job Description Column */}
//             <div className="space-y-3">
//               <p className="font-semibold text-lg">Job Description</p>
//               <p className="text-gray-600">
//                 {jobDetails.job.jobDescription.length > 40 
//                   ? `${jobDetails.job.jobDescription}` 
//                   : jobDetails.job.jobDescription}
//               </p>
//             </div>
//                 {/* Apply Button Positioned in the Right-Bottom Corner */}
//                 <Button 
//                   className="absolute bottom-4 right-4" 
//                   onClick={() => router.push(`/career/apply/${jobDetails.job.jobId}`)}
//                 >
//                   Apply Now
//                 </Button>
//           </div>
//         </CardContent>

//       </Card>
//     </div>
//   );
// }
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