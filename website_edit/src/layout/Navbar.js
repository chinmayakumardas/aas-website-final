'use client'
import "../app/globals.css";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import MenuIcon from '@mui/icons-material/Menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import * as React from "react"
 
 
 
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
 
} from "@/components/ui/navigation-menu"; // Adjust path
import { ListItem } from "@mui/material";
import  Insights  from "@/layout/header/Insights";
import Services from "./header/Services";
import More from "./header/More";
 
 
export function NavbarDemo() {
 
 
  return (
   
 
    <header className="fixed  w-full sm:py-4 h-[60px] sm:h-[100px] z-50 bg-white text-black dark:text-white dark:bg-black flex  justify-between shadow-md main_header">
          {/* ShadCN Navigation Menu */}
          <NavigationMenu className='my-auto'>
          <div className="flex flex-col items-center">
 
              {/* Company Logo */}
              <Link href='/'> <img src="/assets/aaslogo.png" className="h-[50px] sm:h-[70px] mx-4 sm:mx-10" alt=""  /></Link>
          </div>
             
            <NavigationMenuList className="relative flex justify-center items-center ">
           
              {/* Static More section 1 */}
              <NavigationMenuItem className="group hidden lg:block">
                <NavigationMenuTrigger className="text-xl">Insights</NavigationMenuTrigger>
                <NavigationMenuContent className=" transition-all duration-300 group-hover:w-[100vw] ">
               
                  <ul className="grid  p-4  lg:grid-cols-[.75fr_1fr] w-[100vw]  ">
                      <ListItem className="grid  p-4  lg:grid-cols-[.75fr_1fr] w-[100vw]">
                        <Insights/>
                       
                      </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
               {/* services */}
              <NavigationMenuItem className="group hidden lg:block">
                <NavigationMenuTrigger className="text-xl">Services</NavigationMenuTrigger>
                <NavigationMenuContent className=" transition-all duration-300 group-hover:w-[100vw] ">
               
                  <ul className="grid  p-4  lg:grid-cols-[.75fr_1fr] w-[100vw]  ">
                      <ListItem className="grid  p-4  lg:grid-cols-[.75fr_1fr] w-[100vw]">
                        <Services/>
                       
                      </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* more */}
              <NavigationMenuItem className="group hidden lg:block">
                <NavigationMenuTrigger className="text-xl">More</NavigationMenuTrigger>
                <NavigationMenuContent className=" transition-all duration-300 group-hover:w-[100vw] ">
               
                  <ul className="grid  p-4  lg:grid-cols-[.75fr_1fr] w-[100vw]  ">
                      <ListItem className="grid  p-4  lg:grid-cols-[.75fr_1fr] w-[100vw]">
                        <More/>
                       
                      </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
 
 
            </NavigationMenuList>
 
          </NavigationMenu>
 
 
           <div className="flex justify-center items-center space-x-4 mx-3 sm:mx-10">
         
              <Link href={`/contact`}  className=" cursor-pointer">
              <button className='rounded-[10px] text-md md:text-xl bg-black text-white hover:text-black hover:bg-[#AF9A57] py-2 md:py-3 px-4 md:px-7 transition-colors duration-300'>Contact Us</button>
           
              </Link>
     
             <Sheet className="" >
                  <SheetTrigger className="block lg:hidden">
                  <MenuIcon style={{ height: "35px", width: "35px" }} />
 
                    {/* <MenuIcon className="transition-all h-[55px] w-[55px]" /> */}
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle></SheetTitle>
                      <SheetDescription className='py-3'>
                        <Accordion type="single" collapsible className="w-full">
                       
                       
                     
                       
                     
                          <AccordionItem value="item-3">
                            <AccordionTrigger className="p-4 transition-colors duration-300 text-[1.5rem]">Insights</AccordionTrigger>
                            <AccordionContent className="w-full flex flex-col text-[1rem]">
                              <Link href="/insights/case-studies" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">Reent Case Studies</Link>
                              <Link href="/blog" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">Blog</Link>
                             
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger className="p-4 transition-colors duration-300 text-[1.5rem]">Services</AccordionTrigger>
                            <AccordionContent className="w-full flex flex-col text-[1rem]">
                              <Link href="/services" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">AR/VR</Link>
                              <Link href="/services" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">UI/UX</Link>
                              <Link href="/services" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">Website Development</Link>
                              <Link href="/services" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">Data Analysis</Link>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-4">
                            <AccordionTrigger className="p-4 transition-colors duration-300 text-[1.5rem]">About us</AccordionTrigger>
                            <AccordionContent className="w-full flex flex-col text-[1rem]">
                              <Link href="/about-us" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">About US</Link>
                           
                              <Link href="/blog" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">Blog</Link>
                              <Link href="/contact" className="p-4 border-l-4 border-transparent hover:border-l-[#000] dark:hover:border-l-[#fff] transition-colors duration-300 text-left">Connect with us</Link>
                            </AccordionContent>
                          </AccordionItem>
                       
                     
                        </Accordion>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
              </Sheet>
           </div>
 
 
</header>
 
  );
}
 
 