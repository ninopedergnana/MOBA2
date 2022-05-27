import { useQuery } from 'react-query'
import { getCoinList } from '../api/requests'


export default function useCoinList(search: string) {
    return useQuery(
        ['coinList', search],
        async () => {
            const coinList = await getCoinList()
            const searchTerm = search.toLowerCase()
            return coinList.coins.filter((current: any) =>
                current.id.toLowerCase().includes(searchTerm) || 
                current.name.toLowerCase().includes(searchTerm) || 
                current.symbol.toLowerCase().includes(searchTerm))
        },
    )
}
