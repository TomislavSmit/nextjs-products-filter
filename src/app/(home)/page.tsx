import { Suspense } from 'react'
import ProductListPage from '@/components/products/ProductListPage'
import { fetchData } from '@/lib/api'

interface SearchParams {
    searchParams: {
        search?: string
        page?: number
        category?: string
        sortOrder?: 'asc' | 'desc'
    }
}

export const metadata = {
    title: 'Product Listing - Best Deals',
    description: 'Find the best products with advanced search and filtering.',
    keywords: 'products, search, filters, best deals',
    openGraph: {
        title: 'Product Listing - Best Deals',
        description:
            'Find the best products with advanced search and filtering.',
        url: 'https://yourdomain.com',
        siteName: 'Your Site Name',
        images: [
            {
                url: 'https://yourdomain.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Product Listings',
            },
        ],
        type: 'website',
    },
}

export default async function Home({ searchParams }: SearchParams) {
    const search = searchParams?.search
    const page = searchParams?.page
    const category = searchParams?.category
    const sortOrder = searchParams?.sortOrder

    const { products, categories, total } = await fetchData(
        search,
        page,
        category,
        sortOrder
    )

    return (
        <div className='container mx-auto p-4'>
            <header className='mb-4'>
                <h1 className='text-2xl font-bold'>Product Listings</h1>
            </header>

            <Suspense fallback={<p>Loading...</p>}>
                <ProductListPage
                    products={products}
                    categories={categories}
                    total={total}
                />
            </Suspense>
        </div>
    )
}
