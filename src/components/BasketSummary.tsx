import { Link } from 'react-router-dom'
import {
  calculateBasketTotal,
  formatCurrency,
  getBasketItemCount,
  type Basket,
} from '../features/basket/basket.ts'
import Badge from './ui/Badge.tsx'
import './BasketSummary.css'

type BasketSummaryProps = {
  basket: Basket
}

const BasketSummary = ({ basket }: BasketSummaryProps) => {
  const total = calculateBasketTotal(basket)
  const basketItemCount = getBasketItemCount(basket)

  return (
    <aside className="summary" aria-label="Basket summary">
      <Link
        to="/basket"
        className="basket-link"
        aria-label={`View basket, ${basketItemCount} item${basketItemCount === 1 ? '' : 's'}, total ${formatCurrency(total)}`}
        data-testid="basket-summary-link"
      >
        <span className="basket-link__icon" aria-hidden="true">
          Basket
        </span>
        <Badge className="basket-link__badge" shape="pill">
          {basketItemCount}
        </Badge>
        <p className="summary__total">{formatCurrency(total)}</p>
      </Link>
    </aside>
  )
}

export default BasketSummary
