import { get } from "./base"

export async function getCoinList() {
    return get('search', { locale: 'en' })
}

export async function getCoinDetail(id: string) {
    return get(`coins/${id}`)
}