export enum ProductType {
    Type1 = "type1",
    Type2 = "type2"
}

export enum ProductCategory {
    Category1 = "Category1",
    Category2 = "Category2"
}

export interface Product{
    id: number,
    name: string,
    type: ProductType,
    category: ProductCategory,
    isSubCategory : boolean,
    referenceID: number,
    password: string,
    deliveryFees: number,
    deliveryFeesPrecentage: number,
}