import "./App.css";


import searchIco from "../src/assets/serach-icon.svg";
import githubIco from "../src/assets/GitHub-Logo.wine.svg";
import { useEffect, useState } from "react";

import { useFetchWeather } from "./hook/usefetchWeather";


function App() {
  const[cityInput, setCityInput] = useState()

  const [cidade, setCidade] = useState();
  const [clima, setClima] = useState();
  const [descricao, setDescricao] = useState();
  const [umidade, setUmidade] = useState();
  const[vento, setVento] = useState()
  const[icon, setIcon] = useState()
  const[error, setError] = useState(false)

  const{fetchWeather, cidade:city, clima:weather, descricao:desc, umidade:humidity, vento:wind, icon:fetchIcon, error:fetchError} = useFetchWeather(cityInput)
  

  const handleSubmit =async(e)=>{
    e.preventDefault()
    fetchWeather(cityInput)
  }

  useEffect(()=>{
    setCidade(city)
    setClima(weather)
    setDescricao(desc)
    setUmidade(humidity)
    setVento(wind)
    setIcon(fetchIcon)
  },[fetchWeather])

  useEffect(()=>{
    setCidade(null)
    setError(fetchError)
  },[fetchError])

  return (
    <div>
      {/* barra de pesquisa */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              required
              placeholder="Digite o nome da cidade"
              onChange={(e)=>setCityInput(e.target.value)}
            />
            <button>
              <img
                src={searchIco}
                alt="icon-search"
                className="icon-search"
              />
            </button>
          </div>
        </form>
      </div>

      <div className="res-container">
        
      {error && <p style={{color: 'white'}}>{error}</p>}
      {!cidade && <p style={{color: 'white'}}>Digite uma cidade.</p>}
        {cidade && <>
          <div className="city-container">
          <i class="fa-solid fa-location-dot"></i>
          <p>{cidade}</p>
        </div>

        <div className="temp-container">
          <h1>{clima}ºc</h1>
        </div>

        <div className="description-container">
         
            <div className="l1-desc">
                <div className="descricao">
                  <p>{descricao}</p>
                  <img src={icon} alt="icon" />
                </div>
                <div className="umidade">
                  <p>{umidade}%</p>
                  <i class="fa-solid fa-droplet"></i>
                </div>
            </div>
            
              <div className="vento">
                <p>{vento}km/h</p>
                <i class="fa-solid fa-wind"></i>
              </div>
          

          
        </div>
        
        </>}
        
      </div>

      <div
        className="github"
        onClick={() => window.open("https://github.com/fabcode01", "_blank")}
      >
        <img
          src={githubIco}
          alt="githubIcon"
        />
        <h3>fabcode01</h3>
      </div>
    </div>
  );
}

export default App;
