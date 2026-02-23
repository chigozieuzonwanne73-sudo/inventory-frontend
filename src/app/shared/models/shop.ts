export interface Shop {
    employeeCount: string,
    employees?: any[],
    location: string,
    name: string
    id: string
}

export interface EditShop {
    shopId: string,
    name?: string,
    location?: string
}

export interface NewShop {
    name: string,
    location: string
}
