export interface UserInfo {
    selected: Map<ProductType, ProductInfo>,
}

export interface ProductInfo {
    id: number,
    type: ProductType,
    images: string[],
    title: string,
    price: number,
    otherSpecifications: Map<string, string>,
}

export enum ProductType {
    cpu = "Процессор",
    motherboard = "Материнская плата",
    videocard = "Видеокарта",
    memory = "Оперативная память",
    powersupply = "Блок питания",
}

export function getUser(): UserInfo {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {selected: new Map<ProductType, ProductInfo>()};
}

export function saveUser(user: UserInfo) {
    localStorage.setItem('user', JSON.stringify(user))
}
