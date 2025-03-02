import AdminDashboard from "@/components/adminPannel/AdminDashboard";
import AutherDashboard from "@/components/adminPannel/AutherDashborad";
const Dashboard = () => {

const role='admin';


  return (
   <div>
    {
      role==="admin"?<AdminDashboard/>:<AutherDashboard/>
    }
   </div>
  );
};

export default Dashboard;


