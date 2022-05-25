import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import { weatherConditions } from '../constants/WeatherConditions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export interface Forecast {
  main: string;
  location: string;
  temp: number;
}

export interface Lonlat {
  lon: number;
  lat: number;
}

export interface WeatherType {
	title: string,
	subtitle: string,
	icon: string,
	color: string
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const [text, onChangeText] = useState('');
	const [forecast, setForecast] = useState<Forecast>({main: '', location: '',temp: 0})
	const [lonlat, setLonLat] = useState<Lonlat>({lon: 0, lat: 0,});
	const [weatherType, setWeatherType] = useState<WeatherType>({ title: "", subtitle: "", icon: "", color: "" })

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
    console.log(res.data.weather.main)
    forecast.main = "Generally: " + res.data.weather[0].main + " with " + res.data.weather[0].description
    forecast.temp = Math.round(res.data.main.temp - 272)
    //console.log(res.data.weather[0].main);

  }).catch(e => {
    console.log(e);
  })
}, [latlonUrl, cityUrl])

	useEffect(() => {
	axios.get(latlonUrl)
		.then(res => {
			setLonLat({lon: res.data[0].lon, lat: res.data[0].lat})
			forecast.location = res.data[0].name + ", " + res.data[0].country

		}).catch(e => {
			console.log(e);
		})
	axios.get(cityUrl)
	.then(res => {
		setWeatherType(weatherConditions[res.data.weather[0].main])
		forecast.main = weatherType.title + ". " + weatherType.subtitle
		forecast.temp = Math.round(res.data.main.temp - 272)
		console.log(weatherType.icon)
	}).catch(e => {
		console.log(e);
	})
	}, [latlonUrl, cityUrl])

	return (
		<View style={[styles.container, {backgroundColor: weatherType.color}]}>
		<Text style={styles.title}>Weather App</Text>
		<TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder={" Enter Location..."} />
		<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
		<MaterialCommunityIcons size={48} name={weatherType.icon} color={'black'} />
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
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
