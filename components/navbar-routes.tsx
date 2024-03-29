"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname} from "next/navigation"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { SearchInput } from "./search-input"

export const NavbarRoutes = () => {
  const pathname = usePathname()

  const isClientPage = pathname?.startsWith("/client");
  const isJobPage = pathname?.includes("/job");
  const isSearchPage = pathname === "/search";


  return(
    <>
    <div className="flex gap-x-4 ml-auto">
    {isSearchPage ? (
      <div className="hidden md:block">
        <SearchInput />
      </div>
    ) : (
      <div className="">
        <Link href="/home">
          <Button size="sm" className="text-xl font-bold" variant="ghost">
            Home
          </Button>
        </Link>
      </div>
    )}
      {isClientPage || isJobPage ? (
        <Link href="/search">
        <Button size="sm" variant="ghost">
          <LogOut className="h-4 w-4 mr-2"/>
          Exit
        </Button>
        </Link>
      ) : (
        <Link href="/client/jobs">
          <Button size="sm" className="text-xl font-bold" variant="ghost">Find Talent</Button>
        </Link>
      )}
      <UserButton
        afterSignOutUrl="/" />
    </div>
    </>
  )
}