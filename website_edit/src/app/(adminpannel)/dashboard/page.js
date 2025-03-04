// import AdminDashboard from "@/components/adminPannel/AdminDashboard";
// import AutherDashboard from "@/components/adminPannel/AutherDashborad";
// const Dashboard = () => {

// const role='admin';


//   return (
//    <div>
//     {
//       role==="admin"?<AdminDashboard/>:<AutherDashboard/>
//     }
//    </div>
//   );
// };

// export default Dashboard;

'use client'
import React, { useState, useEffect } from "react";
import AdminDashboard from "@/components/adminPannel/AdminDashboard";
import AutherDashboard from "@/components/adminPannel/AutherDashborad";
import Spinner from "@/components/ui/spinner"; // Import the spinner

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Always show spinner first
    const userRole = "admin"; // Replace this with actual role-fetching logic
    setRole(userRole);
    
    // Small delay to ensure the spinner is visible for a moment (adjust as needed)
    const timer = setTimeout(() => setLoading(false), 500); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Spinner />
      </div>
    );
  }

  return <div>{role === "admin" ? <AdminDashboard /> : <AutherDashboard />}</div>;
};

export default Dashboard;


