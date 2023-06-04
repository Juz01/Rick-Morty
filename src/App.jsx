import useFetch from './hooks/useFetch'
import { useEffect, useState } from 'react'
import getRandomNumber from './utils/getRandomNumber'
import './App.css'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormSearch from './components/FormSearch'

function App() {
  
  const randomId = getRandomNumber(126)

  const [idLocation, setIdLocation] = useState(randomId)
  
  const url = `https://rickandmortyapi.com/api/location/${idLocation}`

  const [ location, getApiLocation, hasError ] = useFetch(url)
  
  useEffect(() => {
    getApiLocation()   
  }, [idLocation])
  
  console.log(location);

  return (
    <div className='app'>
      <h1>
        <div className='header__img'>
          <img src="./34f8ffb34b0055d2a2a34bc10390c23c.png" className='header__back' alt="" />
          <img src="./9211983155574e727fd7ed818177d19d.png" className='header__from' alt="" />
        </div>
      </h1>
      <FormSearch 
        setIdLocation={setIdLocation}
      />
      {
        hasError
        ? <h2 className='alert-wrong'>❌hey you must provide an id from 1 to 126</h2>
        : (
          <>
            <LocationInfo
              location={location}
            />

             <div className='resident-container'>
               {
                  location?.residents.map(url => (
                    <ResidentCard
                    url={url} 
                    key={url}
                    />
                  ))
                }
              </div>
          </>
        )
      }
        
    </div>
  )
}

export default App
