import { useEffect, useState } from "react"
import './App.css'

// comprobar que este enlace devuelve json añadiendole al final &json=true
const CAT_RANDOM_FACT_ENDPOINT = 'https://catfact.ninja/fact'
const CAT_IMAGE_URL = `https://cataas.com`

export function App() {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetch(CAT_RANDOM_FACT_ENDPOINT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data
            setFact(fact)

            const first_word = fact.split(' ')[0]
            setImageUrl(`/cat/says/${first_word}?fontSize=50&fontColor=red`)
        })
    },[])

    return(
        <main>
            <h1> Hello cat lovers!</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_IMAGE_URL}${imageUrl}`} alt={`Image extracted using first word from ${fact}`} />}
        </main>
    )
}