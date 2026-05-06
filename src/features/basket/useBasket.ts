import { useEffect, useRef, useState } from 'react'
import {
  BASKET_STORAGE_KEY,
  buildInitialBasket,
  calculateBasketTotal,
  getBasketItemCount,
  removeBasketItem,
  updateBasketQuantity,
  type Basket,
} from './basket.ts'

const readStoredBasket = (): Basket => {
  if (typeof window === 'undefined') {
    return buildInitialBasket()
  }

  const savedBasket = window.localStorage.getItem(BASKET_STORAGE_KEY)

  if (!savedBasket) {
    return buildInitialBasket()
  }

  try {
    return buildInitialBasket(JSON.parse(savedBasket))
  } catch {
    return buildInitialBasket()
  }
}

export const useBasket = () => {
  const [basket, setBasket] = useState<Basket>(readStoredBasket)
  const [basketAnnouncement, setBasketAnnouncement] = useState<string | null>(
    null
  )
  const previousItemCountRef = useRef(0)

  useEffect(() => {
    window.localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket))
  }, [basket])

  useEffect(() => {
    const itemCount = getBasketItemCount(basket)

    if (itemCount !== previousItemCountRef.current) {
      setBasketAnnouncement(
        `Basket updated. ${itemCount} item${itemCount === 1 ? '' : 's'} in basket.`
      )
      previousItemCountRef.current = itemCount
    }
  }, [basket])

  const updateQuantity = (productId: string, change: number) => {
    setBasket((currentBasket) =>
      updateBasketQuantity(currentBasket, productId, change)
    )
  }

  const addToBasket = (productId: string) => {
    updateQuantity(productId, 1)
  }

  const removeItem = (productId: string) => {
    setBasket((currentBasket) => removeBasketItem(currentBasket, productId))
  }

  return {
    addToBasket,
    basket,
    basketAnnouncement,
    itemCount: getBasketItemCount(basket),
    removeItem,
    total: calculateBasketTotal(basket),
    updateQuantity,
  }
}
