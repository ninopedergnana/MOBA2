import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DetailCard from '../components/DetailCard'
import useCoin from '../util/query-hooks/useCoin'


export default function ({ route }: { route: any }) {
    const coin = useCoin(route.params.id)

    return (
        <View style={ styles.container }>
            { coin.data &&
                <DetailCard coin={ coin.data }/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100%',
    },
})