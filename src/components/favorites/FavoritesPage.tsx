'use client'

import dynamic from 'next/dynamic'

const DynamicFavoriteList = dynamic(() => import('./FavoritesList'), {
    ssr: false,
})

export default function FavoritesPage() {
    return <DynamicFavoriteList />
}
