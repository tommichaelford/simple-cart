import { Route, Routes, useParams } from 'react-router-dom'
import { getBasketQuantity, type Basket } from './basket.ts'
import BasketPage from './pages/BasketPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import ShopPage from './pages/ShopPage.tsx'
import { useBasket } from './useBasket.ts'

interface ProductRouteProps {
  basket: Basket
  onAddToBasket: (productId: string) => void
}

const ProductRoute = ({ basket, onAddToBasket }: ProductRouteProps) => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <NotFoundPage />
  }

  return (
    <ProductPage
      basket={basket}
      quantity={getBasketQuantity(basket, id)}
      onAddToBasket={() => onAddToBasket(id)}
    />
  )
}

function App() {
  const {
    addToBasket,
    basket,
    basketAnnouncement,
    removeItem,
    updateQuantity,
  } = useBasket()

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {basketAnnouncement}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <ShopPage basket={basket} onUpdateQuantity={updateQuantity} />
          }
        />
        <Route
          path="/basket"
          element={
            <BasketPage
              basket={basket}
              onRemoveItem={removeItem}
              onUpdateQuantity={updateQuantity}
            />
          }
        />
        <Route
          path="/item/:id"
          element={<ProductRoute basket={basket} onAddToBasket={addToBasket} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
