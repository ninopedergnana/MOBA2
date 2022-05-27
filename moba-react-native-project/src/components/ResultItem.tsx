import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function({coin, navigation}: {coin: any, navigation: any}) {
    const showDetail = () => navigation.navigate('Details', {id: coin.id})

    return (
        <TouchableOpacity style={styles.card} onPress={showDetail}>
            <Text>{coin.name}</Text>
            <Text>{coin.symbol}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 4,
        padding: 8,
        borderRadius: 4
    },
    
})