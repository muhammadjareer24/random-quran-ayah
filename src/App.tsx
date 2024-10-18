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

  const copyToClipboard = () => {
    const copyText = `Ayah: ${currentAyah}\nReference: ${currentReference}`
    navigator.clipboard
      .writeText(copyText)
      .then(() => alert("Ayah has been copied"))
      .catch(() => alert("Failed to copy the ayah"))
  }

  const handleWhatsAppShare = () => {
    const message = `Ayah: ${currentAyah}\nReference: ${currentReference}`
    const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsAppUrl, "_blank")
  }

  return (
    <div className="bg-[#f9fafb] font-k2d flex justify-center items-center min-h-screen p-5 sm:p-10">
      <div id="wrapper" className="text-center w-full max-w-[800px]">
        <h1 id="title" className=" text-3xl md:text-5xl font-bold mb-5">
          Random Quran Ayah
        </h1>
        <p className="mb-8 text-2xl">A source of peace and reflection ❤</p>
        <div
          id="quote-box"
          className=" mx-5 p-5 font-semibold text-lg bg-white text-center rounded-lg shadow-lg space-y-4"
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
          <div
            id="buttons"
            className="flex justify-between  items-center gap-2 mt-5"
          >
            <button
              className="flex items-center justify-center bg-[#007BFF] text-white rounded-lg px-3 py-2 hover:bg-[#3399ff] transition duration-300 shadow-md"
              id="newBtn"
              onClick={handleNewAyah}
            >
              <i className="fas fa-sync-alt mr-2"></i> New
            </button>
            {/* Grouping Copy and WhatsApp buttons on the right side */}
            <div className="flex items-center justify-end space-x-2">
              <button
                className="flex items-center justify-center bg-[#17A2B8] text-white rounded-lg px-3 py-3 hover:bg-[#33bbc1] transition duration-300 shadow-md"
                id="copyBtn"
                onClick={copyToClipboard}
              >
                <i className="fas fa-copy "></i>
              </button>
              <button
                className="flex items-center justify-center bg-[#25D366] text-white rounded-lg px-3 py-2 hover:bg-green-400 transition duration-300 shadow-md"
                id="whatsappBtn"
                onClick={handleWhatsAppShare}
              >
                <i className="fa-brands fa-whatsapp text-xl"></i>
                <span className="hidden xs:block ml-2">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
