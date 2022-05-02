export interface WeatherDescription {
	color: string
	title: string,
	subtitle: string,
	icon: string
}

export interface WeatherDescriptionRecords {
	[name: string] : WeatherDescription
}

export const weatherConditions: WeatherDescriptionRecords = {
	Rain: {
		color: '#72a0e8',
		title: 'Raining',
		subtitle: 'Get a cup of coffee',
		icon: 'weather-rainy'
	},
	Clear: {
		color: '#f7b733',
		title: 'So Sunny',
		subtitle: 'It is hurting my eyes',
		icon: 'weather-sunny'
	},
	Thunderstorm: {
		color: '#616161',
		title: 'A Storm is coming',
		subtitle: 'Because Gods are angry',
		icon: 'weather-lightning'
	},
	Clouds: {
		color: '#8379ad',
		title: 'Clouds',
		subtitle: 'Everywhere',
		icon: 'weather-cloudy'
	},
	Snow: {
		color: '#00d2ff',
		title: 'Snow',
		subtitle: 'Get out and build a snowman for me',
		icon: 'weather-snowy'
	},
	Drizzle: {
		color: '#1e7896',
		title: 'Drizzle',
		subtitle: 'Partially raining...',
		icon: 'weather-hail'
	},
	Haze: {
		color: '#66A6FF',
		title: 'Haze',
		subtitle: 'Another name for Partial Raining',
		icon: 'weather-hail'
	},
	Mist: {
		color: '#3CD3AD',
		title: 'Mist',
		subtitle: "Don't roam in forests!",
		icon: 'weather-fog'
	}
}