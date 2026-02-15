"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconCalendarEvent,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPhoto,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconBriefcase,
} from "@tabler/icons-react"

import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "admin",
    email: "admin@johntours.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tổng quan",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Việc làm",
      url: "#",
      icon: IconBriefcase,
      items: [
        {
          title: "Công việc",
          url: "/admin/jobs",
        },
        {
          title: "Danh mục công việc",
          url: "/admin/categories",
        },
      ],
    },
    {
      title: "Ứng viên",
      url: "/admin/candidates",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const [user, setUser] = React.useState(data.user);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.username || "Admin",
          email: `${parsedUser.username || "admin"}@johntours.com`,
          avatar: "/avatars/shadcn.jpg",
        });
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="data-[slot=sidebar-menu-button]:!p-0 hover:bg-transparent">
              <a href="#" className="flex items-center justify-start pl-2">
                <img
                  src="/johns-tours-logo.png"
                  alt="John's Tours Admin"
                  className="h-9 w-auto object-contain max-w-[160px]"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
