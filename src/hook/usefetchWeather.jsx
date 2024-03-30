import { useState } from "react";
const apiKey = "3bdc36e7a053eb68f97f77d12109f1b4";

export const useFetchWeather = (cityInput) => {
  const city = cityInput.trim()
  const baseurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState();
  const [descricao, setDescricao] = useState("");
  const [umidade, setUmidade] = useState();
  const [vento, setVento] = useState();
  const [error, setError] = useState("");
  const [icon, setIcon] = useState("");

  const fetchWeather = async () => {
    try {
      const res = await fetch(baseurl);
      const data = await res.json();
      console.log(data);
      setCidade(data.name);
      setClima(parseInt(data.main.temp));
      setDescricao(data.weather[0].description);
      setUmidade(data.main.humidity);
      setVento(data.wind.speed);
      setIcon(`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
      setError(false);
    } catch (error) {
      setError("Cidade não encontrada!");
    }
  };

  return {
    fetchWeather,
    cidade,
    clima,
    descricao,
    umidade,
    vento,
    icon,
    error,
  };
};
