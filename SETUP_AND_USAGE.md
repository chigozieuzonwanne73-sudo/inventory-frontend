# Shopana Inventory Frontend - Complete Setup & Usage Guide

## Table of Contents
1. [Overview](#overview)
2. [System Requirements](#system-requirements)
3. [Installation & Setup](#installation--setup)
4. [Development Server](#development-server)
5. [Application Features](#application-features)
6. [User Workflows](#user-workflows)
7. [Configuration](#configuration)
8. [Troubleshooting](#troubleshooting)
9. [Building for Production](#building-for-production)
10. [Deployment](#deployment)
11. [API Integration](#api-integration)
12. [Support & Resources](#support--resources)

---

## Overview

**Shopana Inventory Frontend** is a comprehensive, modern web application built with **Angular 19** and **Tailwind CSS** for managing retail inventory, sales transactions, and business analytics. The application provides real-time insights, multi-shop support, and role-based access control.

### Key Features
- 🏪 **Multi-Shop Management** - Manage multiple retail locations
- 📊 **Advanced Analytics & Reporting** - Real-time dashboards and exportable reports
- 📦 **Inventory Management** - Track stock levels, categories, and products
- 💰 **Point of Sale (POS)** - Record transactions and manage payments
- 👥 **User Management** - Role-based access control with granular permissions
- 🌍 **Internationalization** - Multi-language support (English, Arabic, and more)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ♿ **Accessible** - WCAG 2.1 AA compliant interface

---

## System Requirements

### Minimum Requirements
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher (or yarn v3.0.0+)
- **Memory:** 4GB RAM minimum
- **Disk Space:** 500MB free space

### Recommended Requirements
- **Node.js:** v20.x LTS or higher
- **npm:** v10.x or higher
- **Memory:** 8GB+ RAM
- **Disk Space:** 1GB+ free space
- **Browser:** Latest Chrome, Firefox, Safari, or Edge

### Supported Browsers
| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| IE 11 | N/A | ❌ Not Supported |

### Prerequisites
- Git installed for version control
- Backend API running (Shopana Inventory Backend Service)
- Active internet connection during setup

---

## Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/okahgreat199-svg/inventory-frontend.git

# Navigate to the project directory
cd shopana-inventory-frontend

# Verify you're in the correct directory
pwd  # Should show: /path/to/shopana-inventory-frontend
```

### Step 2: Install Dependencies

```bash
# Install all npm dependencies
npm install

# Or using yarn
yarn install

# Verify installation
npm list @angular/core  # Should show Angular 19.x.x
```

Installation typically takes 3-5 minutes depending on internet speed. This installs:
- Angular 19 framework and dependencies
- Angular Material components
- Tailwind CSS
- Chart libraries (ApexCharts, ECharts, Chart.js)
- i18n translation system
- And 50+ other packages

### Step 3: Environment Configuration

Create an `.env` file in the project root (or use existing `environment.ts`):

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // Backend API endpoint
  apiTimeout: 30000,  // 30 seconds
  logLevel: 'debug',  // debug | info | warn | error
  features: {
    enableMockData: false,
    enableDebugPanel: true,
  }
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.shopana.com/api',
  apiTimeout: 30000,
  logLevel: 'error',
  features: {
    enableMockData: false,
    enableDebugPanel: false,
  }
};
```

### Step 4: Verify Installation

```bash
# Check Node version
node --version  # Should be v18.0.0 or higher

# Check npm version
npm --version   # Should be v9.0.0 or higher

# List installed Angular packages
npm list @angular/core @angular/common

# Start the development server (see next section)
npm start
```

---

## Development Server

### Starting the Application

```bash
# Start the development server with hot reload
npm start

# or using Angular CLI directly
ng serve

# With custom port (default is 4200)
ng serve --port 4300

# Open your browser to http://localhost:4200
```

### First Time Startup
The first build may take 30-60 seconds. Subsequent builds (with file changes) are much faster due to incremental compilation.

### Access the Application
```
URL: http://localhost:4200
Default Demo User: demo@shopana.com
Default Demo Password: Demo123456!
```

### Development Server Features
- **Hot Module Replacement (HMR):** Changes are reflected immediately
- **Source Maps:** Full debugging capability in browser DevTools
- **Error Reporting:** Detailed CLI error messages
- **Live Reload:** Page automatically refreshes on major changes

### Stopping the Server
```bash
# Press Ctrl+C in the terminal
# or
kill -9 $(lsof -ti:4200)  # Force kill server on port 4200
```

---

## Application Features

### 1. Authentication Module
- **Sign Up:** New user registration with email verification
- **Sign In:** Secure login with JWT token management
- **Forgot Password:** Email-based password reset
- **Two-Factor Authentication:** Optional enhanced security
- **Session Management:** Automatic logout after inactivity

### 2. Dashboard
- **Overview Widgets:**
  - Today's sales revenue
  - Total inventory value
  - Low-stock alerts
  - Monthly trend charts
  
- **Real-Time Metrics:**
  - Top-selling products
  - Sales by category
  - Inventory turnover rate
  - Customer activity

- **Quick Actions:**
  - Create new sale
  - Add product
  - Generate report
  - Manage staff

### 3. Inventory Management
**Features:**
- Add, edit, and delete products
- Categorize products
- Track stock levels in real-time
- Set low-stock alerts
- Bulk import/export (CSV)
- Barcode scanning support
- Product image gallery

**Workflows:**
```
Create Product → Set Details → Add Stock → Set Alerts → Publish
     ↓             ↓          ↓           ↓            ↓
   SKU        Category    Quantity    Threshold    Available
  Name         Price       Cost      Reorder Pt.    for Sale
```

### 4. Point of Sale (POS)
**Features:**
- Quick product selection
- Quantity and discount entry
- Multiple payment methods
- Receipt printing/email
- Customer management
- Transaction history

**Payment Methods Supported:**
- Cash
- Card (Visa, Mastercard)
- Mobile Money
- Bank Transfer
- Check

### 5. Reports & Analytics
**Available Reports:**
- **Sales Report:** Daily, weekly, monthly, custom range
- **Inventory Report:** Stock levels, low-stock items, valuation
- **Customer Report:** Top customers, purchasing patterns
- **Employee Report:** Sales by staff, performance metrics
- **Tax Report:** Sales tax, VAT compliance

**Export Formats:**
- PDF with branding
- Microsoft Excel (.xlsx)
- CSV for import into other systems

### 6. User & Access Management
**User Roles:**
| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, settings |
| **Manager** | Inventory, sales, reports, staff supervision |
| **Staff** | POS operations, basic inventory queries |
| **Accountant** | Financial reports, transaction reconciliation |
| **Viewer** | Read-only access to reports and dashboards |

### 7. Multi-Shop Management
- Switch between multiple locations from header dropdown
- Independent inventory per shop
- Consolidated reporting across shops
- Centralized user management
- Shop-specific settings

### 8. Settings & Customization
**Available Settings:**
- **General:** Shop name, currency, time zone
- **Appearance:** Theme (dark/light), color scheme
- **Language:** English, Arabic, French, Spanish
- **Notifications:** Email alerts, SMS notifications
- **API Keys:** Integration with third-party services
- **Backup:** Automated backup scheduling

---

## User Workflows

### Workflow 1: Record a Sale (POS)

```
1. Go to "Point of Sale" from main menu
2. Click "New Transaction"
3. Scan product barcode or search by name
4. Enter quantity and apply discounts (if any)
5. Select customer (optional)
6. Choose payment method
7. Confirm payment
8. Print or email receipt
9. Transaction recorded in history
```

**Expected Time:** 2-3 minutes per transaction

### Workflow 2: Add New Product to Inventory

```
1. Navigate to "Products" → "Inventory"
2. Click "Add New Product"
3. Fill in required fields:
   - Product Name
   - SKU (unique identifier)
   - Category
   - Purchase Cost
   - Selling Price
4. Upload product image (optional)
5. Set stock quantity
6. Configure alerts (low-stock threshold)
7. Click "Save & Publish"
8. Product appears in store and POS
```

**Required Fields:** Name, SKU, Category, Cost, Price, Quantity
**Optional Fields:** Image, Description, Barcode, Supplier

### Workflow 3: Generate Monthly Sales Report

```
1. Go to "Reports" → "Sales Report"
2. Select date range (e.g., "This Month")
3. Filter by:
   - Product category
   - Payment method
   - Shop location
   - Staff member
4. Click "Generate Report"
5. Review data in table and charts
6. Export as PDF or Excel
7. Share with team via email
```

### Workflow 4: Manage User Permissions (Admin)

```
1. Go to "Settings" → "Users & Roles"
2. Click "Add New User"
3. Enter user details:
   - Full Name
   - Email
   - Phone
   - Shop Assignment
4. Select Role (Admin, Manager, Staff, etc.)
5. Customize permissions (if needed)
6. Click "Send Invitation"
7. User receives email with activation link
8. User sets password and activates account
```

### Workflow 5: Analyze Inventory Levels

```
1. Go to "Dashboard" → "Inventory Analytics"
2. View key metrics:
   - Total inventory value
   - Stock turnover rate
   - Days inventory outstanding
   - Products approaching low-stock
3. Click on specific category for details
4. Identify products to reorder
5. Export low-stock report
6. Communicate with suppliers
```

---

## Configuration

### Build Options

#### Development Build
```bash
# Standard development server
npm start

# With debugging enabled
ng serve --source-map

# Specific configuration
ng serve --configuration=development --port=4300
```

#### Production Build
```bash
# Build optimized for production
npm run build

# With custom base href (for subdirectory deployment)
ng build --base-href "/inventory-frontend/"

# With configuration
ng build --configuration=production
```

### Environment Configuration

**Configuration File Locations:**
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

**Key Configuration Options:**

```typescript
// API Endpoints
apiUrl: 'http://localhost:3000/api'
authUrl: 'http://localhost:3000/auth'
uploadUrl: 'http://localhost:3000/upload'

// Timeouts (in milliseconds)
apiTimeout: 30000
sessionTimeout: 1800000  // 30 minutes

// Features
enableAnalytics: true
enableNotifications: true
enableOfflineMode: false

// Localization
defaultLanguage: 'en'
supportedLanguages: ['en', 'ar', 'fr', 'es']

// Logging
logLevel: 'warn'  // debug, info, warn, error
enableConsoleLogging: false
enableServerLogging: true
```

### Tailwind CSS Configuration

Edit `tailwind.config.js` for styling customization:

```javascript
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors
        primary: '#1e40af',
        secondary: '#7c3aed',
      },
      spacing: {
        // Add custom spacing
      }
    },
  },
  plugins: [],
}
```

### Angular Configuration

Key settings in `angular.json`:

```json
{
  "defaultProject": "shopana-inventory-frontend",
  "architect": {
    "build": {
      "options": {
        "outputPath": "dist/browser",
        "budgets": [
          {
            "type": "bundle",
            "maximumWarning": "2mb",
            "maximumError": "5mb"
          }
        ]
      }
    }
  }
}
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Port 4200 Already in Use

**Error Message:**
```
ng serve
⠙ Building...
✖ Failed to serve
Port 4200 is already in use
```

**Solutions:**
```bash
# Option 1: Use a different port
ng serve --port 4300

# Option 2: Kill the process using port 4200
lsof -ti:4200 | xargs kill -9

# Option 3: Find and terminate the process manually
ps aux | grep ng serve
kill -9 <PID>
```

#### Issue 2: Dependencies Not Installed

**Symptoms:**
- `Cannot find module '@angular/core'`
- Errors in IDE regarding missing packages

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Verify installation
npm list
```

#### Issue 3: Compilation Errors

**Common Causes:**
- TypeScript version mismatch
- Incompatible package versions
- Missing polyfills

**Solution:**
```bash
# Check TypeScript version
npx tsc --version

# Rebuild project
ng build --watch

# Check for type errors
npx tsc --noEmit

# Install missing dependencies
npm install
npm audit fix
```

#### Issue 4: Hot Module Replacement (HMR) Issues

**Symptoms:**
- Page requires manual refresh after changes
- Changes not reflecting in browser

**Solution:**
```bash
# Restart development server with HMR enabled
ng serve --hmr

# Or clear browser cache
# Press Ctrl+Shift+Delete to open cache clearing options
```

#### Issue 5: Authentication Token Expired

**Symptoms:**
- "Unauthorized" errors on API calls
- Automatic logout without interaction

**Solutions:**
```typescript
// In src/app/shared/interceptors/auth.interceptor.ts
- Extend token timeout in environment.ts
- Enable token refresh mechanism
- Check backend token expiration settings
```

#### Issue 6: CORS Errors

**Error Message:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Ensure backend has proper CORS headers
2. Check API URL in `environment.ts`
3. Verify backend is running on correct port
4. Use proxy configuration in `angular.json`:

```json
"serve": {
  "options": {
    "proxyConfig": "proxy.conf.json"
  }
}
```

Create `proxy.conf.json`:
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": { "^/api": "/api" }
  }
}
```

#### Issue 7: Localization (i18n) Not Loading

**Symptoms:**
- Translation keys showing instead of actual text
- Language switcher not working

**Solution:**
```bash
# Build with localization
ng build --localize

# Check translation files in src/assets/i18n/
# Verify i18n service initialization in app.config.ts
```

#### Issue 8: Build Size Too Large

**Error:**
```
bundle size exceeded: 5mb
```

**Solutions:**
```bash
# Analyze bundle
ng build --stats-json
npm run build -- --stats-json && webpack-bundle-analyzer dist/browser/stats.json

# Lazy load modules
# Use code splitting
# Remove unused dependencies
npm audit
npm prune

# Build with optimizations
ng build --optimization --aot
```

### Debugging Tips

#### Enable Browser Debugging
```bash
# Start with debugging enabled
ng serve --source-map

# Open Chrome DevTools: F12 or Cmd+Option+I
# Set breakpoints in Sources tab
```

#### Check Network Requests
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Make API calls and monitor responses
4. Check for failed requests or timeouts

#### Enable Console Logging
```typescript
// In environment.ts
export const environment = {
  logLevel: 'debug',
  enableConsoleLogging: true
};

// In browser console
localStorage.debug = 'shopana:*'
```

#### View Application State
```bash
# Install Angular DevTools extension for Chrome
# Open DevTools → Angular tab
# Inspect component state and bindings
```

---

## Building for Production

### Production Build Process

```bash
# Build for production
npm run build

# Build with base href for subdirectory
ng build --base-href="/inventory-frontend/" --configuration=production

# Build with optimization
ng build --optimization --aot --build-optimizer
```

### Build Output
```
dist/browser/
├── index.html
├── main.abc123.js
├── polyfills.xyz789.js
├── styles.def456.css
├── assets/
│   ├── i18n/
│   └── images/
└── (other optimized files)
```

### Bundle Analysis
```bash
# Generate bundle report
ng build --stats-json

# Analyze with webpack-bundle-analyzer
webpack-bundle-analyzer dist/browser/stats.json
```

### Performance Optimization

| Optimization | Command | Benefit |
|--------------|---------|---------|
| Lazy Loading | `ng build --lazy-modules` | Smaller initial bundle |
| Tree Shaking | Automatic | Removes unused code |
| Minification | Automatic in production | Reduces file size |
| AOT Compilation | `--aot` | Smaller and faster |
| Service Worker | `ng add @angular/service-worker` | Offline support |

### Pre-deployment Checklist

- [ ] Run `npm run build`
- [ ] Verify build succeeds without warnings
- [ ] Test production build locally: `npx http-server dist/browser`
- [ ] Check build size < 5MB
- [ ] Test in target browser(s)
- [ ] Run accessibility audit
- [ ] Verify all environment variables are set for production
- [ ] Enable minification and optimization flags
- [ ] Generate source maps for debugging
- [ ] Create deployment archive

---

## Deployment

### Deployment Options

#### Option 1: GitHub Pages
```bash
# Install angular-cli-ghpages
npm install angular-cli-ghpages --save-dev

# Build and deploy
ng build --base-href="https://okahgreat199-svg.github.io/inventory-frontend/"
npx angular-cli-ghpages --dir=dist/browser
```

#### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option 3: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist/browser
```

#### Option 4: Docker
```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run Docker image
docker build -t shopana-inventory:latest .
docker run -p 80:80 shopana-inventory:latest
```

#### Option 5: Traditional Server
```bash
# SSH to your server
ssh user@your-server.com

# Clone and setup
git clone https://github.com/your-repo/inventory-frontend.git
cd inventory-frontend
npm install
npm run build

# Copy files to web server
cp -r dist/browser /var/www/html/inventory

# Configure web server (nginx example)
```

### Environment-Specific Configuration
```bash
# Development deployment
ng build --configuration=development

# Staging deployment
ng build --configuration=staging

# Production deployment
ng build --configuration=production
```

### SSL/HTTPS Setup
```nginx
# nginx configuration for HTTPS
server {
    listen 443 ssl http2;
    server_name inventory.shopana.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /var/www/html/inventory;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## API Integration

### Backend Requirements
The frontend requires a Node.js/Express backend API with the following endpoints:

### Authentication Endpoints
```
POST   /api/auth/register       - User registration
POST   /api/auth/login          - User login (returns JWT token)
POST   /api/auth/refresh        - Refresh JWT token
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password with token
```

### Product Endpoints
```
GET    /api/products            - List products
POST   /api/products            - Create product
GET    /api/products/:id        - Get product details
PATCH  /api/products/:id        - Update product
DELETE /api/products/:id        - Delete product
GET    /api/categories          - List categories
```

### Sales Endpoints
```
POST   /api/sales               - Create new sale
GET    /api/sales               - List sales
GET    /api/sales/:id           - Get sale details
GET    /api/sales/receipt/:id   - Get receipt
```

### Reports Endpoints
```
GET    /api/reports/sales       - Sales report
GET    /api/reports/inventory   - Inventory report
GET    /api/reports/customer    - Customer report
POST   /api/reports/export      - Export report
```

### Setting Up API Connection

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000
};
```

### HTTP Interceptor Example
```typescript
// src/app/shared/interceptors/auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(req).pipe(
      timeout(environment.apiTimeout),
      retry(1),
      catchError(error => this.handleError(error))
    );
  }
}
```

---

## Support & Resources

### Getting Help

#### Documentation
- [Angular Official Docs](https://angular.io/docs)
- [Angular Material Docs](https://material.angular.io)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

#### Community
- Stack Overflow: Tag your question with `angular`, `shopana-inventory`
- GitHub Issues: [Report bugs](https://github.com/okahgreat199-svg/inventory-frontend/issues)
- Community Forum: [Shopana Community](https://community.shopana.com)

#### Contact Support
- **Email:** support@shopana.com
- **Phone:** +1 (555) 123-4567
- **Live Chat:** Available 9 AM - 6 PM EST, Monday-Friday

### Useful Commands Reference

```bash
# Start development server
npm start

# Build application
npm run build

# Run tests
npm test

# Watch for file changes and test
npm run watch

# Lint code
npm run lint

# Format code
npm run format

# Generate new component
ng generate component path/to/component

# Generate new service
ng generate service path/to/service

# Generate new module
ng generate module path/to/module

# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

### Version History

| Version | Release Date | Key Changes |
|---------|--------------|-------------|
| 1.0.0 | Apr 2026 | Initial release with core features |
| 1.1.0 | (Upcoming) | Mobile optimization, offline support |
| 2.0.0 | (Planned) | Advanced analytics, AI recommendations |

### Contributing
Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md) and submit pull requests.

### License
This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## Quick Reference Card

| Task | Command |
|------|---------|
| **Install** | `npm install` |
| **Start Dev** | `npm start` |
| **Build Prod** | `npm run build` |
| **Run Tests** | `npm test` |
| **Lint Code** | `ng lint` |
| **Generate Component** | `ng generate component name` |

---

*Last Updated: April 2026*  
*For the latest information, visit: https://github.com/okahgreat199-svg/inventory-frontend*
