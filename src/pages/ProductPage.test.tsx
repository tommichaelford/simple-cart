import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  getBasketQuantity,
  type Basket,
  updateBasketQuantity,
} from '../basket.ts'
import ProductPage from './ProductPage.tsx'

const ProductPageTestWrapper = ({
  initialBasket,
  route,
}: {
  initialBasket: Basket
  route: string
}) => {
  const [basket, setBasket] = useState(initialBasket)
  const productId = route.split('/').at(-1) ?? ''
  const quantity = getBasketQuantity(basket, productId)

  const handleAddToBasket = () => {
    setBasket((currentBasket) =>
      updateBasketQuantity(currentBasket, productId, 1)
    )
  }

  return (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route
          path="/item/:id"
          element={
            <ProductPage
              basket={basket}
              quantity={quantity}
              onAddToBasket={handleAddToBasket}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

test('product page shows the selected product and updates the basket', () => {
  render(<ProductPageTestWrapper initialBasket={[]} route="/item/001" />)

  expect(screen.queryByTestId('product-title')).not.toBeNull()
  expect(
    screen.queryByText('A road bike built for the mountains')
  ).not.toBeNull()
  expect(screen.queryByText('£1,400.99')).not.toBeNull()

  fireEvent.click(screen.getByTestId('add-to-basket'))

  expect(screen.queryByText('1 in basket')).not.toBeNull()
  expect(screen.getByTestId('basket-summary-link').textContent).toContain(
    '£1,400.99'
  )
})

test('product page shows the not found page for an unknown product', () => {
  render(<ProductPageTestWrapper initialBasket={[]} route="/item/999" />)

  expect(screen.queryByText('404 Error')).not.toBeNull()
  expect(screen.queryByTestId('not-found-title')).not.toBeNull()
  expect(screen.queryByTestId('return-to-shop')).not.toBeNull()
})
