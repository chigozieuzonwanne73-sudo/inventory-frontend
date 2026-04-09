# Inventory Frontend

**Angular 19 · Tailwind CSS · v1.0.0 · Apr 2026 · MIT License**

---

## Table of Contents

[System Requirements](#system-requirements)
[Installation & Setup](#installation--setup)
[Development Server](#development-server)
[Application Features](#application-features)
[User Workflows](#user-workflows)
[Configuration](#configuration)
[Troubleshooting](#troubleshooting)
[Building for Production](#building-for-production)
[Deployment](#deployment)
[Infrastructure & Hosting](#infrastructure--hosting)
[API Integration](#api-integration)
[Support & Resources](#support--resources)

---

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | v18.0.0 | v20.x LTS |
| npm | v9.0.0 | v10.x |


### Browser support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | Supported |
| Firefox | 88+ | Supported |
| Safari | 14+ | Supported |
| Edge | 90+ | Supported |
| IE 11 | — | Not supported |

**Prerequisites:** Git, a running Shopana backend API, and an active internet connection during setup.

---

## Installation & Setup

### 1 — Clone the repository

```bash
git clone https://github.com/okahgreat199-svg/inventory-frontend.git
cd shopana-inventory-frontend
```

### 2 — Install dependencies

```bash
npm install
# or
yarn install

npm list @angular/core  # verify: should show Angular 19.x.x
```

Installation takes roughly 3–5 minutes and pulls in Angular 19, Angular Material, Tailwind CSS, ApexCharts/ECharts/Chart.js, etc.

### 3 — Configure environment

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5086',
  apiTimeout: 30000,
  logLevel: 'debug',
};
```

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://inventory-backend.duckdns.org',
  apiTimeout: 30000,
};
```

### 4 — Verify

```bash
node --version   # v18.0.0 or higher
npm --version    # v9.0.0 or higher
npm start        # should open http://localhost:4200
```

---

## Development Server

```bash
npm start
# or
ng serve
ng serve --port 4300   # custom port
```

The first build may take 30–60 seconds; subsequent incremental builds are much faster.

| URL | Default credentials |
|-----|---------------------|
| `http://localhost:4200` | `Greatokah163@gmail.com` / `Okah@123` |

The dev server supports hot module replacement, full source maps, and live reload. Stop with `Ctrl+C`.

---

## Application Features

### Dashboard

### Inventory management

### Point of sale

### Reports & analytics

### User & access management

| Role | Permissions |
|------|-------------|
| Developer | Full access, user management, settings |
| Owner | Inventory, sales, reports, staff |
| Cashier | POS, basic inventory queries |

### Multi-shop & settings

---

## User Workflows

### Record a sale (POS)

1. Go to *Products*
2. Search for item or filter
3. Click on add to cart
4. Go to *New Sale*
5. Modify Price/Quantity
6. Click on Proceed to Checkout
7. Enter customer information and complete order

### Add a new product

1. Navigate to *Products → Add  Product
2. Fill required fields
3. Click *Submit*

### Generate a monthly sales report

1. Go to *Reports → Monthly Breakdown*
2. Select date range and optional filters
3. Click *Generate Report*
4. Export as PDF


---

## Troubleshooting

### Port 4200 already in use

```bash
ng serve --port 4300
# or kill the existing process
lsof -ti:4200 | xargs kill -9
```

### Missing dependencies

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Compilation errors

```bash
npx tsc --version
npx tsc --noEmit
npm install && npm audit fix
```

### HMR not reflecting changes

```bash
ng serve --hmr
```

```

## Building for Production

```bash
npm run build
# with custom base href
ng build --base-href="/inventory-frontend/" --configuration=production
```

### Output structure

```
dist/browser/
├── index.html
├── main.[hash].js
├── polyfills.[hash].js
├── styles.[hash].css
└── assets/
    ├── i18n/
    └── images/
```

### Pre-deployment checklist

- [ ] Run `npm run build` without warnings
- [ ] Test locally: `npx http-server dist/browser`
- [ ] Test in target browsers
- [ ] Run accessibility audit
- [ ] Verify all production environment variables are set
- [ ] Generate source maps for production debugging

---

## Deployment

### GitHub Pages

```bash
npm install angular-cli-ghpages --save-dev
ng build --base-href="https://okahgreat199-svg.github.io/inventory-frontend/"
npx angular-cli-ghpages --dir=dist/browser
```

---

## Infrastructure & Hosting

### Testing environment

Full development and testing was carried out on an **Interserver VPS**, with both the frontend and backend running together on the same server. This allowed end-to-end testing over a single origin with no cross-origin concerns.

### Submission setup

For submission, the frontend was moved to **GitHub Pages** and the backend remained on the VPS. This introduced an HTTP/HTTPS mismatch — GitHub Pages enforces HTTPS, while the backend was initially accessible only over plain HTTP via the VPS IP address. Browsers block mixed-content requests, which broke API calls from the hosted frontend.

This was resolved by:

1. Setting up **DuckDNS** to provide a stable domain name pointing to the VPS IP
2. Using **Certbot** (Let's Encrypt) to provision a valid TLS certificate for that domain
3. Configuring the backend to serve over HTTPS via the DuckDNS domain
4. Updating `environment.prod.ts` to point `apiUrl` at the HTTPS DuckDNS endpoint

The result is a fully HTTPS stack: the Angular frontend on GitHub Pages communicates with the backend over `https://<subdomain>.duckdns.org`.

### Architecture summary

```
Browser
  └── GitHub Pages (Angular frontend, HTTPS)
        └── DuckDNS domain → Interserver VPS
              └── Certbot/Let's Encrypt TLS
                    └── Node.js/Express backend (HTTPS)
```

---

## API Integration

The frontend expects a Node.js/Express backend. Edit `src/environments/environment.ts` to point `apiUrl` at your instance.

### Auth

```
POST  /api/auth/register
POST  /api/auth/login
POST  /api/auth/refresh
POST  /api/auth/forgot-password
POST  /api/auth/reset-password
```

### Products & categories

```
GET    /api/products
POST   /api/products
GET    /api/products/:id
PATCH  /api/products/:id
DELETE /api/products/:id
GET    /api/categories
```

### Sales

```
POST  /api/sales
GET   /api/sales
GET   /api/sales/:id
GET   /api/sales/receipt/:id
```

### Reports

```
GET   /api/reports/sales
GET   /api/reports/inventory
GET   /api/reports/customer
POST  /api/reports/export
```

---

*Last updated: April 2026 · github.com/okahgreat199-svg/inventory-frontend*