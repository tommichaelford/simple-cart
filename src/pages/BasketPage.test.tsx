import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BasketPage from './BasketPage.tsx'
import {
  removeBasketItem,
  type Basket,
  updateBasketQuantity,
} from '../features/basket/basket.ts'

const BasketPageHarness = ({ initialBasket }: { initialBasket: Basket }) => {
  const [basket, setBasket] = useState(initialBasket)

  const handleUpdateQuantity = (productId: string, change: number) => {
    setBasket((currentBasket) =>
      updateBasketQuantity(currentBasket, productId, change)
    )
  }

  const handleRemoveItem = (productId: string) => {
    setBasket((currentBasket) => removeBasketItem(currentBasket, productId))
  }

  return (
    <MemoryRouter>
      <BasketPage
        basket={basket}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </MemoryRouter>
  )
}

test('basket page updates the total when basket quantities change', () => {
  render(
    <BasketPageHarness initialBasket={[{ productId: '001', quantity: 1 }]} />
  )

  expect(screen.getByTestId('basket-total').textContent).toContain('£1,400.99')
  expect(screen.getByTestId('decrease-quantity-001')).toHaveProperty(
    'disabled',
    true
  )

  fireEvent.click(screen.getByTestId('increase-quantity-001'))
  expect(screen.getByTestId('basket-total').textContent).toContain('£2,801.98')
  expect(screen.getByTestId('decrease-quantity-001')).toHaveProperty(
    'disabled',
    false
  )

  fireEvent.click(screen.getByTestId('decrease-quantity-001'))
  expect(screen.getByTestId('basket-total').textContent).toContain('£1,400.99')
  expect(screen.getByTestId('decrease-quantity-001')).toHaveProperty(
    'disabled',
    true
  )
})

test('basket page removes an item only from the remove button', () => {
  render(
    <BasketPageHarness initialBasket={[{ productId: '001', quantity: 1 }]} />
  )

  fireEvent.click(screen.getByTestId('decrease-quantity-001'))

  expect(screen.queryByText('Trek Emonda')).not.toBeNull()
  expect(screen.getByTestId('basket-total').textContent).toContain('£1,400.99')

  fireEvent.click(screen.getByTestId('remove-item-001'))

  expect(screen.queryByText(/Your basket is empty/i)).not.toBeNull()
})
