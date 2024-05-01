import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, Image, Keyboard} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=80e783cece82b4dc8a2016fa29225725`);
      if (!response.ok) {
        throw new Error('Cidade não encontrada. Por favor, verifique o nome da cidade e tente novamente.');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
      Keyboard.dismiss();
    } catch (error) {
      Keyboard.dismiss();
      console.error('Erro:', error.message);
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>SkyCast</Text>
      
      <Text style={styles.header}>Informe o nome da cidade</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        value={city}
        onChangeText={setCity}
      />
      
      <Button
        title="Buscar"
        onPress={fetchWeather}
        disabled={city.trim() === ''}
      />
     
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={{fontSize: 15, marginBottom:5}}>{weatherData.name}</Text>
          <Text style={{fontSize: 30, marginBottom:5}}> {weatherData.main.temp}°C</Text>
          <Text style={{fontSize: 15, marginBottom:5}}>{weatherData.weather[0].description}</Text>
          <Text style={{fontSize: 15, marginBottom:5}} >Máx.: {weatherData.main.temp_max}°C   Mín.: {weatherData.main.temp_min}°C</Text>
          <Text>Umidade: {weatherData.main.humidity}%</Text>
          <Image
          source={{uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}}
          style={{ width: 100, height: 100}}
          />
 
        </View>
       )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#CCEBFF',
    padding: 20,
    
  },
  title: {
    fontSize: 30,
    marginTop: 40,

  },
  header: {
    fontSize: 20,
    marginTop: 150,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
});