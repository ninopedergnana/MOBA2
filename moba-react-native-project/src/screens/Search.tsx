import { useState } from 'react'
import { Button, StyleSheet, TextInput, View } from 'react-native'


export default function ({ navigation }: { navigation: any }) {
    const [search, setSearch] = useState('')

    const goToResult = () => navigation.navigate('Results', { search })

    return (
        <View style={ styles.container }>
            <TextInput style={ styles.textField } placeholder="Search" value={ search }
                       onChangeText={ v => setSearch(v) }></TextInput>
            <Button color="#111111" title="Search" onPress={ goToResult }></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        height: '100%',
    },
    textField: {
        borderRadius: 4,
        borderColor: '#111111',
        borderWidth: 2,
        padding: 4,
        marginVertical: 32,
        width: '40%',
    },
})