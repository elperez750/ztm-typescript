import { fetchLocationData } from "./location";
import type { LocationInfo } from "./location";
import { fetchWeatherData } from "./weatherapi";

const GEOCODE_API_URL = "https://geocode.maps.co/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const API_KEY = "6682f13e10924986914039syu03716d";

async function main(): Promise<number> {
    //npm run weather Location
    if (process.argv.length !== 3) {
        console.error("usage: weather Location");
        return 1;
    }

    //get location
    const location = process.argv[2];

    let locationInfo: LocationInfo;

    try{ 
        locationInfo = await fetchLocationData(GEOCODE_API_URL, location, API_KEY);
    } catch (err) {
        console.error(err);
        return 1;
    }

    console.log(`Fetching weather data for ${locationInfo.display_name}...\n`)    
    try{
        const weather = await fetchWeatherData(
            WEATHER_API_URL, locationInfo.lat, locationInfo.lon)

            console.log(weather.format())
    }
    catch(err){
        console.error(err);
        return 1;

    }
    return await Promise.resolve(0);

}

main().catch((error) => console.error(error));