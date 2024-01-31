import { auth } from "./auth";

export default auth((req:any) => {
  const isLoggedIn = !!req.auth;
  console.log("is logged in", isLoggedIn);
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}