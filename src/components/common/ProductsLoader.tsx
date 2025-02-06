export default function ProductsLoader() {
    return (
        <div className='container mx-auto'>
            <div className='animate-pulse space-y-4 m-10 border rounded-lg shadow-sm'>
                <div className='w-full h-12 bg-gray-600 rounded-lg'></div>
                <div className='w-full h-12 bg-gray-600 rounded-lg'></div>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index}>
                            <div className='animate-pulse space-y-4 border rounded-lg shadow-sm'>
                                <div className='w-full h-40 bg-gray-600 rounded-lg'></div>
                                <div className='h-4 bg-gray-600 rounded w-full'></div>
                                <div className='h-4 bg-gray-600 rounded w-full'></div>
                                <div className='h-4 bg-gray-600 rounded w-1/2'></div>
                                <div className='h-4 bg-gray-600 rounded w-1/2'></div>
                                <div className='h-10 bg-gray-600 rounded'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
