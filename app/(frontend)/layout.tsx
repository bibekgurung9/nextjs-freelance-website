import Footer from "@/components/footer";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return(
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50 bg-sky-500">
        <Navbar /> 
      </div>
      <main className="md:p-16 pt-[80px] h-full mt-6">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout;