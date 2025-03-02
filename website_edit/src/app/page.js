
'use client'
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import PublicLayout from '../layout/PublicLayout'
import HeroSection from "@/components/homePage/heroSection";
import ServiceSection from "@/components/homePage/serviceSection";
import { Public } from "@mui/icons-material";
import BlogSection from "@/components/homePage/blogSection";
import WorkSectorsSection from "@/components/homePage/workSectorsSection";
export default function HomePage() {
  return (
<PublicLayout>
      <HeroSection/>
    <div className="flex flex-col  min-h-screen ">
      <ServiceSection/>
      <WorkSectorsSection/>
      <BlogSection/>
    </div>


   </PublicLayout>
    
  
  );
}


