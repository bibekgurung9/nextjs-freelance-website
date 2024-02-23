import { isClient } from "@/lib/client";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ClientLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();

  if(!isClient(userId)){
    return redirect("/");
  }

  return <>{children}</>
}