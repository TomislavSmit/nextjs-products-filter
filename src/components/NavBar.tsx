'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const menuItems = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Favorites',
        href: '/favorites',
    },
]

export default function NavBar() {
    const pathname = usePathname()

    return (
        <nav className='bg-grey-500 shadow-md p-4 border-b'>
            <div className='container mx-auto flex items-center'>
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'mr-4 rounded-md transition-colors',
                            pathname === item.href
                                ? 'border border-gray-500'
                                : ''
                        )}
                    >
                        <Button variant='ghost' className=''>
                            {item.label}
                        </Button>
                    </Link>
                ))}
            </div>
        </nav>
    )
}
