import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string;
  state?: string;
  icon?: string;
  svgIcon?: string;
  disabled?: boolean;
  sub?: IChildItem[];
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string;
  state?: string;
  icon?: string;
  svgIcon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  // OWNER/ADMIN MENU
  ownerMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Sales & Orders'
    },
    {
      name: 'Transactions',
      type: 'link',
      icon: 'receipt_long',
      state: '/owner/transactions',
      badges: [{
        value: 'Live',
        color: 'primary'
      }]
    },
    {
      type: 'separator',
      name: 'Inventory'
    },
    {
      name: 'Products',
      type: 'dropDown',
      icon: 'inventory_2',
      state: 'products',
      sub: [
        {
          name: 'All Products',
          state: '/owner/products/all'
        },
        {
          name: 'Categories',
          state: '/owner/products/categories'
        },
      ]
    },
    {
      name: 'Shops',
      type: 'dropDown',
      icon: 'store',
      state: 'shops',
      sub: [
        {
          name: 'All Shops',
          state: '/owner/shops/all'
        },
        {
          name: 'Add Shop',
          state: '/owner/shops/add'
        },
      ]
    },
    {
      type: 'separator',
      name: 'Users & Access'
    },
    {
      name: 'Users',
      type: 'dropDown',
      icon: 'people',
      state: 'users',
      sub: [
        {
          name: 'All Users',
          state: '/owner/users/all'
        },
        {
          name: 'Add User',
          state: '/owner/users/add'
        },
        {
          name: 'Cashiers',
          state: '/owner/users/checkout-staff'
        }
      ]
    },
    {
      type: 'separator',
      name: 'Reports & Analytics'
    },
    {
      name: 'Reports',
      type: 'dropDown',
      icon: 'analytics',
      state: 'reports',
      sub: [
        {
          name: 'Sales Reports',
          state: '/owner/reports/sales'
        },
        {
          name: 'Product Performance',
          state: '/owner/reports/products'
        },
        {
          name: 'Monthly Breakdown',
          state: '/owner/reports/monthly'
        }
      ]
    },
  ];

  // CASHIER MENU
  cashierMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'Point of Sale'
    },
    {
      name: 'New Sale',
      type: 'link',
      icon: 'point_of_sale',
      state: '/cashier/pos',
      badges: [{
        value: 'POS',
        color: 'accent'
      }]
    },
    {
      type: 'separator',
      name: 'Orders & Transactions'
    },
    {
      name: 'Transactions',
      type: 'link',
      icon: 'receipt',
      state: '/cashier/transactions'
    },
    {
      name: 'Draft Carts',
      type: 'link',
      icon: 'drafts',
      state: '/cashier/pos/drafts'
    },
    {
      type: 'separator',
      name: 'Products & Inventory'
    },
    {
      name: 'Products',
      type: 'link',
      icon: 'inventory',
      state: '/cashier/products'
    },
  ];

  iconTypeMenuTitle = 'Frequently Accessed';
  menuItems = new BehaviorSubject<IMenuItem[]>(this.ownerMenu);
  menuItems$ = this.menuItems.asObservable();

  constructor() { }

  publishMenuByRole(role: string) {
    switch (role?.toLowerCase()) {
      case 'owner':
      case 'admin':
      case 'developer':
        this.menuItems.next(this.ownerMenu);
        break;
      case 'cashier':
        this.menuItems.next(this.cashierMenu);
        break;
      default:
        this.menuItems.next([]);
    }
  }

  // Helper method to get menu by role directly
  getMenuByRole(role: string): IMenuItem[] {
    switch (role?.toLowerCase()) {
      case 'owner':
      case 'admin':
        return this.ownerMenu;
      case 'cashier':
        return this.cashierMenu;
      default:
        return [];
    }
  }

}
