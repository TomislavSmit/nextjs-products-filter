'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Heart } from 'lucide-react'
import { IProduct } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const DynamicHeart = dynamic(() => import('../ui/hearticon'), {
    loading: () => <Heart />,
    ssr: false,
})

interface ProductProps {
    product: IProduct
    isFavorite: boolean | null
    toggleFavorite: (product: IProduct) => void
}

export function ProductListItem({
    product,
    isFavorite,
    toggleFavorite,
}: ProductProps) {
    return (
        <article>
            <Card
                key={product.id}
                className='shadow-lg rounded-md hover:bg-slate-900 transition duration-300 p-6'
            >
                <CardContent>
                    <div className='rounded-2xl shadow-md hover:shadow-lg transition duration-300'>
                        <div className='flex justify-center'>
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={200}
                                height={200}
                                priority
                            />
                        </div>
                        <div>
                            <h2 className='text-lg mb-2 line-clamp-2 min-h-16'>
                                <strong>{product.title}</strong>
                                {product.brand ? ` - ${product.brand}` : ''}
                            </h2>
                            <p className='text-sm mb-2 line-clamp-2'>
                                {product.description}
                            </p>
                            <p className='text-sm py-2'>
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className='bg-gray-600 rounded-md px-2 py-1 mr-2'
                                    >
                                        {tag}{' '}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className='flex justify-between my-4'>
                            <p
                                className={cn(
                                    'text-sm',
                                    product.availabilityStatus === 'In Stock'
                                        ? 'text-green-300'
                                        : 'text-red-300'
                                )}
                            >
                                {product.availabilityStatus}
                            </p>
                            <p className='text-sm text-gray-400'>
                                sku: {product.sku}
                            </p>
                        </div>

                        <div className='flex flex-1 justify-between products-center mt-4 align-items-end'>
                            <span className='text-lg font-bold '>
                                ${product.price.toFixed(2)}
                            </span>

                            <Button
                                name='favorite'
                                aria-label='Favorite'
                                variant='ghost'
                                onClick={() => toggleFavorite(product)}
                            >
                                {isFavorite ? (
                                    <DynamicHeart fill='red' />
                                ) : (
                                    <DynamicHeart />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </article>
    )
}
