import { useEffect, useState } from "react"
import "./App.css"
import "./index.css"

function App() {
  const [ayahs, setAyahs] = useState([])

  const [currentAyah, setCurrentAyah] = useState("")
  const [currentReference, setCurrentReference] = useState("")

  const [info, setInfo] = useState(null)

  const url =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-muftitaqiusmani.min.json"

  const infoUrl =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json"

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Ayahs
        const ayahsResponse = await fetch(url)
        const ayahsData = await ayahsResponse.json()

        setAyahs(ayahsData.quran)

        // Fetch Info
        const infoResponse = await fetch(infoUrl)
        const infoData = await infoResponse.json()

        setInfo(infoData)
        displayRandomAyah(ayahsData.quran, infoData)
      } catch (error) {
        console.log("Error in fetch request", error)
      }
    }

    fetchData()
  }, [])

  const displayRandomAyah = (ayahsArray, infoData) => {
    const randomIndex = Math.floor(Math.random() * ayahsArray.length)

    const randomAyah = ayahsArray[randomIndex]

    const chapterInfo = infoData.chapters.find(
      (chapter) => chapter.chapter === randomAyah.chapter
    )

    const chapterName = chapterInfo.name

    setCurrentAyah(randomAyah.text)
    setCurrentReference(
      `${chapterName} (${randomAyah.chapter}:${randomAyah.verse})`
    )
  }

  const handleNewAyah = () => {
    displayRandomAyah(ayahs, info)
  }

  const coptToClipboard = () => {
    const copyText = `Ayah: ${currentAyah}\nReference: ${currentReference}`

    navigator.clipboard
      .writeText(copyText)
      .then(() => alert("Ayah has been copied"))
      .catch(() => alert("Failed to copy the ayah"))
  }

  return (
    <div className="bg-[#f9fafb] font-k2d flex justify-center items-center h-screen m-0 overflow-hidden">
      <div id="wrapper" className="text-center">
        <h1 id="title" className="title text-2xl md:text-2xl font-bold pb-5">
          Random Quran Ayah
        </h1>
        <p></p>
        <div
          id="quote-box"
          className="w-full max-w-md mx-5 p-5 font-semibold text-lg bg-white text-center rounded-lg shadow-lg"
        >
          <div id="text">
            <blockquote>
              <p className="font-josefin italic text-2xl text-gray-800 my-2">
                {currentAyah}
              </p>
            </blockquote>
          </div>
          <div id="reference">
            <cite className="font-k2d text-xl text-gray-600 mt-4">
              {currentReference}
            </cite>
          </div>
          <div id="buttons" className="flex justify-between gap-2 mt-5">
            <button
              className="newBtn button"
              id="newBtn"
              onClick={handleNewAyah}
            >
              <i className="fas fa-sync-alt mx-0.5"></i> New Ayah
            </button>
            <button
              className="copyBtn button"
              id="copyBtn"
              onClick={coptToClipboard}
            >
              <i className="fas fa-copy mx-0.5"></i> Copy Ayah
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
