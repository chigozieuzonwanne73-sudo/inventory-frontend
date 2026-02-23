export interface Cart {
    cartId: string;
    shopId: string;
    totalAmount: number;
    items: CartItem[];
    status: string;
}

export interface CartItem {
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}

export interface CartItemRequest {
    cartItemId: string;
    quantity: number;
    productId: string;
}