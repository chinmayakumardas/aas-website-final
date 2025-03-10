

 "use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "@/redux/slices/authSlice";
import {
  ServerCog , Users, Edit, Briefcase, Settings2,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";

const navData = {
  admin: [
 
    { title: "Blog", url: "/blogs", icon: Edit,isActive: true  },
    { title: "Services", url: "/all-services", icon: Briefcase },
    { title: "User", url: "/users", icon: Users },
    { title: "Master", url: "/master", icon: ServerCog  },
    { title: "Settings", url: "/settings/profile", icon: Settings2 },
  ],
  author: [
    
    { title: "Blog", url: "/blogs", icon: Edit,isActive: true  },
    { title: "Settings", url: "/settings/profile", icon: Settings2 },
  ],
};

export function AppSidebar() {
  const dispatch = useDispatch();
  const { userDetails, loading } = useSelector((state) => state.auth);
  const email = typeof window !== "undefined" ? Cookies.get("email") : null;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (email) {
      dispatch(getUserDetails(email));
    }
  }, [dispatch, email]);

  useEffect(() => {
    if (userDetails) {
      setUserData(userDetails);
    }
  }, [userDetails]);

  if (loading) return null;
  if (!userData) return null;

  const role = userData?.role || "author"; // Default to "auther" if role is not available
  const navItems = navData[role];

  return (
    <Sidebar className="top-[--header-height] !h-[calc(100svh-var(--header-height))]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/assets/favicon.ico" alt="Company Logo" className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">AAS Infotech.</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}











