import Navbar from "@/components/navbar"

export default function UserLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <section>
         <Navbar />
         {children}
      </section>
   )
}