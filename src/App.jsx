import { useEffect, useState } from 'react'
import './App.css'
import Marque from './Marque'
import UploadBox from './UploadBox'
import ResultBox from './ResultBox'


function App() {

  const [Investigate, setInvestigate] = useState(false)

  const [image, setImage] = useState()
  

  return (
    <>
    <Marque/>
    <Marque/>
    <Marque/>
    <Marque/>
    <Marque/>
    <Marque/>
    <Marque/>
    {
      !Investigate &&
        <UploadBox setInvestigate={setInvestigate} image={image} setImage={setImage} />
      
    }
    {
      Investigate &&
      <ResultBox setInvestigate={setInvestigate} image={image} setImage={setImage}/>
    }
    </>
  )
}

export default App
