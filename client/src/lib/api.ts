import axios from "axios";

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
    const url = "http://localhost:8080" + path
    return axios.get(url);
}

export const fetchPost = async (path: string, data = {}, options: ApiRequestInit = {}) => {
    prepareFetch(data, options);
    const url = "http://localhost:8080" + path
    return axios.post(url, data);
}

export const setToken = (token?: string) => {
    cachedToken = token || ''
    if (token)
        localStorage.setItem('at', token)
    else
        localStorage.removeItem('at')
}

export const getToken = (): string => {
    return cachedToken
}