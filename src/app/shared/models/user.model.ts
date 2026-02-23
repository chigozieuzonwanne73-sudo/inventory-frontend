
export interface User {
  userId?: string;
  email?: string;
  shopId?: string;
  token?: string;
  role?: string
}

export interface NewUser {
  firstName: string;
  lastName: string;
  shopId?: string;
  email: string;
  password: string;
}

export interface Cashier {
  id?: string;
  Name: string;
  shopId: string;
}

export interface NewCashier {
  firstname: string;
  lastname: string;
  shopId: string;
}
