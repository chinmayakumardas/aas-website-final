



"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Footer from "./Footer";
import { NavbarDemo } from "./Navbar";


export default function PublicLayout({ children }) {
 

  return (
    <Provider store={store} >
      <div className="flex flex-col min-h-screen justify-between">
        <NavbarDemo />
        
        <div>
        <main className="pt-[50px] sm:pt-[100px]" >{children}</main>
        <Footer />
        </div>
      </div>
    </Provider>
  );
}

