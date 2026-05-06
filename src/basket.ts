export type Product = {
  id: string
  name: string
  price: number
  description: string
}

export type BasketItem = {
  productId: string
  quantity: number
}

export type Basket = BasketItem[]

export const PRODUCTS: Product[] = [
  {
    id: '001',
    name: 'Trek Emonda',
    price: 1400.99,
    description: 'A road bike built for the mountains',
  },
  {
    id: '002',
    name: 'Trek Domane',
    price: 1300,
    description: 'A road bike built for unforgiving roads',
  },
  {
    id: '003',
    name: 'Trek Checkmate',
    price: 4999,
    description: 'A gravel bike built to race the toughest terrain',
  },
  {
    id: '004',
    name: 'Trek Madone',
    price: 6999,
    description: 'The fastest road bike on the market. Built to race.',
  },
  {
    id: '005',
    name: 'Trek Checkpoint',
    price: 3299.99,
    description: 'A gravel bike built for exploration and adventure.',
  },
]

export const getProductById = (productId: string): Product | undefined =>
  PRODUCTS.find((product) => product.id === productId)

export const BASKET_STORAGE_KEY = 'simple-basket-state'

export const buildInitialBasket = (savedBasket: unknown = []): Basket => {
  if (!Array.isArray(savedBasket)) {
    return []
  }

  return savedBasket.reduce<Basket>((basket, item) => {
    if (
      typeof item !== 'object' ||
      item === null ||
      !('productId' in item) ||
      !('quantity' in item)
    ) {
      return basket
    }

    const productId = item.productId
    const quantity = item.quantity

    if (typeof productId !== 'string' || typeof quantity !== 'number') {
      return basket
    }

    const productExists = PRODUCTS.some((product) => product.id === productId)

    if (!productExists || quantity <= 0) {
      return basket
    }

    const existingItem = basket.find(
      (basketItem) => basketItem.productId === productId
    )

    if (existingItem) {
      return basket.map((basketItem) =>
        basketItem.productId === productId
          ? {
              ...basketItem,
              quantity: basketItem.quantity + Math.floor(quantity),
            }
          : basketItem
      )
    }

    return [...basket, { productId, quantity: Math.floor(quantity) }]
  }, [])
}

export const getBasketQuantity = (
  basket: Basket,
  productId: string
): number => {
  return basket.find((item) => item.productId === productId)?.quantity ?? 0
}

export const updateBasketQuantity = (
  basket: Basket,
  productId: string,
  change: number
): Basket => {
  const currentQuantity = getBasketQuantity(basket, productId)
  const nextQuantity =
    currentQuantity === 0
      ? Math.max(0, currentQuantity + change)
      : Math.max(1, currentQuantity + change)

  const existingItem = basket.find((item) => item.productId === productId)

  if (!existingItem) {
    if (nextQuantity === 0) {
      return basket
    }

    return [...basket, { productId, quantity: nextQuantity }]
  }

  return basket.map((item) =>
    item.productId === productId ? { ...item, quantity: nextQuantity } : item
  )
}

export const removeBasketItem = (basket: Basket, productId: string): Basket => {
  return basket.filter((item) => item.productId !== productId)
}

export const calculateBasketTotal = (basket: Basket): number => {
  return basket.reduce((total, item) => {
    const product = getProductById(item.productId)

    if (!product) {
      return total
    }

    return total + product.price * item.quantity
  }, 0)
}

export const getBasketItemCount = (basket: Basket): number => {
  return basket.reduce((count, item) => count + item.quantity, 0)
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}
