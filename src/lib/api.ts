import { cache } from 'react'
import { ICategory, IProduct, IProductResponse } from '@/types'
import { PER_PAGE } from '@/lib/config'
import axiosInstance from './axiosInstance'

interface FetchDataResponse {
    products: IProduct[]
    total: number
    categories: ICategory[]
}

async function fetchAllCategories(): Promise<ICategory[]> {
    const response = await axiosInstance.get<ICategory[]>('products/categories')

    return response.data
}

export const fetchData = cache(async function (
    search?: string,
    page: number = 1,
    category?: string,
    sortOrder?: 'asc' | 'desc'
): Promise<FetchDataResponse> {
    console.log('** *FETCHING DATA* **')
    // fetch categories for filter
    const categories = await fetchAllCategories()

    // Fetch all products to filter on client side
    const responseAllProducts = await axiosInstance.get<IProductResponse>(
        'products?limit=0'
    )
    const dataAllProducts = responseAllProducts.data
    let { products: productsAll } = dataAllProducts

    // Filter by category
    if (category) {
        productsAll = productsAll.filter((item) => item.category === category)
    }

    // Filter by search term
    if (search) {
        productsAll = productsAll.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        )
    }

    if (sortOrder) {
        productsAll = productsAll.sort((a, b) => {
            return sortOrder === 'asc'
                ? new Date(a.meta.createdAt).getTime() -
                      new Date(b.meta.createdAt).getTime()
                : new Date(b.meta.createdAt).getTime() -
                      new Date(a.meta.createdAt).getTime()
        })
    }

    // Pagination
    const paginatedProducts = productsAll.slice(
        (page - 1) * PER_PAGE,
        page * PER_PAGE
    )

    return {
        products: paginatedProducts,
        categories,
        total: productsAll.length,
    }
})

/**
 * @deprecated
 *
 * TODO: Remove this afterwords
 *
 * IMPORTANT NOTE: This was first implementation.
 * Not used in app because API does not provide way for combining search and filters
 *
 * It is left here just for reference to show how it could be done if using https://dummyjson.com API
 *
 * @description
 * In theory, we would send all the filters to the API and let it handle the filtering, sorting, and pagination
 * Implementation below explained:
 *     - get query params from url
 *     - fetch categories for filter dropdown
 *     - if category is selected, fetch only products for that category
 *     - if no categoty selected, send search term to server
 *     - if no search term, fetch all products
 *     - paginate products
 *     - sort products on client since API does not support sorting by date
 */

// export async function fetchData(
//     search?: string,
//     page: number = 1,
//     category?: string,
//     sortOrder?: 'asc' | 'desc'
// ): Promise<FetchDataResponse> {
//     // fetch categories for filter
//     const categoriesReponse = await axios.get<ICategoryReponse>(
//         'https://dummyjson.com/products/categories'
//     )
//     const categories = categoriesReponse.data

//     let url = `https://dummyjson.com/products`
//     console.log('category on server', category)

//     if (category) {
//         // if category is selected, fetch only products for that category
//         url += `/category/${category}`
//         url += `?limit=${PER_PAGE}`
//     } else if (search) {
//         // if no categoty selected, send search term to server
//         url += `/search?q=${search}`
//         url += `&limit=${PER_PAGE}`
//     } else {
//         url += `?limit=${PER_PAGE}`
//     }

//     console.log('page', page)
//     if (page > 1) {
//         url += `&skip=${(page - 1) * PER_PAGE}`
//     } else {
//         url += `&skip=0`
//     }

//     console.log('url', url)
//     const response = await axios.get<IProductResponse>(url)

//     const data = response.data
//     let { products } = data

//     // if category is selected, search products locally for that category
//     if (search && category) {
//         products = products.filter((item) =>
//             item.title.toLowerCase().includes(search.toLowerCase())
//         )

//         // const totalResponse = await axios.get<IProductResponse>(
//         //     `https://dummyjson.com/products/search?q=${search}&limit=${PER_PAGE}`
//         // )
//         // console.log('totalResponse', totalResponse.data.total)
//         // data = { ...data, total: totalResponse.data.total }
//     }
//     // console.log('products', products)
//     // console.log('data', data)

//     console.log('sortOrder', sortOrder)
//     if (sortOrder) {
//         products = [...products].sort((a, b) => {
//             return sortOrder === 'asc'
//                 ? new Date(a.meta.createdAt).getTime() -
//                       new Date(b.meta.createdAt).getTime()
//                 : new Date(b.meta.createdAt).getTime() -
//                       new Date(a.meta.createdAt).getTime()
//         })
//     }

//     return {
//         products,
//         categories,
//         total: data.total + PER_PAGE,
//         limit: data.limit,
//     }
// }
