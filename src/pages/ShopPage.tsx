import ProductCard from '../components/ProductCard.tsx'
import BasketSummaryCard from '../components/BasketSummary.tsx'
import {
  getBasketQuantity,
  PRODUCTS,
  type Basket,
} from '../features/basket/basket.ts'
import './ShopPage.css'

interface ShopPageProps {
  basket: Basket
  onUpdateQuantity: (productId: string, change: number) => void
}

const ShopPage = ({ basket, onUpdateQuantity }: ShopPageProps) => {
  return (
    <main className="page-shell" id="main-content">
      <section className="page-header">
        <div>
          <h1 className="page-title">Tom's Bike Shop</h1>
          <p className="page-copy">
            Get your dream bike (as long as it is one of these 5)
          </p>
        </div>

        <BasketSummaryCard basket={basket} />
      </section>

      <section className="panel">
        <div className="panel__content">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Products</p>
              <h2 className="section-title">Available items</h2>
            </div>
            <p className="section-eyebrow">{PRODUCTS.length} products</p>
          </div>

          <ul className="product-grid" aria-label="Products">
            {PRODUCTS.map((product) => {
              const quantity = getBasketQuantity(basket, product.id)

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onAddToBasket={() => onUpdateQuantity(product.id, 1)}
                />
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default ShopPage
