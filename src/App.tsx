import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Alert, AlertDescription } from './components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
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
  Calendar
} from 'lucide-react'

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
  }
  current: {
    temp_c: number
    temp_f: number
    condition: {
      text: string
      icon: string
    }
    humidity: number
    wind_kph: number
    wind_dir: string
    pressure_mb: number
    vis_km: number
    uv: number
    feelslike_c: number
  }
  forecast: {
    forecastday: Array<{
      date: string
      day: {
        maxtemp_c: number
        mintemp_c: number
        condition: {
          text: string
          icon: string
        }
        daily_chance_of_rain: number
        avghumidity: number
        maxwind_kph: number
      }
      astro: {
        sunrise: string
        sunset: string
      }
    }>
  }
}

// Demo weather data for Indian cities
const demoWeatherData: WeatherData = {
  location: {
    name: 'Delhi',
    region: 'Delhi',
    country: 'India'
  },
  current: {
    temp_c: 28,
    temp_f: 82,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
    },
    humidity: 65,
    wind_kph: 12,
    wind_dir: 'NW',
    pressure_mb: 1013,
    vis_km: 10,
    uv: 6,
    feelslike_c: 31
  },
  forecast: {
    forecastday: [
      {
        date: '2024-01-20',
        day: {
          maxtemp_c: 30,
          mintemp_c: 18,
          condition: {
            text: 'Sunny',
            icon: '//cdn.weatherapi.com/weather/64x64/day/113.png'
          },
          daily_chance_of_rain: 10,
          avghumidity: 60,
          maxwind_kph: 15
        },
        astro: {
          sunrise: '07:12 AM',
          sunset: '05:47 PM'
        }
      },
      {
        date: '2024-01-21',
        day: {
          maxtemp_c: 32,
          mintemp_c: 20,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png'
          },
          daily_chance_of_rain: 20,
          avghumidity: 58,
          maxwind_kph: 18
        },
        astro: {
          sunrise: '07:11 AM',
          sunset: '05:48 PM'
        }
      },
      {
        date: '2024-01-22',
        day: {
          maxtemp_c: 29,
          mintemp_c: 19,
          condition: {
            text: 'Light rain',
            icon: '//cdn.weatherapi.com/weather/64x64/day/296.png'
          },
          daily_chance_of_rain: 80,
          avghumidity: 75,
          maxwind_kph: 22
        },
        astro: {
          sunrise: '07:10 AM',
          sunset: '05:49 PM'
        }
      }
    ]
  }
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  const translations = {
    en: {
      title: 'Bharat Kisan Weather App',
      subtitle: 'Weather insights for Indian farmers',
      searchPlaceholder: 'Search for your city...',
      search: 'Search',
      currentWeather: 'Current Weather',
      forecast: 'Weather Forecast',
      alerts: 'Agricultural Alerts',
      tips: 'Farming Tips',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      pressure: 'Pressure',
      visibility: 'Visibility',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      rainChance: 'Rain Chance',
      maxWind: 'Max Wind',
      language: 'Language'
    },
    hi: {
      title: 'भारत किसान मौसम ऐप',
      subtitle: 'भारतीय किसानों के लिए मौसम जानकारी',
      searchPlaceholder: 'अपना शहर खोजें...',
      search: 'खोजें',
      currentWeather: 'वर्तमान मौसम',
      forecast: 'मौसम पूर्वानुमान',
      alerts: 'कृषि चेतावनी',
      tips: 'खेती के सुझाव',
      feelsLike: 'महसूस होता है',
      humidity: 'नमी',
      windSpeed: 'हवा की गति',
      pressure: 'दबाव',
      visibility: 'दृश्यता',
      uvIndex: 'यूवी सूचकांक',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      rainChance: 'बारिश की संभावना',
      maxWind: 'अधिकतम हवा',
      language: 'भाषा'
    }
  }

  const t = translations[language]

  useEffect(() => {
    // Load demo data on initial load
    setWeatherData(demoWeatherData)
  }, [])

  const searchWeather = async () => {
    if (!searchQuery.trim()) return
    
    setLoading(true)
    try {
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate different cities
      const cityData = { ...demoWeatherData }
      cityData.location.name = searchQuery
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setWeatherData(cityData)
    } catch (error) {
      console.error('Error fetching weather:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('rain')) return <CloudRain className="h-8 w-8 text-blue-500" />
    if (conditionLower.includes('cloud')) return <Cloud className="h-8 w-8 text-gray-500" />
    if (conditionLower.includes('snow')) return <CloudSnow className="h-8 w-8 text-blue-300" />
    if (conditionLower.includes('thunder')) return <Zap className="h-8 w-8 text-yellow-500" />
    return <Sun className="h-8 w-8 text-yellow-500" />
  }

  const getAgriculturalTips = () => {
    if (!weatherData) return []
    
    const tips = []
    const temp = weatherData.current.temp_c
    const humidity = weatherData.current.humidity
    const windSpeed = weatherData.current.wind_kph
    
    if (temp > 35) {
      tips.push({
        type: 'warning',
        message: language === 'en' 
          ? 'High temperature alert! Increase irrigation frequency and provide shade for livestock.'
          : 'उच्च तापमान चेतावनी! सिंचाई की आवृत्ति बढ़ाएं और पशुओं के लिए छाया प्रदान करें।'
      })
    }
    
    if (humidity > 80) {
      tips.push({
        type: 'info',
        message: language === 'en'
          ? 'High humidity detected. Monitor crops for fungal diseases and ensure proper ventilation.'
          : 'उच्च आर्द्रता का पता चला। फंगल रोगों के लिए फसलों की निगरानी करें और उचित वेंटिलेशन सुनिश्चित करें।'
      })
    }
    
    if (windSpeed > 20) {
      tips.push({
        type: 'warning',
        message: language === 'en'
          ? 'Strong winds expected. Avoid spraying pesticides and secure loose farm equipment.'
          : 'तेज हवाओं की उम्मीद। कीटनाशकों का छिड़काव न करें और ढीले कृषि उपकरणों को सुरक्षित करें।'
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
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{weatherData.location.name}, {weatherData.location.region}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Main Weather Info */}
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      {getWeatherIcon(weatherData.current.condition.text)}
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
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.humidity}</p>
                        <p className="font-semibold">{weatherData.current.humidity}%</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-600">{t.windSpeed}</p>
                        <p className="font-semibold">{weatherData.current.wind_kph} km/h</p>
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
                  </div>
                </div>

                {/* Sun Times */}
                <div className="mt-6 flex items-center justify-center space-x-8 p-4 bg-yellow-50 rounded-lg">
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
              </CardContent>
            </Card>

            {/* Forecast and Tips */}
            <Tabs defaultValue="forecast" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-white/90 border border-green-200">
                <TabsTrigger value="forecast" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.forecast}
                </TabsTrigger>
                <TabsTrigger value="alerts" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.alerts}
                </TabsTrigger>
                <TabsTrigger value="tips" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t.tips}
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
                          {getWeatherIcon(day.day.condition.text)}
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
                              <span className="text-gray-600">{t.maxWind}:</span>
                              <span>{day.day.maxwind_kph} km/h</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}

export default App