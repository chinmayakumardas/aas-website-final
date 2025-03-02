
'use client'
import AdminPannelLayout from '@/layout/AdminPannelLayout';



const Layout = ({ children }) => {

  return (
  <AdminPannelLayout>


        {children}
    
  </AdminPannelLayout>
  );
};

export default Layout;
