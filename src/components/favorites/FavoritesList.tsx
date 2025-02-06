'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import { IProduct } from '@/types'
import { useQueryState } from 'nuqs'
import { PER_PAGE } from '@/lib/config'
import Pagination from '../common/Pagination'
import { ProductListItem } from '../products/ProductListItem'

export default function FavoritesList() {
    const [favorites, setFavorites] = useLocalStorage<IProduct[]>(
        'favorites',
        []
    )
    const [page] = useQueryState('page', {
        defaultValue: '1',
        shallow: false,
    })

    if (favorites.length === 0) {
        return <h2>No favorite products yet</h2>
    }

    const toggleFavorite = (item: IProduct) => {
        if (favorites.some((fav) => fav.id === item.id)) {
            setFavorites(favorites.filter((fav) => fav.id !== item.id))
        } else {
            setFavorites([...favorites, item])
        }
    }

    const products = favorites.slice(
        (Number(page) - 1) * PER_PAGE,
        Number(page) * PER_PAGE
    )

    return (
        <div className='space-y-4'>
            <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
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

            <Pagination totalPages={Math.ceil(favorites.length / PER_PAGE)} />
        </div>
    )
}
