import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import {TitleCard} from "@/components/ux/TitleCard.tsx"

function App() {
  const [longURL, setLongURL] = useState("")
  const [shortURL, setShortURL] = useState("")
  const [shouldShorten, setShouldShorten] = useState(false)

  useEffect(()=>{
    const handleResponse = async()=>{
      if(longURL && shouldShorten){
        try {
          console.log('sending CORS request')
          const response = await axios.post('http://localhost:3000', {url: longURL}, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          setShortURL(response.data)
        }
        catch(err){
          console.log(err)
        }
      }
    }
    handleResponse()
  }, [longURL, shouldShorten])

  const handleURLChange = (newURL: string)=>{
    setLongURL(newURL)
  }
  const handleShouldShortenChange = ()=>{
    setShouldShorten(shouldShorten=>!shouldShorten)
  }
  return (
    <>
      <TitleCard longURL={longURL} onValueChange={handleURLChange} shouldShorten={shouldShorten} onShouldShortenChange={handleShouldShortenChange}/>
      <h1>{shouldShorten ? "true": "false"}</h1>
      <h1>{shortURL}</h1>
    </>
  )
}

export default App
