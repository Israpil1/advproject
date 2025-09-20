'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex space-x-6">
        <Link 
          href="/" 
          className={pathname === '/' ? 'font-bold underline' : ''}
        >
          Главная
        </Link>
        <Link 
          href="/todos" 
          className={pathname === '/todos' ? 'font-bold underline' : ''}
        >
          Todo List
        </Link>
        <Link 
          href="/calendar" 
          className={pathname === '/calendar' ? 'font-bold underline' : ''}
        >
          Календарь
        </Link>
        <Link 
          href="/about" 
          className={pathname === '/about' ? 'font-bold underline' : ''}
        >
          О нас
        </Link>
      </div>
    </nav>
  )
}