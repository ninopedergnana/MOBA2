import {useEffect} from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ResultItem from '../components/ResultItem'
import useCoinList from '../util/query-hooks/useCoinList'


export default function ({route, navigation}: {route: any, navigation: any}) {
    const coinList = useCoinList(route.params.search)

    return (
        <ScrollView style={styles.container}>
            {coinList.data && coinList.data.map((current, i) => {
                return (
                    <ResultItem key={i} coin={current} navigation={navigation}/>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
})