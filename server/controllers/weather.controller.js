import { fetchWeatherApi } from "openmeteo";
const getWeatherIcon = (code, rain) => {
  console.log("Mapping weather code to icon:", { code, rain });

  const map = {
    0: "clear-day",
    1: "clear-day",
    2: "partly-cloudy-day",
    3: "overcast",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "drizzle",
    55: "drizzle",
    61: "cloudy",
    63: "rain",
    65: "rain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snowflake",
    80: rain >= 0 ? "rain" : "cloudy",
    81: rain >= 0 ? "rain" : "cloudy",
    82: rain >= 0 ? "rain" : "cloudy",
    85: "snow",
    86: "snow",
    95: "thunderstorms",
    96: "thunderstorms-rain",
    99: "thunderstorms-rain",
  };

  return map[code] ?? "not-available";
};
const getWeatherDescription = (code) => {
  const map = {
    0: { en: "Clear Sky", np: "सफा आकाश" },
    1: { en: "Mainly Clear", np: "मुख्यतः सफा" },
    2: { en: "Partly Cloudy", np: "आंशिक बादल" },
    3: { en: "Overcast", np: "बादलयुक्त" },
    45: { en: "Foggy", np: "कुहिरो" },
    48: { en: "Icy Fog", np: "हिमयुक्त कुहिरो" },
    51: { en: "Light Drizzle", np: "हल्का झरी" },
    53: { en: "Moderate Drizzle", np: "मध्यम झरी" },
    55: { en: "Heavy Drizzle", np: "भारी झरी" },
    61: { en: "Light Rain", np: "हल्का वर्षा" },
    63: { en: "Moderate Rain", np: "मध्यम वर्षा" },
    65: { en: "Heavy Rain", np: "भारी वर्षा" },
    71: { en: "Light Snow", np: "हल्का हिमपात" },
    73: { en: "Moderate Snow", np: "मध्यम हिमपात" },
    75: { en: "Heavy Snow", np: "भारी हिमपात" },
    80: { en: "Rain Showers", np: "वर्षाको छिटा" },
    95: { en: "Thunderstorm", np: "गर्जन सहित वर्षा" },
    99: { en: "Heavy Thunderstorm", np: "भारी गर्जन सहित वर्षा" },
  };
  return map[code] ?? { en: "Unknown", np: "अज्ञात" };
};

const getCropSuggestion = (temp, rain, humidity) => {
  const suggestions = [];

  if (temp >= 15 && temp <= 25 && rain < 5) {
    suggestions.push({
      crop: "आलु (Potato)",
      emoji:"🥔",
      np: "उपयुक्त तापमान र कम वर्षा",
      en: "Suitable temperature and low rainfall",
    });
  }
  if (temp >= 20 && temp <= 30 && humidity > 60) {
    suggestions.push({
      crop: "टमाटर (Tomato)",
        emoji:"🍅",
      np: "राम्रो तापमान र आर्द्रता",
      en: "Good temperature and humidity",
    });
  }
  if (temp >= 25 && temp <= 35 && rain > 2) {
    suggestions.push({ crop: "मकै (Maize)", emoji:"🌽", np: "गर्मी र वर्षाको मौसम", en: "Hot and rainy weather" });
  }
  if (temp >= 10 && temp <= 20) {
    suggestions.push({
      crop: "फूलगोभी (Cauliflower)",
      emoji:"🥦",
      np: "चिसो मौसम उपयुक्त",
      en: "Cool weather suitable",
    });
  }
  if (temp >= 18 && temp <= 28 && humidity > 70) {
    suggestions.push({ crop: "अदुवा (Ginger)", emoji:"🫚", np: "उष्ण र आर्द्र मौसम", en: "Hot and humid weather" });
  }

  return suggestions.length > 0
    ? suggestions
    : [{ crop: "कुनै बाली नाइ", emoji:"❌", np: "हालको मौसम खेतीको लागि उपयुक्त छैन", en: "Current weather is not suitable for farming" }];
};

const getFarmingAlert = (rain, humidity, windSpeed) => {
  const alerts = [];
  if (rain > 10) {
    alerts.push({
      type: "warning",
      en: "Heavy rain expected. Avoid spraying fertilizers or pesticides.",
      np: "भारी वर्षाको सम्भावना। मल वा कीटनाशक छर्नु उचित छैन।",
    });
  }
  if (humidity > 85) {
    alerts.push({
      type: "warning",
      en: "High humidity. Watch for fungal diseases on crops.",
      np: "उच्च आर्द्रता। बालीमा ढुसी रोगको जोखिम बढेको छ।",
    });
  }
  if (windSpeed > 30) {
    alerts.push({
      type: "danger",
      en: "Strong winds. Secure young plants and greenhouses.",
      np: "तेज हावा। साना बिरुवा र ग्रिनहाउस सुरक्षित गर्नुहोस्।",
    });
  }
  if (alerts.length === 0) {
    alerts.push({
      type: "success",
      en: "Weather is suitable for farming today.",
      np: "आजको मौसम खेतीको लागि उपयुक्त छ।",
    });
  }

  return alerts;
};

export const getMyWeather = async (req, res) => {
  try {
    console.log("Received request for getMyWeather with body:", req.body);
    let { latitudeInput, longitudeInput } = req.body;

    // ───────────────
    // Validate inputs
    // ───────────────
    if (!latitudeInput || !longitudeInput) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    latitudeInput = parseFloat(latitudeInput);
    longitudeInput = parseFloat(longitudeInput);

    if (isNaN(latitudeInput) || isNaN(longitudeInput)) {
      return res.status(400).json({
        success: false,
        message: "Invalid latitude or longitude",
      });
    }

    // ───────────────
    // Reverse Geocoding (Geoapify)
    // ───────────────
    const geoRes = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitudeInput}&lon=${longitudeInput}&apiKey=62ac9a6bb8784edfadd94df3c5d09037`
    );
    const geo = await geoRes.json();
    console.log("Geoapify response:", geo.features?.[0]?.properties);

    // ───────────────
    // Open-Meteo Weather Fetch
    // ───────────────
    const params = {
      latitude: latitudeInput,
      longitude: longitudeInput,
      timezone: "Asia/Kathmandu",
      current: [
        "temperature_2m",
        "precipitation",
        "rain",
        "soil_temperature_0cm",
        "soil_temperature_6cm",
        "soil_temperature_18cm",
        "weather_code",
        "relative_humidity_2m",
        "wind_speed_10m",
        "precipitation_probability",
      ],
      hourly: [
        "temperature_2m",
        "rain",
        "soil_temperature_0cm",
        "soil_temperature_6cm",
        "soil_temperature_18cm",
        "weather_code",
        "precipitation_probability",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_probability_max",
        "weather_code",
        "wind_speed_10m_max",
      ],
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();
    const hourly = response.hourly();
    const daily = response.daily();

    // ───────────────
    // Current Weather
    // ───────────────
    const currentWeatherCode = Math.round(current.variables(6).value());
    const currentTemp = Math.round(current.variables(0).value() * 10) / 10;
    const currentRain = Math.round(current.variables(2).value() * 10) / 10;
    const currentHumidity = Math.round(current.variables(7).value());
    const currentWindSpeed = Math.round(current.variables(8).value() * 10) / 10;

    const currentData = {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: currentTemp,
      precipitation: Math.round(current.variables(1).value() * 10) / 10,
      rain: currentRain,
      soil_temperature_0cm: Math.round(current.variables(3).value() * 10) / 10,
      soil_temperature_6cm: Math.round(current.variables(4).value() * 10) / 10,
      soil_temperature_18cm: Math.round(current.variables(5).value() * 10) / 10,
      weather_code: currentWeatherCode,
      relative_humidity_2m: currentHumidity,
      wind_speed_10m: currentWindSpeed,
      precipitation_probability: Math.round(current.variables(9).value()),
      icon: getWeatherIcon(currentWeatherCode, currentRain),
      icon_url: `https://basmilius.github.io/weather-icons/production/fill/all/${getWeatherIcon(currentWeatherCode, currentRain)}.svg`,
      description: getWeatherDescription(currentWeatherCode),
    };

    // ───────────────
    // Hourly Weather (Filtered for Today Only)
    // ───────────────
    const hourlyLength =
      (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval();

    const hourlyTimes = Array.from({ length: hourlyLength }, (_, i) =>
      new Date(
        (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
          1000
      )
    );

    const hourlyWeatherCodes = Array.from(hourly.variables(5).valuesArray());

    // Target date = today
    const targetDate = new Date().toISOString().split("T")[0];

    const filteredIndexes = hourlyTimes
      .map((time, index) => ({ time, index }))
      .filter(({ time }) => time.toISOString().startsWith(targetDate))
      .map(({ index }) => index);

   const rainArray = filteredIndexes.map(
  (i) => Math.round(hourly.variables(1).valuesArray()[i] * 10) / 10
);

const hourlyData = {
  time: filteredIndexes.map((i) => hourlyTimes[i]),

  temperature_2m: filteredIndexes.map(
    (i) => Math.round(hourly.variables(0).valuesArray()[i] * 10) / 10
  ),

  rain: rainArray,

  soil_temperature_0cm: filteredIndexes.map(
    (i) => Math.round(hourly.variables(2).valuesArray()[i] * 10) / 10
  ),
  soil_temperature_6cm: filteredIndexes.map(
    (i) => Math.round(hourly.variables(3).valuesArray()[i] * 10) / 10
  ),
  soil_temperature_18cm: filteredIndexes.map(
    (i) => Math.round(hourly.variables(4).valuesArray()[i] * 10) / 10
  ),

  weather_code: filteredIndexes.map((i) => hourlyWeatherCodes[i]),

  precipitation_probability: filteredIndexes.map((i) =>
    Math.round(hourly.variables(6).valuesArray()[i])
  ),

  wind_speed_10m: filteredIndexes.map(
    (i) => Math.round(hourly.variables(7).valuesArray()[i] * 10) / 10
  ),

  relative_humidity_2m: filteredIndexes.map((i) =>
    Math.round(hourly.variables(8).valuesArray()[i])
  ),

 icons: filteredIndexes.map((i, idx) =>
  getWeatherIcon(
    Math.round(hourlyWeatherCodes[i]),
    rainArray[idx]
  )
),

 icon_urls: filteredIndexes.map(
  (i, idx) =>
    `https://basmilius.github.io/weather-icons/production/fill/all/${getWeatherIcon(
      Math.round(hourlyWeatherCodes[i]),
      rainArray[idx]   // ✅ correct rain per hour
    )}.svg`
),
};

    // ───────────────
    // Daily Weather
    // ───────────────
    const dailyLength =
      (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval();

    const dailyTimes = Array.from({ length: dailyLength }, (_, i) =>
      new Date(
        (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000
      )
    );

    const dailyWeatherCodes = Array.from(daily.variables(4).valuesArray());

    const dailyData = {
      time: dailyTimes,
      temperature_max: Array.from(daily.variables(0).valuesArray()).map(
        (v) => Math.round(v * 10) / 10
      ),
      temperature_min: Array.from(daily.variables(1).valuesArray()).map(
        (v) => Math.round(v * 10) / 10
      ),
      precipitation_sum: Array.from(daily.variables(2).valuesArray()).map(
        (v) => Math.round(v * 10) / 10
      ),
      precipitation_probability_max: Array.from(
        daily.variables(3).valuesArray()
      ).map((v) => Math.round(v)),
      weather_code: dailyWeatherCodes,
      wind_speed_max: Array.from(daily.variables(5).valuesArray()).map(
        (v) => Math.round(v * 10) / 10
      ),
      icons: dailyWeatherCodes.map((code) => getWeatherIcon(Math.round(code))),
      icon_urls: dailyWeatherCodes.map(
        (code) =>
          `https://basmilius.github.io/weather-icons/production/fill/all/${getWeatherIcon(Math.round(code))}.svg`
      ),
      descriptions: dailyWeatherCodes.map((code) =>
        getWeatherDescription(Math.round(code))
      ),
    };

    // ───────────────
    // Farming Intelligence
    // ───────────────
    const farmingData = {
      crop_suggestions: getCropSuggestion(
        currentTemp,
        currentRain,
        currentHumidity
      ),
      alerts: getFarmingAlert(currentRain, currentHumidity, currentWindSpeed),
    };

    // ───────────────
    // Final Response
    // ───────────────
    const weatherData = {
      location: {
        latitude,
        longitude,
        elevation,
        timezone: "Asia/Kathmandu",
        country: geo.features?.[0]?.properties?.country || "Unknown Country",
        city:
          geo.features?.[0]?.properties?.city ||
          geo.features?.[0]?.properties?.town ||
          geo.features?.[0]?.properties?.village ||
          "Unknown City",
         formated_address: geo.features?.[0]?.properties?.formatted || "Unknown Location",

      },
      current: currentData,
      hourly: hourlyData,
      daily: dailyData,
      farming: farmingData,
    };

    return res.status(200).json({ success: true, data: weatherData });
  } catch (error) {
    console.error("Error in getMyWeather:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
