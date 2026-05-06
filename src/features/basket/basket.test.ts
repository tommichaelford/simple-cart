import {
  buildInitialBasket,
  calculateBasketTotal,
  removeBasketItem,
  updateBasketQuantity,
} from './basket.ts'

test('basket quantity updates do not drop existing items below one', () => {
  const initialBasket = buildInitialBasket([
    { productId: '001', quantity: 2 },
    { productId: '002', quantity: 1 },
  ])
  const nextBasket = updateBasketQuantity(initialBasket, '001', -5)

  expect(nextBasket).not.toBe(initialBasket)
  expect(initialBasket.find((item) => item.productId === '001')?.quantity).toBe(
    2
  )
  expect(nextBasket.find((item) => item.productId === '001')?.quantity).toBe(1)
  expect(nextBasket.find((item) => item.productId === '002')?.quantity).toBe(1)
  expect(calculateBasketTotal(nextBasket)).toBe(2700.99)
})

test('basket items can be removed explicitly', () => {
  const initialBasket = buildInitialBasket([
    { productId: '001', quantity: 2 },
    { productId: '002', quantity: 1 },
  ])
  const nextBasket = removeBasketItem(initialBasket, '001')

  expect(nextBasket).not.toBe(initialBasket)
  expect(nextBasket.find((item) => item.productId === '001')).toBeUndefined()
  expect(nextBasket.find((item) => item.productId === '002')?.quantity).toBe(1)
  expect(calculateBasketTotal(nextBasket)).toBe(1300)
})
