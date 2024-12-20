import "./App.css"
import "./index.css"

import useData from "./hook/useData"
import Controls from "./components/Controls"
import Display from "./components/Display"

function App() {
  const {
    currentAyah,
    currentReference,
    loading,
    error,
    getNewAyah,
    animationKey,
  } = useData()

  const handleCopy = () => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 animate-spin-slow"></div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    )
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
          key={animationKey}
          className=" mx-5 p-5 font-semibold text-lg bg-white text-center rounded-lg shadow-lg space-y-4 animate-fade-in"
        >
          <Display
            currentAyah={currentAyah}
            currentReference={currentReference}
          />

          <Controls
            onNewAyah={getNewAyah}
            onCopyAyah={handleCopy}
            onWhatsAppShare={handleWhatsAppShare}
          />
        </div>
      </div>
    </div>
  )
}

export default App
