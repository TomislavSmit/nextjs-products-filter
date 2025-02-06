export interface IProduct {
    readonly id: number
    title: string
    description: string
    category: string
    price: number
    tags: string[]
    brand: string
    sku: string
    availabilityStatus: string
    meta: {
        createdAt: string
        updatedAt: string
        barcode: string
        qrCode: string
    }
    thumbnail: string
}

export interface IProductResponse {
    products: IProduct[]
    total: number
    skip: number
    limit: number
}

export interface ICategory {
    slug: string
    name: string
    url: string
}
