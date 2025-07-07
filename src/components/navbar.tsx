import Link from 'next/link'

export default function Navbar() {
   const NAVITEMS = [
      { href: '/', label: 'Home' },
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/set-username', label: 'Username' }
   ]

   return (
      <nav className="w-full flex items-center justify-between py-4 px-8 border-b border-gray-200 dark:border-gray-800">
         <ul className="flex space-x-6">
            {NAVITEMS.map((item) => (
               <li key={item.href}>
                  <Link href={item.href} className="text-base font-medium hover:underline">
                     {item.label}
                  </Link>
               </li>
            ))}
         </ul>
      </nav>
   )
}

// This component can be imported and used in the layout or any page to display the navbar