import * as React from "react";
import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useNavigation } from "@/hooks/useNavigation";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { adminNavItems } = useNavigation();
  const navData = {
    user: {
      name: "Admin",
      email: "admin@example.com",
      avatar: "/avatars/admin.jpg",
    },
    navMain: [...adminNavItems],
    // navSecondary: [
    //   {
    //     title: adminNavItems.settings.name,
    //     url: adminNavItems.settings.navUrl,
    //     icon: SettingsIcon,
    //   },
    // ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        {/* <NavDocuments items={navData.documents} /> */}
        {/* <NavSecondary items={navData.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
