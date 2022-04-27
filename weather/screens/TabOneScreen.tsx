import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';

export interface Forecast {
  main: String;
  location: String;
  temp: number;
}

const initForecast: Forecast ={
  main: "",
  location: "",
  temp: 0,
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
const [text, onChangeText] = useState('London');
const [forecast, setForecast] = useState<Forecast>(initForecast)
const [lat, setLat] = useState<number>(0);
const [lon, setLon] = useState<number>(0);

const latlonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=1&appid=82899956a4b3c21ea1f16a30c3eed6c0`
const cityUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&appid=82899956a4b3c21ea1f16a30c3eed6c0`
useEffect(() => {  
  axios.get(latlonUrl)
      .then(res => {
        setLat(res.data[0].lat)
        setLon(res.data[0].lon)
        forecast.location = res.data[0].name
      })
  axios.get(cityUrl)
  .then(res => {
      forecast.main = "Generally: " + res.data.weather[0].main + " with " + res.data.weather[0].description
      forecast.temp = Math.round(res.data.main.temp - 272)
      //console.log(res.data.weather[0].main);
      
  })
}, [latlonUrl, cityUrl])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder={" Enter Location..."} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.subtitle}>Weather Description</Text>
      <Text>{forecast.main}</Text>
      <Text style={styles.subtitle}>Temperature</Text>
      <Text>{forecast.temp}°C</Text>
      <Text style={styles.subtitle}>Location</Text>
      <Text>{forecast.location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    width: 200,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },   
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },  
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
