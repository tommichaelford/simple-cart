import { Link } from 'react-router-dom'
import { formatCurrency, type Product } from '../basket.ts'
import Badge from './ui/Badge.tsx'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
  quantity: number
  onAddToBasket: () => void
}

const ProductCard = ({
  product,
  quantity,
  onAddToBasket,
}: ProductCardProps) => {
  return (
    <li className="product-card">
      <Link className="product-card__link" to={`/item/${product.id}`}>
        <div className="product-card__header">
          <div>
            <h3 className="product-card__title">{product.name}</h3>
            <p className="product-card__price">
              {formatCurrency(product.price)}
            </p>
          </div>
          {quantity > 0 && (
            <Badge
              className="product-card__badge"
              ariaLabel={`${quantity} in basket`}
            >
              {`${quantity} in basket`}
            </Badge>
          )}
        </div>

        <p className="product-card__description">{product.description}</p>
      </Link>

      <div className="product-card__footer">
        <button
          type="button"
          className="button"
          onClick={onAddToBasket}
          aria-label={`Add ${product.name} to basket`}
        >
          Add to basket
        </button>
      </div>
    </li>
  )
}

export default ProductCard
