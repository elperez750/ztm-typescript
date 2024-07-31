const SAMPLE_API_RESPONSE = {
  latitude: 36.16438,
  longitude: -115.143936,
  generationtime_ms: 0.23496150970458984,
  utc_offset_seconds: 0,
  timezone: 'GMT',
  timezone_abbreviation: 'GMT',
  elevation: 620,
  current_weather: {
    temperature: 30.7,
    windspeed: 15.3,
    winddirection: 27, 
    weathercode: 0,
    is_day: 1,
    time: '2023-05-13T18:00'
  },
  hourly_units: { time: 'iso8601', temperature_2m: '°C' },
  hourly: {
    time: [
      '2023-05-13T00:00', '2023-05-13T01:00',
      '2023-05-13T02:00', '2023-05-13T03:00',
      '2023-05-13T04:00', '2023-05-13T05:00',
      '2023-05-13T06:00', '2023-05-13T07:00',
      '2023-05-13T08:00', '2023-05-13T09:00',
      '2023-05-13T10:00', '2023-05-13T11:00',
      '2023-05-13T12:00', '2023-05-13T13:00',
      '2023-05-13T14:00', '2023-05-13T15:00',
      '2023-05-13T16:00', '2023-05-13T17:00',
      '2023-05-13T18:00', '2023-05-13T19:00',
      '2023-05-13T20:00', '2023-05-13T21:00',
      '2023-05-13T22:00', '2023-05-13T23:00'
    ],
    temperature_2m: [
      32.5, 32.1, 30.9, 28.7, 27.4,
      26.4, 26, 26.1, 26, 24.7,
      24.2, 23.8, 24, 23.3, 24.1,
      25.7, 27.2, 28.6, 30.7, 31.6,
      32.3, 33.4, 33.5, 33.5
    ]
  }
}
