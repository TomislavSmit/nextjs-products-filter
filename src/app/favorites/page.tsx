import FavoritesPage from '@/components/favorites/FavoritesPage'

export const metadata = {
    title: 'Favorite Products',
    description: 'Preview all your favorite products.',
    keywords: 'products, favorites',
    openGraph: {
        title: 'Favorite Products',
        description:
            'Find the best products with advanced search and filtering.',
        url: 'https://yourdomain.com',
        siteName: 'Your Site Name',
        images: [
            {
                url: 'https://yourdomain.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Favorite Products',
            },
        ],
        type: 'website',
    },
}

export default async function Favorites() {
    return (
        <div className='container mx-auto p-4'>
            <header className='mb-4'>
                <h1 className='text-2xl font-bold'>Favorite Products</h1>
            </header>

            <FavoritesPage />
        </div>
    )
}
