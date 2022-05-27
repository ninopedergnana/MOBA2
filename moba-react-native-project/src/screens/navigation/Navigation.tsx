import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../Search'
import Result from '../Result'
import Detail from '../Detail'



const {Navigator, Screen} = createNativeStackNavigator();

export default function () {
    return (
        <Navigator>
            <Screen name="Home" component={ Search }/>
            <Screen name="Results" component={ Result }/>
            <Screen name="Details" component={ Detail }/>
        </Navigator>
    )
}