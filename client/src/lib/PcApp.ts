import {Product} from "./Model";

export interface UserInfo {
    selected: { [key: string]: Product },
    configurationType: ConfigurationType,
}

export interface ConfigurationType {
    name: string,
    title: string
}


// export interface ProductInfo {
//     id: number,
//     type: ProductType,
//     images: string[],
//     title: string,
//     price: number,
//     otherSpecifications: Map<string, string>,
// }

export enum ProductType {
    cpu = "Процессор",
    motherboard = "Материнская плата",
    videocard = "Видеокарта",
    memory = "Оперативная память",
    powersupply = "Блок питания",
    cooler = "Кулер",
    storage = "Накопитель",
    case = "Корпус"
}

export function getUser(): UserInfo {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {selected: new Map<ProductType, Product>()};
}

export function saveUser(user: UserInfo) {
    localStorage.setItem('user', JSON.stringify(user))
}
