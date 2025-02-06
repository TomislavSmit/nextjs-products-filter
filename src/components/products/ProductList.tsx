'use client'

import { IProduct } from '@/types'
import { PER_PAGE } from '@/lib/config'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import Pagination from '@/components/common/Pagination'
import { ProductListItem } from '@/components/products/ProductListItem'

interface ProductListProps {
    products: IProduct[]
    total: number
}

export default function ProductList({ products, total }: ProductListProps) {
    const [favorites, setFavorites] = useLocalStorage<IProduct[]>(
        'favorites',
        []
    )

    if (products.length === 0) {
        return <h2>No products yet</h2>
    }

    const toggleFavorite = (item: IProduct) => {
        if (favorites.some((fav) => fav.id === item.id)) {
            setFavorites(favorites.filter((fav) => fav.id !== item.id))
        } else {
            setFavorites([...favorites, item])
        }
    }

    return (
        <>
            <section className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4'>
                {products.map((product) => (
                    <ProductListItem
                        key={product.id}
                        product={product}
                        isFavorite={favorites.some(
                            (fav) => fav.id === product.id
                        )}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </section>

            <Pagination totalPages={Math.ceil(total / PER_PAGE)} />
        </>
    )
}
