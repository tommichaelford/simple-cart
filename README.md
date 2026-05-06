# Simple Cart

Simple Cart is a small React + TypeScript shopping basket app for a bike shop. It includes a shop view, product detail view, and basket view with quantity updates and total calculations.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Build and preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Run tests

Run the automated test suite with:

```bash
npm run test
```

Other useful checks:

```bash
npm run lint
npm run format:check
```

## What's tested

The current test suite covers:

- Basket data logic in [`src/basket.test.ts`]: quantity updates that do not reduce existing items below one, explicit item removal, preserving immutability, and recalculating basket totals correctly.
- Product page behaviour in [`src/pages/ProductPage.test.tsx`]: rendering the selected product details, adding the item to the basket, updating the basket summary, and showing the not found page for an unknown product.
- Basket page behaviour in [`src/pages/BasketPage.test.tsx`]: updating item quantities through the UI and verifying the displayed basket total changes as expected.

## Available scripts

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run preview
npm run format
npm run format:check
```
