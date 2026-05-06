import { Link } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <main className="page-shell not-found-page" id="main-content">
      <section className="panel">
        <div className="panel__content not-found-page__content">
          <p className="section-eyebrow">404 Error</p>
          <h1 className="page-title" data-testid="not-found-title">
            Sorry, we cannot find the page you are looking for.
          </h1>
          <p className="page-copy">
            The page may have moved, or the link might be incorrect.
          </p>
          <Link
            to="/"
            className="button not-found-page__action"
            data-testid="return-to-shop"
          >
            Return to shop
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
