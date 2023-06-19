import {ConfigurationType, ProductType} from "./PcApp";

export interface Product {
    id: number,
    title: string,
    price: number,
    images: string[],
    productType: ProductType,
    configurationType: ConfigurationType,
    otherSpecifications: Map<string, string>
}

export interface CPU extends Product {
    socket: string,
    frequency: number,
    energyConsumption: number,
    cores: number,
    threads: number
}

export interface Memory extends Product {
    capacity: number,
    type: string,
    speed: number
}

export interface Cooler extends Product {
    socket: string,
    rpm: number,
    noiseLevel: number,
    radiatorSize: number,
}

export interface Motherboard extends Product {
    socket: string,
    caseType: string,
    ramSlots: number,
    memoryMax: number,
    supportedType: string,
    storageInterfaces: string[]
}

export interface PowerSupply extends Product {
    wattage: number,
    caseType: string
}

export interface VideoCard extends Product {
    memorySize: number,
    frequency: number,
    memoryType: string
}

export interface Storage extends Product {
    capacity: number,
    type: string,
    interfaceType: string
}

export interface ComputerCase extends Product {
    type: string,
    material: string
}