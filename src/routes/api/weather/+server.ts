import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const EAST_LANSING = {
	latitude: 42.7360,
	longitude: -84.4839,
	timezone: 'America/Detroit',
	name: 'East Lansing, MI'
};

const WEATHER_CODE_LABELS: Record<number, string> = {
	0: 'Clear',
	1: 'Mainly clear',
	2: 'Partly cloudy',
	3: 'Overcast',
	45: 'Fog',
	48: 'Rime fog',
	51: 'Light drizzle',
	53: 'Moderate drizzle',
	55: 'Dense drizzle',
	56: 'Light freezing drizzle',
	57: 'Dense freezing drizzle',
	61: 'Light rain',
	63: 'Moderate rain',
	65: 'Heavy rain',
	66: 'Light freezing rain',
	67: 'Heavy freezing rain',
	71: 'Light snow',
	73: 'Moderate snow',
	75: 'Heavy snow',
	77: 'Snow grains',
	80: 'Light rain showers',
	81: 'Moderate rain showers',
	82: 'Heavy rain showers',
	85: 'Light snow showers',
	86: 'Heavy snow showers',
	95: 'Thunderstorm',
	96: 'Thunderstorm with light hail',
	99: 'Thunderstorm with heavy hail'
};

export const GET: RequestHandler = async ({ url, fetch }) => {
	const date = url.searchParams.get('date');

	if (!date) {
		return json({ error: 'Missing date parameter.' }, { status: 400 });
	}

	if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
		return json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, { status: 400 });
	}

	const params = new URLSearchParams({
		latitude: EAST_LANSING.latitude.toString(),
		longitude: EAST_LANSING.longitude.toString(),
		daily:
			'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean',
		temperature_unit: 'fahrenheit',
		timezone: EAST_LANSING.timezone
	});

	const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

	if (!response.ok) {
		return json({ error: 'Weather provider request failed.' }, { status: 502 });
	}

	const payload = await response.json();
	const daily = payload?.daily;
	const index = daily?.time?.indexOf?.(date);

	if (index === undefined || index < 0) {
		return json({ error: 'No forecast available for this date.' }, { status: 404 });
	}

	const weatherCode = daily.weathercode?.[index];

	return json({
		date,
		location: EAST_LANSING.name,
		summary: WEATHER_CODE_LABELS[weatherCode] ?? 'Unknown',
		weather_code: weatherCode ?? null,
		temperature_min: daily.temperature_2m_min?.[index] ?? null,
		temperature_max: daily.temperature_2m_max?.[index] ?? null,
		precipitation_probability: daily.precipitation_probability_mean?.[index] ?? null
	});
};
