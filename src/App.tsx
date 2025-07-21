import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Alert, AlertDescription } from './components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Progress } from './components/ui/progress'
import { 
  Search, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Sunrise, 
  Sunset,
  CloudRain,
  Sun,
  Cloud,
  CloudSnow,
  Zap,
  AlertTriangle,
  Sprout,
  Wheat,
  Calendar,
  RefreshCw,
  Satellite,
  TrendingUp,
  BarChart3,
  Clock,
  Moon,
  Gauge,
  Compass
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'
import { format, addDays, startOfWeek, addWeeks } from 'date-fns'
import { blink } from './blink/client'

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
      code: number
    }
    humidity: number
    wind_kph: number
    wind_dir: string
    pressure_mb: number
    vis_km: number
    uv: number
    feelslike_c: number
    cloud: number
    gust_kph: number
    precip_mm: number
    last_updated: string
  }
  forecast: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        avgtemp_c: number
        condition: {
          text: string
          icon: string
          code: number
        }
        daily_chance_of_rain: number
        avghumidity: number
        maxwind_kph: number
        uv: number
        totalprecip_mm: number
      }
      astro: {
        sunrise: string
        sunset: string
        moonrise: string
        moonset: string
        moon_phase: string
        moon_illumination: string
      }
      hour: Array<{
        time: string
        temp_c: number
        humidity: number
        wind_kph: number
        precip_mm: number
        condition: {
          text: string
          code: number
        }
      }>
    }>
  }
}

// Enhanced demo weather data
const demoWeatherData: WeatherData = {
  location: {
    name: 'Delhi',
    region: 'Delhi',
    country: 'India',
    lat: 28.67,
    lon: 77.22
  },
  current: {
    temp_c: 28,
    temp_f: 82,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003
    },
    humidity: 65,
    wind_kph: 12,
    wind_dir: 'NW',
    pressure_mb: 1013,
    vis_km: 10,
    uv: 6,
    feelslike_c: 31,
    cloud: 40,
    gust_kph: 18,
    precip_mm: 0,
    last_updated: new Date().toISOString()
  },
  forecast: {
    forecastday: [
      {
        date: format(new Date(), 'yyyy-MM-dd'),
        day: {
          maxtemp_c: 30,
          mintemp_c: 18,
          avgtemp_c: 24,
          condition: {
            text: 'Sunny',
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            code: 1000
          },
          daily_chance_of_rain: 10,
          avghumidity: 60,
          maxwind_kph: 15,
          uv: 7,
          totalprecip_mm: 0
        },
        astro: {
          sunrise: '07:12 AM',
          sunset: '05:47 PM',
          moonrise: '08:30 PM',
          moonset: '09:15 AM',
          moon_phase: 'Waxing Crescent',
          moon_illumination: '25'
        },
        hour: Array.from({ length: 24 }, (_, i) => ({
          time: `${format(new Date(), 'yyyy-MM-dd')} ${i.toString().padStart(2, '0')}:00`,
          temp_c: 18 + Math.sin((i - 6) * Math.PI / 12) * 8 + Math.random() * 2,
          humidity: 60 + Math.sin((i - 12) * Math.PI / 12) * 15 + Math.random() * 5,
          wind_kph: 10 + Math.random() * 8,
          precip_mm: i > 14 && i < 18 ? Math.random() * 2 : 0,
          condition: { text: i > 6 && i < 18 ? 'Sunny' : 'Clear', code: i > 6 && i < 18 ? 1000 : 1000 }
        }))
      },
      {
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        day: {
          maxtemp_c: 32,
          mintemp_c: 20,
          avgtemp_c: 26,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003
          },
          daily_chance_of_rain: 20,
          avghumidity: 58,
          maxwind_kph: 18,
          uv: 8,
          totalprecip_mm: 0.5
        },
        astro: {
          sunrise: '07:11 AM',
          sunset: '05:48 PM',
          moonrise: '09:15 PM',
          moonset: '10:00 AM',
          moon_phase: 'Waxing Crescent',
          moon_illumination: '32'
        },
        hour: []
      },
      {
        date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        day: {
          maxtemp_c: 29,
          mintemp_c: 19,
          avgtemp_c: 24,
          condition: {
            text: 'Light rain',
            icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
            code: 1183
          },
          daily_chance_of_rain: 80,
          avghumidity: 75,
          maxwind_kph: 22,
          uv: 5,
          totalprecip_mm: 8.5
        },
        astro: {
          sunrise: '07:10 AM',
          sunset: '05:49 PM',
          moonrise: '10:00 PM',
          moonset: '10:45 AM',
          moon_phase: 'First Quarter',
          moon_illumination: '50'
        },
        hour: []
      }
    ]
  }
}

// Crop calendar data
const cropCalendar = {
  en: {
    title: 'Crop Calendar',
    rabi: {
      name: 'Rabi Season (Winter)',
      period: 'October - March',
      crops: [
        { name: 'Wheat', sowing: 'Nov-Dec', harvesting: 'Mar-Apr', icon: '🌾' },
        { name: 'Barley', sowing: 'Nov-Dec', harvesting: 'Mar-Apr', icon: '🌾' },
        { name: 'Mustard', sowing: 'Oct-Nov', harvesting: 'Feb-Mar', icon: '🌻' },
        { name: 'Peas', sowing: 'Oct-Nov', harvesting: 'Feb-Mar', icon: '🟢' }
      ]
    },
    kharif: {
      name: 'Kharif Season (Monsoon)',
      period: 'June - October',
      crops: [
        { name: 'Rice', sowing: 'Jun-Jul', harvesting: 'Oct-Nov', icon: '🌾' },
        { name: 'Cotton', sowing: 'May-Jun', harvesting: 'Oct-Dec', icon: '🤍' },
        { name: 'Sugarcane', sowing: 'Feb-Mar', harvesting: 'Dec-Mar', icon: '🎋' },
        { name: 'Maize', sowing: 'Jun-Jul', harvesting: 'Sep-Oct', icon: '🌽' }
      ]
    }
  },
  hi: {
    title: 'फसल कैलेंडर',
    rabi: {
      name: 'रबी सीजन (शीतकालीन)',
      period: 'अक्टूबर - मार्च',
      crops: [
        { name: 'गेहूं', sowing: 'नव-दिस', harvesting: 'मार-अप्र', icon: '🌾' },
        { name: 'जौ', sowing: 'नव-दिस', harvesting: 'मार-अप्र', icon: '🌾' },
        { name: 'सरसों', sowing: 'अक्ट-नव', harvesting: 'फर-मार', icon: '🌻' },
        { name: 'मटर', sowing: 'अक्ट-नव', harvesting: 'फर-मार', icon: '🟢' }
      ]
    },
    kharif: {
      name: 'खरीफ सीजन (मानसून)',
      period: 'जून - अक्टूबर',
      crops: [
        { name: 'चावल', sowing: 'जून-जुल', harvesting: 'अक्ट-नव', icon: '🌾' },
        { name: 'कपास', sowing: 'मई-जून', harvesting: 'अक्ट-दिस', icon: '🤍' },
        { name: 'गन्ना', sowing: 'फर-मार', harvesting: 'दिस-मार', icon: '🎋' },
        { name: 'मक्का', sowing: 'जून-जुल', harvesting: 'सित-अक्ट', icon: '🌽' }
      ]
    }
  }
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const translations = {
    en: {
      title: 'Bharat Kisan Weather App',
      subtitle: 'Advanced weather insights for Indian farmers',
      searchPlaceholder: 'Search for your city...',
      search: 'Search',
      refresh: 'Refresh',
      currentWeather: 'Current Weather',
      forecast: 'Weather Forecast',
      alerts: 'Agricultural Alerts',
      tips: 'Farming Tips',
      charts: 'Weather Charts',
      calendar: 'Crop Calendar',
      satellite: 'Satellite View',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      pressure: 'Pressure',
      visibility: 'Visibility',
      uvIndex: 'UV Index',
      cloudCover: 'Cloud Cover',
      windGust: 'Wind Gust',
      precipitation: 'Precipitation',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      moonPhase: 'Moon Phase',
      moonIllumination: 'Moon Illumination',
      rainChance: 'Rain Chance',
      maxWind: 'Max Wind',
      language: 'Language',
      lastUpdated: 'Last updated',
      coordinates: 'Coordinates',
      hourlyForecast: 'Hourly Forecast',
      temperatureTrend: 'Temperature Trend',
      humidityTrend: 'Humidity Trend',
      windTrend: 'Wind Speed Trend',
      precipitationChart: 'Precipitation Forecast'
    },
    hi: {
      title: 'भारत किसान मौसम ऐप',
      subtitle: 'भारतीय किसानों के लिए उन्नत मौसम जानकारी',
      searchPlaceholder: 'अपना शहर खोजें...',
      search: 'खोजें',
      refresh: 'रीफ्रेश',
      currentWeather: 'वर्तमान मौसम',
      forecast: 'मौसम पूर्वानुमान',
      alerts: 'कृषि चेतावनी',
      tips: 'खेती के सुझाव',
      charts: 'मौसम चार्ट',
      calendar: 'फसल कैलेंडर',
      satellite: 'सैटेलाइट दृश्य',
      feelsLike: 'महसूस होता है',
      humidity: 'नमी',
      windSpeed: 'हवा की गति',
      pressure: 'दबाव',
      visibility: 'दृश्यता',
      uvIndex: 'यूवी सूचकांक',
      cloudCover: 'बादल कवर',
      windGust: 'हवा का झोंका',
      precipitation: 'वर्षा',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      moonPhase: 'चांद की कला',
      moonIllumination: 'चांद की रोशनी',
      rainChance: 'बारिश की संभावना',
      maxWind: 'अधिकतम हवा',
      language: 'भाषा',
      lastUpdated: 'अंतिम अपडेट',
      coordinates: 'निर्देशांक',
      hourlyForecast: 'घंटेवार पूर्वानुमान',
      temperatureTrend: 'तापमान रुझान',
      humidityTrend: 'नमी रुझान',
      windTrend: 'हवा की गति रुझान',
      precipitationChart: 'वर्षा पूर्वानुमान'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // Load demo data on initial load
    setWeatherData(demoWeatherData)
    setLastUpdated(new Date())
  }, [])

  const fetchWeatherData = async (query: string) => {
    try {
      // Try to fetch real weather data using Blink SDK
      const response = await blink.data.fetch({
        url: `https://api.weatherapi.com/v1/forecast.json`,
        query: {
          key: '{{WEATHER_API_KEY}}',
          q: query,
          days: 3,
          aqi: 'no',
          alerts: 'no',
          hour: 24
        }
      })
      
      if (response.status === 200) {
        return response.body
      }
    } catch (error) {
      console.log('Using demo data - API key not configured')
    }
    
    // Fallback to demo data
    const cityData = { ...demoWeatherData }
    cityData.location.name = query
    return cityData
  }

  const searchWeather = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      const data = await fetchWeatherData(searchQuery)
      setWeatherData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching weather:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshWeather = async () => {
    if (!weatherData) return
    
    setLoading(true)
    try {
      const data = await fetchWeatherData(weatherData.location.name)
      setWeatherData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error refreshing weather:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition: string | number) => {
    const code = typeof condition === 'string' ? condition.toLowerCase() : condition
    
    if (typeof code === 'string') {
      if (code.includes('rain')) return <CloudRain className="h-8 w-8 text-blue-500" />
      if (code.includes('cloud')) return <Cloud className="h-8 w-8 text-gray-500" />
      if (code.includes('snow')) return <CloudSnow className="h-8 w-8 text-blue-300" />
      if (code.includes('thunder')) return <Zap className="h-8 w-8 text-yellow-500" />
      return <Sun className="h-8 w-8 text-yellow-500" />
    }
    
    // Weather condition codes
    if (code === 1000) return <Sun className="h-8 w-8 text-yellow-500" />
    if ([1003, 1006, 1009].includes(code)) return <Cloud className="h-8 w-8 text-gray-500" />
    if ([1063, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246].includes(code)) return <CloudRain className="h-8 w-8 text-blue-500" />
    if ([1066, 1069, 1072, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264].includes(code)) return <CloudSnow className="h-8 w-8 text-blue-300" />
    if ([1087, 1273, 1276, 1279, 1282].includes(code)) return <Zap className="h-8 w-8 text-yellow-500" />
    
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  const getUVBadgeColor = (uv: number) => {
    if (uv <= 2) return 'bg-green-500'
    if (uv <= 5) return 'bg-yellow-500'
    if (uv <= 7) return 'bg-orange-500'
    if (uv <= 10) return 'bg-red-500'
    return 'bg-purple-500'
  }

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return language === 'en' ? 'Low' : 'कम'
    if (uv <= 5) return language === 'en' ? 'Moderate' : 'मध्यम'
    if (uv <= 7) return language === 'en' ? 'High' : 'उच्च'
    if (uv <= 10) return language === 'en' ? 'Very High' : 'बहुत उच्च'
    return language === 'en' ? 'Extreme' : 'अत्यधिक'
  }

  const getAgriculturalTips = () => {
    if (!weatherData) return []
    
    const tips = []
    const temp = weatherData.current.temp_c
    const humidity = weatherData.current.humidity
    const windSpeed = weatherData.current.wind_kph
    const uv = weatherData.current.uv
    const precipitation = weatherData.current.precip_mm
    
    if (temp > 35) {
      tips.push({
        type: 'warning',
        message: language === 'en' 
          ? `High temperature alert (${temp}°C)! Increase irrigation frequency and provide shade for livestock.`
          : `उच्च तापमान चेतावनी (${temp}°C)! सिंचाई की आवृत्ति बढ़ाएं और पशुओं के लिए छाया प्रदान करें।`
      })
    }
    
    if (humidity > 80) {
      tips.push({
        type: 'info',
        message: language === 'en'
          ? `High humidity detected (${humidity}%). Monitor crops for fungal diseases and ensure proper ventilation.`
          : `उच्च आर्द्रता का पता चला (${humidity}%)। फंगल रोगों के लिए फसलों की निगरानी करें और उचित वेंटिलेशन सुनिश्चित करें।`
      })
    }
    
    if (windSpeed > 20) {
      tips.push({
        type: 'warning',
        message: language === 'en'
          ? `Strong winds expected (${windSpeed} km/h). Avoid spraying pesticides and secure loose farm equipment.`
          : `तेज हवाओं की उम्मीद (${windSpeed} km/h)। कीटनाशकों का छिड़काव न करें और ढीले कृषि उपकरणों को सुरक्षित करें।`
      })
    }
    
    if (uv > 8) {
      tips.push({
        type: 'warning',
        message: language === 'en'
          ? `Very high UV index (${uv}). Protect farm workers with proper clothing and schedule outdoor work for early morning or evening.`
          : `बहुत उच्च यूवी सूचकांक (${uv})। खेत मजदूरों को उचित कपड़ों से सुरक्षित करें और बाहरी काम सुबह जल्दी या शाम को करें।`
      })
    }
    
    if (precipitation > 5) {
      tips.push({
        type: 'info',
        message: language === 'en'
          ? `Significant rainfall detected (${precipitation}mm). Check field drainage and postpone harvesting if needed.`
          : `महत्वपूर्ण वर्षा का पता चला (${precipitation}mm)। खेत की जल निकासी जांचें और यदि आवश्यक हो तो कटाई स्थगित करें।`
      })
    }
    
    // Check for rain in forecast
    const rainExpected = weatherData.forecast.forecastday.some(day => day.day.daily_chance_of_rain > 60)
    if (rainExpected) {
      tips.push({
        type: 'success',
        message: language === 'en'
          ? 'Rain expected in coming days. Good time for sowing and transplanting activities.'
          : 'आने वाले दिनों में बारिश की उम्मीद। बुआई और रोपाई गतिविधियों के लिए अच्छा समय।'
      })
    }
    
    return tips
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Prepare chart data
  const hourlyData = weatherData?.forecast.forecastday[0]?.hour.slice(0, 12).map(hour => ({
    time: formatTime(hour.time),
    temperature: Math.round(hour.temp_c),
    humidity: hour.humidity,
    wind: Math.round(hour.wind_kph),
    precipitation: hour.precip_mm
  })) || []

  const forecastData = weatherData?.forecast.forecastday.map(day => ({
    date: formatDate(day.date),
    maxTemp: day.day.maxtemp_c,
    minTemp: day.day.mintemp_c,
    avgTemp: day.day.avgtemp_c,
    humidity: day.day.avghumidity,
    precipitation: day.day.totalprecip_mm,
    rainChance: day.day.daily_chance_of_rain
  })) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary rounded-lg p-2">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-xs text-gray-500 flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{t.lastUpdated}: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={refreshWeather}
                disabled={loading}
                className="text-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                {t.refresh}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="text-sm"
              >
                {t.language}: {language === 'en' ? 'English' : 'हिंदी'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Search Section */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchWeather()}
                  className="pl-10 border-green-300 focus:border-green-500"
                />
              </div>
              <Button 
                onClick={searchWeather} 
                disabled={loading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading ? 'Searching...' : t.search}
              </Button>
            </div>
          </CardContent>
        </Card>

        {weatherData && (
          <>
            {/* Current Weather */}
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{weatherData.location.name}, {weatherData.location.region}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                    <Compass className="h-4 w-4" />
                    <span>{t.coordinates}: {weatherData.location.lat.toFixed(2)}, {weatherData.location.lon.toFixed(2)}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Main Weather Info */}
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      {getWeatherIcon(weatherData.current.condition.code)}
                      <p className="text-sm text-gray-600 mt-2">{weatherData.current.condition.text}</p>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-gray-900">
                        {Math.round(weatherData.current.temp_c)}°C
                      </div>
                      <p className="text-gray-600">
                        {t.feelsLike} {Math.round(weatherData.current.feelslike_c)}°C
                      </p>
                    </div>
                  </div>

                  {/* Weather Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600">{t.humidity}</span>
                        </div>
                        <span className="font-semibold">{weatherData.current.humidity}%</span>
                      </div>
                      <Progress value={weatherData.current.humidity} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Cloud className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{t.cloudCover}</span>
                        </div>
                        <span className="font-semibold">{weatherData.current.cloud}%</span>
                      </div>
                      <Progress value={weatherData.current.cloud} className="h-2" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.windSpeed}</p>
                        <p className="font-semibold">{weatherData.current.wind_kph} km/h {weatherData.current.wind_dir}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Gauge className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.windGust}</p>
                        <p className="font-semibold">{weatherData.current.gust_kph} km/h</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.pressure}</p>
                        <p className="font-semibold">{weatherData.current.pressure_mb} mb</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.visibility}</p>
                        <p className="font-semibold">{weatherData.current.vis_km} km</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.uvIndex}</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{weatherData.current.uv}</span>
                          <Badge className={`text-white text-xs ${getUVBadgeColor(weatherData.current.uv)}`}>
                            {getUVLevel(weatherData.current.uv)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.precipitation}</p>
                        <p className="font-semibold">{weatherData.current.precip_mm} mm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Astronomical Data */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-center space-x-8 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Sunrise className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.sunrise}</p>
                        <p className="font-semibold">{weatherData.forecast.forecastday[0]?.astro.sunrise}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sunset className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">{t.sunset}</p>
                        <p className="font-semibold">{weatherData.forecast.forecastday[0]?.astro.sunset}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-8 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">{t.moonPhase}</p>
                        <p className="font-semibold">{weatherData.forecast.forecastday[0]?.astro.moon_phase}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">%</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t.moonIllumination}</p>
                        <p className="font-semibold">{weatherData.forecast.forecastday[0]?.astro.moon_illumination}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Tabs */}
            <Tabs defaultValue="forecast" className="space-y-4">
              <TabsList className="grid w-full grid-cols-6 bg-white/90 border border-green-200">
                <TabsTrigger value="forecast" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.forecast}
                </TabsTrigger>
                <TabsTrigger value="charts" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.charts}
                </TabsTrigger>
                <TabsTrigger value="alerts" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.alerts}
                </TabsTrigger>
                <TabsTrigger value="tips" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.tips}
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.calendar}
                </TabsTrigger>
                <TabsTrigger value="satellite" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.satellite}
                </TabsTrigger>
              </TabsList>

              {/* 3-Day Forecast */}
              <TabsContent value="forecast">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weatherData.forecast.forecastday.map((day, index) => (
                    <Card key={index} className="bg-white/90 backdrop-blur-sm border-green-200">
                      <CardContent className="p-4">
                        <div className="text-center space-y-3">
                          <p className="font-semibold text-gray-900">{formatDate(day.date)}</p>
                          {getWeatherIcon(day.day.condition.code)}
                          <p className="text-sm text-gray-600">{day.day.condition.text}</p>
                          <div className="space-y-1">
                            <p className="text-lg font-bold">{Math.round(day.day.maxtemp_c)}°C</p>
                            <p className="text-sm text-gray-500">{Math.round(day.day.mintemp_c)}°C</p>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">{t.rainChance}:</span>
                              <Badge variant={day.day.daily_chance_of_rain > 60 ? "default" : "secondary"}>
                                {day.day.daily_chance_of_rain}%
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">{t.uvIndex}:</span>
                              <Badge className={`text-white text-xs ${getUVBadgeColor(day.day.uv)}`}>
                                {day.day.uv}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">{t.precipitation}:</span>
                              <span>{day.day.totalprecip_mm} mm</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Weather Charts */}
              <TabsContent value="charts">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Hourly Temperature Chart */}
                  <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span>{t.temperatureTrend}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={hourlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="temperature" stroke="#22c55e" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Humidity Chart */}
                  <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Droplets className="h-5 w-5 text-blue-500" />
                        <span>{t.humidityTrend}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={hourlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Wind Speed Chart */}
                  <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <span>{t.windTrend}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={hourlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="wind" fill="#6b7280" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Precipitation Chart */}
                  <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CloudRain className="h-5 w-5 text-blue-500" />
                        <span>{t.precipitationChart}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={forecastData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="precipitation" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Agricultural Alerts */}
              <TabsContent value="alerts">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {getAgriculturalTips().map((tip, index) => (
                        <Alert key={index} className={`border-l-4 ${
                          tip.type === 'warning' ? 'border-l-orange-500 bg-orange-50' :
                          tip.type === 'success' ? 'border-l-green-500 bg-green-50' :
                          'border-l-blue-500 bg-blue-50'
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            {tip.message}
                          </AlertDescription>
                        </Alert>
                      ))}
                      {getAgriculturalTips().length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Sprout className="h-12 w-12 mx-auto mb-4 text-green-400" />
                          <p>{language === 'en' ? 'No alerts at this time. Weather conditions are favorable for farming.' : 'इस समय कोई चेतावनी नहीं। मौसम की स्थिति खेती के लिए अनुकूल है।'}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Farming Tips */}
              <TabsContent value="tips">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>{language === 'en' ? 'Seasonal Tips' : 'मौसमी सुझाव'}</span>
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <p className="font-medium text-green-800">
                              {language === 'en' ? 'Winter Season (Rabi Crops)' : 'शीत ऋतु (रबी फसलें)'}
                            </p>
                            <p className="text-green-700 mt-1">
                              {language === 'en' 
                                ? 'Ideal time for wheat, barley, and mustard cultivation. Monitor for frost protection.'
                                : 'गेहूं, जौ और सरसों की खेती के लिए आदर्श समय। पाले से बचाव की निगरानी करें।'
                              }
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="font-medium text-blue-800">
                              {language === 'en' ? 'Irrigation Management' : 'सिंचाई प्रबंधन'}
                            </p>
                            <p className="text-blue-700 mt-1">
                              {language === 'en'
                                ? 'Water crops early morning or evening to reduce evaporation losses.'
                                : 'वाष्पीकरण हानि को कम करने के लिए सुबह जल्दी या शाम को फसलों की सिंचाई करें।'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center space-x-2">
                          <Wheat className="h-5 w-5 text-primary" />
                          <span>{language === 'en' ? 'Crop Care' : 'फसल देखभाल'}</span>
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="p-3 bg-yellow-50 rounded-lg">
                            <p className="font-medium text-yellow-800">
                              {language === 'en' ? 'Pest Management' : 'कीट प्रबंधन'}
                            </p>
                            <p className="text-yellow-700 mt-1">
                              {language === 'en'
                                ? 'Regular field inspection for early pest detection. Use integrated pest management.'
                                : 'कीटों की जल्दी पहचान के लिए नियमित खेत निरीक्षण। एकीकृत कीट प्रबंधन का उपयोग करें।'
                              }
                            </p>
                          </div>
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <p className="font-medium text-purple-800">
                              {language === 'en' ? 'Soil Health' : 'मिट्टी का स्वास्थ्य'}
                            </p>
                            <p className="text-purple-700 mt-1">
                              {language === 'en'
                                ? 'Test soil pH regularly and add organic matter to improve soil structure.'
                                : 'मिट्टी के पीएच की नियमित जांच करें और मिट्टी की संरचना सुधारने के लिए जैविक पदार्थ मिलाएं।'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Crop Calendar */}
              <TabsContent value="calendar">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{cropCalendar[language].title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Rabi Season */}
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-semibold text-blue-800">{cropCalendar[language].rabi.name}</h3>
                          <p className="text-blue-600 text-sm">{cropCalendar[language].rabi.period}</p>
                        </div>
                        <div className="space-y-3">
                          {cropCalendar[language].rabi.crops.map((crop, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{crop.icon}</span>
                                <div>
                                  <p className="font-medium">{crop.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {language === 'en' ? 'Sowing' : 'बुआई'}: {crop.sowing}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  {language === 'en' ? 'Harvest' : 'कटाई'}: {crop.harvesting}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Kharif Season */}
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <h3 className="font-semibold text-green-800">{cropCalendar[language].kharif.name}</h3>
                          <p className="text-green-600 text-sm">{cropCalendar[language].kharif.period}</p>
                        </div>
                        <div className="space-y-3">
                          {cropCalendar[language].kharif.crops.map((crop, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{crop.icon}</span>
                                <div>
                                  <p className="font-medium">{crop.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {language === 'en' ? 'Sowing' : 'बुआई'}: {crop.sowing}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  {language === 'en' ? 'Harvest' : 'कटाई'}: {crop.harvesting}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Satellite View */}
              <TabsContent value="satellite">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Satellite className="h-5 w-5 text-primary" />
                      <span>{t.satellite}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center py-12 space-y-4">
                      <Satellite className="h-16 w-16 mx-auto text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-700">
                        {language === 'en' ? 'Satellite Weather Maps' : 'सैटेलाइट मौसम मानचित्र'}
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {language === 'en' 
                          ? 'Interactive satellite imagery and weather radar maps will be available here. This feature provides real-time cloud cover, precipitation, and storm tracking.'
                          : 'इंटरैक्टिव सैटेलाइट इमेजरी और मौसम रडार मानचित्र यहां उपलब्ध होंगे। यह सुविधा वास्तविक समय में बादल कवर, वर्षा और तूफान ट्रैकिंग प्रदान करती है।'
                        }
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <Cloud className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                          <p className="text-sm font-medium">
                            {language === 'en' ? 'Cloud Cover' : 'बादल कवर'}
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <CloudRain className="h-8 w-8 mx-auto text-green-500 mb-2" />
                          <p className="text-sm font-medium">
                            {language === 'en' ? 'Precipitation' : 'वर्षा'}
                          </p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg">
                          <Zap className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                          <p className="text-sm font-medium">
                            {language === 'en' ? 'Lightning' : 'बिजली'}
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <Wind className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                          <p className="text-sm font-medium">
                            {language === 'en' ? 'Wind Patterns' : 'हवा के पैटर्न'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}

export default App