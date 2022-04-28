import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { weatherConditions } from '../constants/WeatherConditions';

export interface Forecast {
  main: String;
  location: String;
  country: String;
  temp: number;
}

export interface Lonlat {
  lon: number;
  lat: number;
}

const initLonLat: Lonlat = {
  lon: 0,
  lat: 0,
}

const initForecast: Forecast ={
  main: "",
  location: "",
  country: "",
  temp: 0,
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
const [text, onChangeText] = useState('');
const [forecast, setForecast] = useState<Forecast>(initForecast)
const [lonlat, setLonLat] = useState<Lonlat>(initLonLat);

const latlonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=1&appid=82899956a4b3c21ea1f16a30c3eed6c0`
const cityUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lonlat.lat}&lon=${lonlat.lon}&appid=82899956a4b3c21ea1f16a30c3eed6c0`
useEffect(() => {  
  axios.get(latlonUrl)
      .then(res => {
        setLonLat({lon: res.data[0].lon, lat: res.data[0].lat})
        forecast.location = res.data[0].name
        forecast.country = res.data[0].country
      }).catch(e => {
        console.log(e);
      })
  axios.get(cityUrl)
  .then(res => {
      forecast.main = "Generally: " + res.data.weather[0].main + " with " + res.data.weather[0].description
      forecast.temp = Math.round(res.data.main.temp - 272)
      //console.log(res.data.weather[0].main);
      
  }).catch(e => {
    console.log(e);
  })
}, [latlonUrl, cityUrl])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder={" Enter Location..."} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.subtitle}>Weather Description</Text>
      <Text>{forecast.main}</Text>
      <Text style={styles.subtitle}>Temperature</Text>
      <Text>{forecast.temp}°C</Text>
      <Text style={styles.subtitle}>Location</Text>
      <Text>{forecast.location + ", " + forecast.country}</Text>
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
