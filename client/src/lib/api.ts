import axios from "axios";
import {Product} from "./Model";

let cachedToken = localStorage.getItem('at') || ''

interface ApiRequestInit extends Omit<RequestInit, 'headers'> {
    headers?: Record<string, string>;
}

function setHeader(options: ApiRequestInit, name: string, value: string) {
    options.headers = options.headers || {}
    options.headers[name] = value
}

// https://stackoverflow.com/a/8511350/6620659
function isObject(val: unknown): boolean {
    return typeof val === 'object' &&
        !Array.isArray(val) &&
        val !== null
}

const prepareFetch = async (data = {}, options: ApiRequestInit = {}) => {
    if (cachedToken)
        setHeader(options, 'Authorization', 'Bearer ' + cachedToken)

    if (isObject(options.body) && !(options.body instanceof FormData)) {
        options.body = JSON.stringify(options.body)
        setHeader(options, 'Content-Type', 'application/json')
    }

    setHeader(options, 'Accept', 'application/json')
}

export const fetchGet = async (path: string, options: ApiRequestInit = {}) => {
    prepareFetch(options);
    const url = "http://95.31.35.191:8080" + path
    return axios.get(url);
}

export const fetchPost = async (path: string, data = {}, options: ApiRequestInit = {}) => {
    prepareFetch(data, options);
    const url = "http://95.31.35.191:8080" + path
    return axios.post(url, data);
}

export async function getImages(product: Product): Promise<Array<string>> {
    try {
        const response = await fetchPost('/image/get', product);
        return response.data.map((imageUrl: string) => {
            return `${imageUrl}`; // data:image/jpeg;base64,
        });
    } catch (error) {
        console.error('Ошибка при получении картинок:', error);
        return [];
    }
}