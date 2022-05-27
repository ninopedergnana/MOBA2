import axios from 'axios'


/**
 * This file provides functions for generic GET/POST/PUT/DELETE requests.
 * Base-url is set and token is loaded automatically.
 */

const baseUrl: string = 'https://api.coingecko.com/api/v3/'

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
})

export async function get(endPoint: string, params: object = {}): Promise<any> {
    const response = await instance.get(endPoint, params)
    return response.data
}