export interface PcUser {
    selected: Map<ProductType, ProductInfo>,
}

export interface ProductInfo {
    id: number,
    type: ProductType,
    image: string,
    title: string,
    price: number
}

export enum ProductType {
    cpu = "Процессор",
    motherboard = "Материнская плата",
    videocard = "Видеокарта",
    memory = "Оперативная память",
    powersupply = "Блок питания",
}

export function getUser(): PcUser | null {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
}

export function saveUser(user: PcUser) {
    localStorage.setItem('user', JSON.stringify(user))
}
