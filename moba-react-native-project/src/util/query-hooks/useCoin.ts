import { useQuery } from 'react-query'
import { getCoinDetail } from '../api/requests'


export default function useCoin(id: string) {
    return useQuery(
        ['coin', id],
        async () => getCoinDetail(id),
    )
}
