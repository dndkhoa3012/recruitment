"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar"

export function SiteHeader() {
  const pathname = usePathname()

  const getTitle = (path) => {
    if (path === "/admin/booking") return "Đặt bàn"
    if (path === "/admin/menu") return "Thực đơn"
    if (path === "/admin") return "Tổng quan"
    return "Tổng quan"
  }

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{getTitle(pathname)}</h1>
      </div>
    </header>
  );
}
