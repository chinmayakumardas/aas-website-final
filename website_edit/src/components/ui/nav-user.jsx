"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Cookies from "js-cookie";



import { useRouter } from 'next/navigation';
export const clearAuthCookies = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("email");
  Cookies.remove("role");
};
export function NavUser({
  user
}) {

  
  const router = useRouter();
  const { isMobile } = useSidebar()

  // Correct the handleLogout function here
  const handleLogout = () => {
    clearAuthCookies();
    router.push('/login'); // Redirect to login page
  };
 
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.firstName} />
                {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                <AvatarFallback className="rounded-lg">
                  {user?.firstName?.charAt(0).toUpperCase()}{user?.lastName?.charAt(0).toUpperCase()}
                </AvatarFallback>

              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.firstName+" "+user.lastName}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
         <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-80 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.firstName} />
                <AvatarFallback className="rounded-lg">  {user?.firstName?.charAt(0).toUpperCase()}{user?.lastName?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.role}</span>
                
                <span className="truncate text-sm">{ `@${user.username}`}</span>
                
               
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* Attach onClick handler to DropdownMenuItem */}
          <DropdownMenuItem 
            onClick={handleLogout} 
            className="cursor-pointer"
          >
            <LogOut className="mr-2" />
            Log out
          </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
  );
}
