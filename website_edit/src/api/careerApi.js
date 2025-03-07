
import axiosInstance from "@/utils/axiosInstance";
// Function to fetch the job list
export const fetchJobList = async () => {
  try {
    const response = await axiosInstance.get("/jobs/getjoblist");
    return response.data.jobs;  // Return the list of jobs
  } catch (error) {
    throw error;  // Throw error if API call fails
  }
};

// Function to apply for a job
export const applyJob = async (userData) => {
  try {
    const response = await axiosInstance.post("/jobs/submit",userData);
    return response.data;  // Return the response data from the API
  } catch (error) {
    throw error;  // Throw error if the apply-job API call fails
  }
};
export const getJobbyId = async (jobId) => {
  try {
    const response = await axiosInstance.get(`/jobs/getjobbyid/${jobId}`);
    return response.data;  // Return the response data from the API
  } catch (error) {
    throw error;  // Throw error if the apply-job API call fails
  }
};

export default axiosInstance;
