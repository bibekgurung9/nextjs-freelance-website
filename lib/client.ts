export const isClient = (userId?: string | null) => {
   return userId === process.env.NEXT_PUBLIC_CLIENT_ID;
}