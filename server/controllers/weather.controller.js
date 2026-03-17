import { fetchWeatherApi } from "openmeteo";

const getWeatherIcon = (code) => {
  const map = {
    0: "clear-day",
    1: "mostly-clear-day",
    2: "partly-cloudy-day",
    3: "overcast",
    45: "fog",
    48: "fog",
    51: "drizzle",
    53: "drizzle",
    55: "drizzle",
    61: "rain",
    63: "rain",
    65: "rain",
    71: "snow",
    73: "snow",
    75: "snow",
    77: "snowflake",
    80: "rain",
    81: "rain",
    82: "rain",
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
      reason: "उपयुक्त तापमान र कम वर्षा",
    });
  }
  if (temp >= 20 && temp <= 30 && humidity > 60) {
    suggestions.push({
      crop: "टमाटर (Tomato)",
      reason: "राम्रो तापमान र आर्द्रता",
    });
  }
  if (temp >= 25 && temp <= 35 && rain > 2) {
    suggestions.push({ crop: "मकै (Maize)", reason: "गर्मी र वर्षाको मौसम" });
  }
  if (temp >= 10 && temp <= 20) {
    suggestions.push({
      crop: "फूलगोभी (Cauliflower)",
      reason: "चिसो मौसम उपयुक्त",
    });
  }
  if (temp >= 18 && temp <= 28 && humidity > 70) {
    suggestions.push({ crop: "अदुवा (Ginger)", reason: "उष्ण र आर्द्र मौसम" });
  }

  return suggestions.length > 0
    ? suggestions
    : [{ crop: "कुनै बाली नाइ", reason: "हालको मौसम खेतीको लागि उपयुक्त छैन" }];
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
    let { latitudeInput, longitudeInput } = req.body;

    // Validate inputs
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

    const params = {
      latitude: latitudeInput,
      longitude: longitudeInput,
      timezone: "Asia/Kathmandu", // ✅ Nepal timezone

      // Current weather variables (order matters for index!)
      current: [
        "temperature_2m", // index 0
        "precipitation", // index 1
        "rain", // index 2
        "soil_temperature_0cm", // index 3
        "soil_temperature_6cm", // index 4
        "soil_temperature_18cm", // index 5
        "weather_code", // index 6
        "relative_humidity_2m", // index 7
        "wind_speed_10m", // index 8
        "precipitation_probability", // index 9
      ],

      // Hourly forecast (next 7 days)
      hourly: [
        "temperature_2m", // index 0
        "rain", // index 1
        "soil_temperature_0cm", // index 2
        "soil_temperature_6cm", // index 3
        "soil_temperature_18cm", // index 4
        "weather_code", // index 5
        "precipitation_probability", // index 6
        "wind_speed_10m", // index 7
        "relative_humidity_2m", // index 8
      ],

      // Daily summary (next 7 days)
      daily: [
        "temperature_2m_max", // index 0
        "temperature_2m_min", // index 1
        "precipitation_sum", // index 2
        "precipitation_probability_max", // index 3
        "weather_code", // index 4
        "wind_speed_10m_max", // index 5
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
      // 🌤️ Icon & description (ready for frontend)
      icon: getWeatherIcon(currentWeatherCode),
      icon_url: `https://basmilius.github.io/weather-icons/production/fill/all/${getWeatherIcon(currentWeatherCode)}.svg`,
      description: getWeatherDescription(currentWeatherCode),
    };

    const hourlyLength =
      (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval();

    const hourlyTimes = Array.from(
      { length: hourlyLength },
      (_, i) =>
        new Date(
          (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
            1000,
        ),
    );

    const hourlyWeatherCodes = Array.from(hourly.variables(5).valuesArray());

    const hourlyData = {
      time: hourlyTimes,
      temperature_2m: Array.from(hourly.variables(0).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      rain: Array.from(hourly.variables(1).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      soil_temperature_0cm: Array.from(hourly.variables(2).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      soil_temperature_6cm: Array.from(hourly.variables(3).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      soil_temperature_18cm: Array.from(hourly.variables(4).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      weather_code: hourlyWeatherCodes,
      precipitation_probability: Array.from(
        hourly.variables(6).valuesArray(),
      ).map((v) => Math.round(v)),
      wind_speed_10m: Array.from(hourly.variables(7).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      relative_humidity_2m: Array.from(hourly.variables(8).valuesArray()).map(
        (v) => Math.round(v),
      ),
      // 🌤️ Icons for each hour
      icons: hourlyWeatherCodes.map((code) => getWeatherIcon(Math.round(code))),
      icon_urls: hourlyWeatherCodes.map(
        (code) =>
          `https://basmilius.github.io/weather-icons/production/fill/all/${getWeatherIcon(Math.round(code))}.svg`,
      ),
    };

    // ── Daily Weather ──
    const dailyLength =
      (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval();

    const dailyTimes = Array.from(
      { length: dailyLength },
      (_, i) =>
        new Date(
          (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
            1000,
        ),
    );

    const dailyWeatherCodes = Array.from(daily.variables(4).valuesArray());

    const dailyData = {
      time: dailyTimes,
      temperature_max: Array.from(daily.variables(0).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      temperature_min: Array.from(daily.variables(1).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      precipitation_sum: Array.from(daily.variables(2).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      precipitation_probability_max: Array.from(
        daily.variables(3).valuesArray(),
      ).map((v) => Math.round(v)),
      weather_code: dailyWeatherCodes,
      wind_speed_max: Array.from(daily.variables(5).valuesArray()).map(
        (v) => Math.round(v * 10) / 10,
      ),
      // 🌤️ Icons for each day
      icons: dailyWeatherCodes.map((code) => getWeatherIcon(Math.round(code))),
      icon_urls: dailyWeatherCodes.map(
        (code) =>
          `https://basmilius.github.io/weather-icons/production/fill/all/${getWeatherIcon(Math.round(code))}.svg`,
      ),
      descriptions: dailyWeatherCodes.map((code) =>
        getWeatherDescription(Math.round(code)),
      ),
    };

    // ── Farming Intelligence ──
    const farmingData = {
      crop_suggestions: getCropSuggestion(
        currentTemp,
        currentRain,
        currentHumidity,
      ),
      alerts: getFarmingAlert(currentRain, currentHumidity, currentWindSpeed),
    };

    // ── Final Response ──
    const weatherData = {
      location: {
        latitude,
        longitude,
        elevation,
        timezone: "Asia/Kathmandu",
      },
      current: currentData,
      hourly: hourlyData,
      daily: dailyData,
      farming: farmingData, // 🌾 Farming specific data
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
