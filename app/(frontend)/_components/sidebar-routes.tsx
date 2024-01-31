"use client"
import { BarChart, Compass, Layout, List } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
]

const clientRoutes = [
  {
    icon: List,
    label: "Jobs",
    href: "/client/jobs",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/client/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname()

  const isClientPage = pathname?.includes("/client");
  const routes = isClientPage ? clientRoutes : guestRoutes;


  return(
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem 
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}/>
      ))}
    </div>
  )
}