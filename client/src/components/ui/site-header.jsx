

"use client"

import { SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/ui/search-form"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname()

  // Convert pathname to breadcrumb items
  const pathSegments = pathname.split("/").filter((segment) => segment) // Remove empty segments

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-[--header-height] w-full items-center justify-between gap-4 p-4">
        {/* Left Side: Sidebar + Breadcrumb */}
        <div className="flex items-center gap-2 ">
          <Button className="h-8 w-8 -mt-1" variant="ghost" size="icon" onClick={toggleSidebar}>
            <SidebarIcon />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          
          {/* Breadcrumb */}
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>

              {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join("/")}`
                const isLast = index === pathSegments.length - 1

                return (
                  <div key={href} className="flex items-center gap-2">
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <span className="text-muted-foreground">
                          {decodeURIComponent(segment).replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        </span>
                      ) : (
                        <BreadcrumbLink href={href}>
                          {decodeURIComponent(segment).replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right Side: Search Form */}
        <SearchForm className="w-full sm:w-auto" />
      </div>
    </header>
  )
}
