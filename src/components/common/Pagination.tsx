'use client'

import { useQueryState } from 'nuqs'
import {
    Pagination as PaginationBase,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
    totalPages: number
}

function getPaginationPages(currentPage: number, totalPages: number) {
    const pages: (number | '...')[] = []

    const addPage = (page: number | '...') => {
        if (!pages.includes(page)) {
            pages.push(page)
        }
    }

    // Always show the first page
    addPage(1)

    // Pages before and after the current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
            addPage(i)
        }
    }

    // Always show the last page
    addPage(totalPages)

    // Add ellipses when skipping pages
    if (pages[1] !== 2) {
        pages.splice(1, 0, '...')
    }
    if (pages[pages.length - 2] !== totalPages - 1) {
        pages.splice(pages.length - 1, 0, '...')
    }

    return pages
}

export default function Pagination({ totalPages }: PaginationProps) {
    const [page, setPage] = useQueryState('page', {
        defaultValue: '1',
        shallow: false,
    })

    if (totalPages <= 1) {
        return null
    }

    const currentPage = Number(page)

    const goToPage = (pageNumber: number) => {
        setPage(pageNumber.toString())
    }

    const pages = getPaginationPages(currentPage, totalPages)

    return (
        <section>
            <PaginationBase>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href='#'
                            onClick={() =>
                                currentPage > 1 && goToPage(currentPage - 1)
                            }
                        />
                    </PaginationItem>
                    {pages.map((page, index) => (
                        <PaginationItem key={index}>
                            {page === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    onClick={() => goToPage(page)}
                                    isActive={page === currentPage}
                                    className='cursor-pointer'
                                >
                                    {page}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            href='#'
                            onClick={() =>
                                currentPage < totalPages &&
                                goToPage(currentPage + 1)
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </PaginationBase>
        </section>
    )
}
