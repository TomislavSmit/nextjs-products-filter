'use client'

import { useQueryState } from 'nuqs'
import { CalendarArrowDown, CalendarArrowUp, X } from 'lucide-react'
import { ICategory } from '@/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'

interface ProductFiltersProps {
    categories: ICategory[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
    const [search, setSearch] = useQueryState('search', {
        defaultValue: '',
        shallow: false,
    })
    const [localSearch, setLocalSearch] = useState(search)
    const [localPage, setLocalPage] = useState(null)

    const [category, setCategory] = useQueryState('category', {
        defaultValue: '',
        shallow: false,
    })
    const [sortOrder, setSortOrder] = useQueryState('sortOrder', {
        defaultValue: '',
        shallow: false,
    })
    const [, setPage] = useQueryState('page', {
        defaultValue: '1',
        shallow: false,
    })

    const debouncedValue = useDebounce(localSearch)
    const debouncedValuePage = useDebounce(localPage)

    useEffect(() => {
        setSearch(debouncedValue)
        setPage(debouncedValuePage)
    }, [setSearch, debouncedValue, setPage, debouncedValuePage])

    return (
        <section className='flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 w-full'>
            <div className='flex flex-1 space-x-2'>
                <div className='flex-1'>
                    <Input
                        type='text'
                        placeholder='Search...'
                        value={localSearch || ''}
                        onChange={(e) => {
                            setLocalSearch(e.target.value)
                            setLocalPage(null)
                        }}
                        data-testid='search-input'
                    />
                </div>
                <Button
                    name='clear-search'
                    aria-label='Clear search'
                    variant='ghost'
                    onClick={() => {
                        setLocalSearch('')
                        setSearch('')
                        setPage(null)
                        setLocalPage(null)
                    }}
                    title='Clear search'
                >
                    <X />
                </Button>
            </div>
            <div className='flex  md:flex-row  md:min-w-64 space-x-2 '>
                <div
                    className={
                        category !== ''
                            ? 'flex flex-1 space-x-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80'
                            : 'flex flex-1 space-x-2'
                    }
                >
                    <Select
                        onValueChange={(value) => {
                            setCategory(value)
                            setLocalPage(null)
                        }}
                        value={category}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder='Choose a category' />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.slug}
                                    value={category.slug}
                                >
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    name='clear-category'
                    aria-label='Clear category'
                    variant='ghost'
                    onClick={() => {
                        setCategory('')
                        setLocalPage(null)
                    }}
                    title='Clear category'
                >
                    <X />
                </Button>
            </div>
            <div className='flex  justify-end space-x-2'>
                <Button
                    name='sort'
                    aria-label='Sort by date'
                    variant={sortOrder !== '' ? 'secondary' : 'outline'}
                    onClick={() => {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                        setLocalPage(null)
                    }}
                >
                    Sort by date
                    {sortOrder === 'asc' ? (
                        <CalendarArrowDown />
                    ) : (
                        <CalendarArrowUp />
                    )}
                </Button>
                <Button
                    name='clear-category'
                    aria-label='Clear category'
                    variant='ghost'
                    onClick={() => {
                        setSortOrder('')
                        setLocalPage(null)
                    }}
                    title='Clear sort'
                >
                    <X />
                </Button>
            </div>
        </section>
    )
}
