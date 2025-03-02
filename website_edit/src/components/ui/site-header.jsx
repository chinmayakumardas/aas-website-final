"use client"

import { SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/ui/search-form"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    (<header
      className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
       
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
       
      </div>
    </header>)
  );
}



// "use client"

// import { SidebarIcon } from "lucide-react"
// import { SearchForm } from "@/components/ui/search-form"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"
// import { useState } from "react" // import useState

// export function SiteHeader() {
//   // Using local state for managing the sidebar toggle
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   // Toggle the sidebar open/close state
//   const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState)

//   return (
//     <header className="fle sticky top-0 z-50 w-full items-center border-b bg-background">
//       <div className="flex h-[--header-height] w-full items-center gap-2 px-4">
//         {/* Button to toggle sidebar */}
//         <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
//           <SidebarIcon />
//         </Button>
//         <Separator orientation="vertical" className="mr-2 h-4" />
        
//         {/* Search form */}
//         <SearchForm className="w-full sm:ml-auto sm:w-auto" />
//       </div>
//     </header>
//   );
// }
