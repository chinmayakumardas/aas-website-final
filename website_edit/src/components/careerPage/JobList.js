

// 'use client';
// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { getJobList, applyForJob } from "@/redux/slices/careerSlice";  // Import thunks
// import { motion } from 'framer-motion';
// import { FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
 
// export default function JobListPage() {
//   const [search, setSearch] = useState("");
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;
//   const router = useRouter();
//   const dispatch = useDispatch();
 
//   // Select job state from Redux
//   const { jobList, loading, error, applicationStatus } = useSelector((state) => state.career);
 
//   // Fetch job list when the component mounts
//   useEffect(() => {
//     dispatch(getJobList());
//   }, [dispatch]);
 
//   // Handle search action
//   const handleSearch = () => {
//     setQuery(search);
//   };
 
//   // Filter jobs based on search query
//   const filteredJobs = jobList.filter((job) =>
//     job.jobTitle.toLowerCase().includes(query.toLowerCase())
//   );
 
//   // Paginate filtered jobs
//   const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
 
//   // Handle Apply Job action
//   const handleApply = (jobId) => {
//   dispatch(applyForJob({ jobId, userData }));
//     router.push(`/career/apply/${jobId}`)
//   };
 
//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
 
//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       y: 20
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5
//       }
//     }
//   };
 
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Open Positions
//         </h1>
//         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//           Join our team and be part of something extraordinary
//         </p>
//       </motion.div>
 
//       <div className="flex justify-center items-center gap-2 mb-8">
//         <div className="relative w-[50vw]">
//           <Input
//             placeholder="Search jobs..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full py-2 px-4"
//           />
//         </div>
//         <Button onClick={handleSearch} className="h-[40px]">Search</Button>
//       </div>
 
//       {/* Loading Spinner */}
//       {loading && <div>Loading jobs...</div>}
 
//       {/* Displaying Error */}
//       {error && <div className="text-red-500">{error}</div>}
 
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="grid gap-8 mb-8"
//       >
//         {paginatedJobs.length > 0 ? (
//           paginatedJobs.map((job) => (
//             <motion.div
//               key={job._id}
//               variants={itemVariants}
//               className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer min-h-[120px]"
//               onClick={() => router.push(`/career/jobs/${job.jobId}`)}
//             >
//               <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-[#AF9B5C]/10 flex items-center justify-center">
//                     <span className="text-[#AF9B5C] text-xl">
//                       {job.jobTitle.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#AF9B5C] transition-colors">
//                       {job.jobTitle}
//                     </h3>
//                     <div className="flex items-center gap-4 mt-2 text-gray-600">
//                       <div className="flex items-center gap-1">
//                         <FaMapMarkerAlt className="text-[#AF9B5C]" />
//                         <span>{job.location}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FaClock className="text-[#AF9B5C]" />
//                         <span>{job.workingSchedule}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2 ml-auto">
//                   <span className="text-[#AF9B5C] font-medium">View Details</span>
//                   <div className="w-8 h-8 rounded-full bg-[#AF9B5C]/10 flex items-center justify-center group-hover:bg-[#AF9B5C] transition-colors">
//                     <FaArrowRight className="text-[#AF9B5C] group-hover:text-white transition-colors" />
//                   </div>
//                   <Button
//                     className="ml-4"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleApply(job.jobId);
//                     }}
//                   >
//                     Apply
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center">No jobs found.</p>
//         )}
//       </motion.div>
 
//       {/* Pagination */}
//       <Pagination className="mt-8 mb-4">
//         <PaginationContent className="gap-2">
//           <PaginationItem>
//             <PaginationPrevious
//               href="#"
//               onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//               className="hover:bg-gray-100"
//             />
//           </PaginationItem>
//           {[...Array(Math.ceil(filteredJobs.length / itemsPerPage))].map((_, index) => (
//             <PaginationItem key={index}>
//               <PaginationLink
//                 href="#"
//                 isActive={page === index + 1}
//                 onClick={() => setPage(index + 1)}
//                 className={`${page === index + 1 ? 'bg-[#AF9B5C] text-white' : 'hover:bg-gray-100'}`}
//               >
//                 {index + 1}
//               </PaginationLink>
//             </PaginationItem>
//           ))}
//           <PaginationItem>
//             <PaginationNext
//               href="#"
//               onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(filteredJobs.length / itemsPerPage)))}
//               className="hover:bg-gray-100"
//             />
//           </PaginationItem>
//         </PaginationContent>
//       </Pagination>
 
//       {/* Show application status */}
//       {applicationStatus && (
//         <div className={`text-center ${applicationStatus === 'Failed' ? 'text-red-500' : 'text-green-500'}`}>
//           {applicationStatus === 'Failed' ? 'Application failed, please try again.' : 'Successfully applied for the job!'}
//         </div>
//       )}
//     </div>
//   );
// }




'use client';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getJobList, applyForJob } from "@/redux/slices/careerSlice";  // Import thunks
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
 
export default function JobListPage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const dispatch = useDispatch();
 
  // Select job state from Redux
  const { jobList, loading, error, applicationStatus } = useSelector((state) => state.career);
 
  // Fetch job list when the component mounts
  useEffect(() => {
    dispatch(getJobList());
  }, [dispatch]);
 
  // Handle search action
  const handleSearch = () => {
    setQuery(search);
  };
 
  // Filter jobs based on search query
  const filteredJobs = jobList.filter((job) =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );
 
  // Paginate filtered jobs
  const paginatedJobs = filteredJobs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
 
  // Handle Apply Job action
  const handleApply = (jobId) => {
    dispatch(applyForJob({ jobId, userData }));
    router.push(`/career/apply/${jobId}`)
  };
 
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
        duration: 0.5
      }
    }
  };
 
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Open Positions
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our team and be part of something extraordinary
        </p>
      </motion.div>
 
      <div className="flex justify-center items-center gap-2 ">
        <div className="relative w-[50vw]">
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-2 px-4"
          />
        </div>
        <Button variants="searchBtn" onClick={handleSearch} className=" mb-[10px]">Search</Button>
      </div>
 
      {/* Loading Spinner */}
      {/* {loading && <div>Loading jobs...</div>} */}
 
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 mb-8"
      >
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <motion.div
              key={job._id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer min-h-[120px]"
              onClick={() => router.push(`/career/jobs/${job.jobId}`)}
            >
              <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#AF9B5C]/10 flex items-center justify-center">
                    <span className="text-[#AF9B5C] text-xl">
                      {job.jobTitle.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#AF9B5C] transition-colors">
                      {job.jobTitle}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-[#AF9B5C]" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="text-[#AF9B5C]" />
                        <span>{job.workingSchedule}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-[#AF9B5C] font-medium">View Details</span>
                  <div className="w-8 h-8 rounded-full bg-[#AF9B5C]/10 flex items-center justify-center group-hover:bg-[#AF9B5C] transition-colors">
                    <FaArrowRight className="text-[#AF9B5C] group-hover:text-white transition-colors" />
                  </div>
                  <Button
                    className="ml-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(job.jobId);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-[#AF9A57] text-center">Currently we don't have any openings.</p>
        )}
      </motion.div>
 
      {/* Pagination */}
      <Pagination className="mt-8 mb-4">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="hover:bg-gray-100"
            />
          </PaginationItem>
          {[...Array(Math.ceil(filteredJobs.length / itemsPerPage))].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={page === index + 1}
                onClick={() => setPage(index + 1)}
                className={`${page === index + 1 ? 'bg-[#AF9B5C] text-white' : 'hover:bg-gray-100'}`}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(filteredJobs.length / itemsPerPage)))}
              className="hover:bg-gray-100"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
 
      {/* Show application status */}
      {applicationStatus && (
        <div className={`text-center ${applicationStatus === 'Failed' ? 'text-red-500' : 'text-green-500'}`}>
          {applicationStatus === 'Failed' ? 'Application failed, please try again.' : 'Successfully applied for the job!'}
        </div>
      )}
    </div>
  );
}