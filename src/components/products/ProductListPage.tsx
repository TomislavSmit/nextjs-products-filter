import { ICategory, IProduct } from '@/types'
import ProductFilters from './ProductFilters'
import ProductList from './ProductList'

interface ProductListProps {
    products: IProduct[]
    total: number
    categories: ICategory[]
}

export default function ProductListPage({
    products,
    total,
    categories,
}: ProductListProps) {
    return (
        <div className='space-y-4'>
            <ProductFilters categories={categories} />
            <ProductList products={products} total={total} />
        </div>
    )
}
