
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Import useRouter for redirection
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Spinner from "@/components/ui/spinner"; // Import the spinner component

export default function AdminPannelLayout({ children }) {
  const [loading, setLoading] = useState(true); // State to manage loading
  const roles = Cookies.get('role');
  
  // If role is undefined or invalid, redirect to login
  const user = { role: roles };

  const router = useRouter();

  useEffect(() => {
    if (!user.role) {
      // If role is undefined or invalid, redirect to the login page
      router.push("/login");
    } else {
      // If role is valid, stop loading
      setLoading(false);
    }
  }, [user.role, router]);

  if (loading) {
    // Show the spinner while loading
    return <Spinner />;
  }

  return (
    <Provider store={store}>
      <div className="[--header-height:calc(theme(spacing.14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar user={user} />
            <SidebarInset>
              {children}
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </Provider>
  );
}
