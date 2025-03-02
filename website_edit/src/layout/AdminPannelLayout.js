'use client'
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


import { Provider } from "react-redux";
import store from "@/redux/store";
import React from "react";
import Cookies from "js-cookie";

export default function AdminPannelLayout({ children }) {
  const roles= Cookies.get('role')||'auther'
  console.log(roles)
  //const roles= localStorage.getItem('role')
  //const user = { role: 'admin' };
  const user = { role: roles };
  
  ///console.log(roles)
 

  return (
    <Provider store={store} >



    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar user={user} />
          <SidebarInset>
  
            {children }  
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>

   
    </Provider>
  );
}

