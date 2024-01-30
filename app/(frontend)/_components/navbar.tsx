import { NavbarRoutes } from "@/components/navbar-routes"


export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-sky-500 shadow-sm">
      <NavbarRoutes />
    </div>
  )
}