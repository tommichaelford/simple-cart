import { Link, useParams } from 'react-router-dom'
import BasketSummary from '../components/BasketSummary.tsx'
import Badge from '../components/ui/Badge.tsx'
import {
  formatCurrency,
  getProductById,
  type Basket,
} from '../features/basket/basket.ts'
import NotFoundPage from './NotFoundPage.tsx'
import './ProductPage.css'

interface ProductPageProps {
  basket: Basket
  quantity: number
  onAddToBasket: () => void
}

const ProductPage = ({ basket, quantity, onAddToBasket }: ProductPageProps) => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <NotFoundPage />
  }

  const product = getProductById(id)

  if (!product) {
    return <NotFoundPage />
  }

  return (
    <main className="page-shell" id="main-content">
      <section className="page-header">
        <div>
          <div className="page-actions">
            <Link to="/" className="back-link">
              Back to shop
            </Link>
          </div>
        </div>

        <BasketSummary basket={basket} />
      </section>

      <section className="detail-card">
        <div className="detail-card__header">
          <div>
            <h1 className="detail-card__title" data-testid="product-title">
              {product.name}
            </h1>
            <p className="detail-card__price">
              {formatCurrency(product.price)}
            </p>
          </div>
          {quantity > 0 && (
            <Badge
              className="detail-card__badge"
              ariaLabel={`${quantity} in basket`}
            >
              {`${quantity} in basket`}
            </Badge>
          )}
        </div>
        <p className="detail-card__description">{product.description}</p>
        <button
          type="button"
          className="button"
          onClick={onAddToBasket}
          data-testid="add-to-basket"
        >
          Add to basket
        </button>
      </section>
    </main>
  )
}

export default ProductPage
