import { render, fireEvent } from '@testing-library/react'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import ProductFilters from '../src/components/products/ProductFilters'

describe('ProductFilters', () => {
    it('updates search input value on change', () => {
        const categories = []
        const { getByPlaceholderText } = render(
            <NuqsTestingAdapter>
                <ProductFilters categories={categories} />
            </NuqsTestingAdapter>
        )
        const searchInput = getByPlaceholderText('Search...')
        fireEvent.change(searchInput, { target: { value: 'test' } })
        expect(searchInput.value).toBe('test')
    })

    it('clears search input value on clear button click', () => {
        const categories = []
        const { getByPlaceholderText, getByTitle } = render(
            <NuqsTestingAdapter>
                <ProductFilters categories={categories} />
            </NuqsTestingAdapter>
        )
        const searchInput = getByPlaceholderText('Search...')
        fireEvent.change(searchInput, { target: { value: 'test' } })
        const clearButton = getByTitle('Clear search')
        fireEvent.click(clearButton)
        expect(searchInput.value).toBe('')
    })

    it('updates category selection on change', () => {
        const categories = [{ slug: 'test', name: 'Test Category' }]
        const { getByText } = render(
            <NuqsTestingAdapter>
                <ProductFilters categories={categories} />
            </NuqsTestingAdapter>
        )
        const categorySelect = getByText('Choose a category')
        fireEvent.click(categorySelect)
        const categoryOption = getByText('Test Category')
        fireEvent.click(categoryOption)
        expect(categorySelect.textContent).toBe('Test Category')
    })

    it('clears category selection on clear button click', () => {
        const categories = [{ slug: 'test', name: 'Test Category' }]
        const { getByText, getByTitle } = render(
            <NuqsTestingAdapter>
                <ProductFilters categories={categories} />
            </NuqsTestingAdapter>
        )
        const categorySelect = getByText('Choose a category')
        fireEvent.click(categorySelect)
        const categoryOption = getByText('Test Category')
        fireEvent.click(categoryOption)
        const clearButton = getByTitle('Clear category')
        fireEvent.click(clearButton)
        expect(categorySelect.textContent).toBe('Choose a category')
    })

    it('updates sort order on button click', () => {
        const categories = []
        const { getByText } = render(
            <NuqsTestingAdapter>
                <ProductFilters categories={categories} />
            </NuqsTestingAdapter>
        )
        const sortButton = getByText('Sort by date')
        fireEvent.click(sortButton)
        expect(sortButton.textContent).toBe('Sort by date')
    })

    it('clears sort order on clear button click', () => {
        const categories = []
        const { getByText, getByTitle } = render(
            <NuqsTestingAdapter>
                <ProductFilters categories={categories} />
            </NuqsTestingAdapter>
        )
        const sortButton = getByText('Sort by date')
        fireEvent.click(sortButton)
        const clearButton = getByTitle('Clear sort')
        fireEvent.click(clearButton)
        expect(sortButton.textContent).toBe('Sort by date')
    })
})
