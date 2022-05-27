import { Image, StyleSheet, View, Text } from "react-native";

export default function({coin}: {coin: any}) {
    return (
        <View style={styles.card}>
            <View style={styles.center}>
                <Image style={styles.logo} source={{uri: coin.image.small}}/>
            </View>
            <View style={styles.row}>
                <Text>Name:</Text>
                <Text>{coin.name}</Text>
            </View>
            <View style={styles.row}>
                <Text>Price:</Text>
                <Text>${coin.market_data.current_price.usd}</Text>
            </View>
            <View style={styles.row}>
                <Text>Rank:</Text>
                <Text>{coin.market_data.market_cap_rank}</Text>
            </View>
            <View style={styles.row}>
                <Text>MarketCap:</Text>
                <Text>${coin.market_data.market_cap.usd}</Text>
            </View>
            <View style={styles.row}>
                <Text>All time high:</Text>
                <Text>${coin.market_data.ath.usd}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        display: 'flex',
        gap: 8,
        margin: 4,
        padding: 16,
        borderRadius: 4
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        height: 50,
        width: 50
    }
})