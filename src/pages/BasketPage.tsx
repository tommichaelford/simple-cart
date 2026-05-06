import { Link } from 'react-router-dom'
import BasketSummaryCard from '../components/BasketSummary.tsx'
import {
  calculateBasketTotal,
  formatCurrency,
  getBasketItemCount,
  getProductById,
  type Basket,
} from '../features/basket/basket.ts'
import './BasketPage.css'

type BasketPageProps = {
  basket: Basket
  onRemoveItem: (productId: string) => void
  onUpdateQuantity: (productId: string, change: number) => void
}

const BasketPage = ({
  basket,
  onRemoveItem,
  onUpdateQuantity,
}: BasketPageProps) => {
  const total = calculateBasketTotal(basket)
  const basketItemCount = getBasketItemCount(basket)
  const hasBasketItems = basketItemCount > 0

  return (
    <main className="page-shell" id="main-content">
      <section className="page-header">
        <div>
          <div className="page-actions">
            <Link to="/" className="back-link">
              Back to shop
            </Link>
          </div>
          <h1 className="page-title">Your Basket</h1>
          <p className="page-copy">
            Review your selected items and adjust quantities before checkout.
          </p>
        </div>

        <BasketSummaryCard basket={basket} />
      </section>

      <section className="panel">
        <div className="panel__content">
          <div className="section-header">
            <div>
              <p className="section-eyebrow">Basket View</p>
              <h2 className="section-title">Live basket summary</h2>
            </div>
            <p className="section-eyebrow">
              {basketItemCount} item{basketItemCount === 1 ? '' : 's'}
            </p>
          </div>

          {hasBasketItems ? (
            <>
              <ul className="basket-list" aria-label="Basket items">
                {basket.map((item) => {
                  const product = getProductById(item.productId)

                  if (!product) {
                    return null
                  }

                  const subtotal = item.quantity * product.price

                  return (
                    <li className="basket-item" key={product.id}>
                      <div>
                        <div className="basket-item__title">
                          <Link
                            className="basket-item__link"
                            to={`/item/${product.id}`}
                          >
                            {product.name}
                          </Link>
                          <p className="section-eyebrow">
                            Product ID: {product.id}
                          </p>
                        </div>
                        <p className="section-eyebrow">
                          {formatCurrency(product.price)} x {item.quantity}
                        </p>
                      </div>

                      <div className="basket-item__meta">
                        <strong className="basket-item__subtotal">
                          {formatCurrency(subtotal)}
                        </strong>
                        <div
                          className="quantity-controls"
                          aria-label={`${product.name} basket quantity controls`}
                        >
                          <button
                            type="button"
                            className="quantity-controls__button"
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${product.name}`}
                            data-testid={`decrease-quantity-${product.id}`}
                          >
                            <span aria-hidden="true">-</span>
                          </button>
                          <span
                            className="quantity-controls__value"
                            aria-live="polite"
                            aria-atomic="true"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="quantity-controls__button"
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            data-testid={`increase-quantity-${product.id}`}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="basket-item__remove button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.name} from basket`}
                          data-testid={`remove-item-${product.id}`}
                        >
                          Remove item
                        </button>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="total-row" data-testid="basket-total">
                <span>Total</span>
                <strong className="total-row__value">
                  {formatCurrency(total)}
                </strong>
              </div>
            </>
          ) : (
            <div className="empty-state" role="status">
              Your basket is empty. Head back to the shop to add some items.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default BasketPage
