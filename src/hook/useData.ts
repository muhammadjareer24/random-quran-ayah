import { useEffect, useState } from "react"
import { API_ENDPOINTS } from "../config/api"
import getRandomItems from "../utils/getRandomItems"

const useData = () => {
  const [ayahs, setAyahs] = useState<AyahType[]>([])

  const [info, setInfo] = useState<InfoType | null>(null)

  const [loading, setLoading] = useState<boolean>(true)

  const [error, setError] = useState<string | null>(null)

  const [displayState, setDisplayState] = useState<DisplayProps>({
    currentAyah: "",
    currentReference: "",
  })

  const [animationKey, setAnimationKey] = useState<number>(0)

  const displayRandomAyah = (ayahsArray: AyahType[], infoData: InfoType) => {
    const randomAyah = getRandomItems(ayahsArray)
    const chapterInfo = infoData.chapters.find(
      (chapter) => chapter.chapter === randomAyah.chapter
    )
    if (chapterInfo && randomAyah) {
      setDisplayState({
        currentAyah: randomAyah.text,
        currentReference: `${chapterInfo.name} (${randomAyah.chapter}:${randomAyah.verse})`,
      })
      setAnimationKey((prevKey) => prevKey + 1)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [ayahsResponse, infoResponse] = await Promise.all([
          fetch(API_ENDPOINTS.QURAN_DATA),
          fetch(API_ENDPOINTS.QURAN_INFO),
        ])

        const [ayahsData, infoData] = await Promise.all([
          ayahsResponse.json(),
          infoResponse.json(),
        ])

        setAyahs(ayahsData.quran)
        setInfo(infoData)

        displayRandomAyah(ayahsData.quran, infoData)
      } catch (error) {
        setError("Error in fetching Ayahs")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getNewAyah = () => {
    if (ayahs.length && info) {
      displayRandomAyah(ayahs, info)
    }
  }

  return { ...displayState, info, loading, error, getNewAyah, animationKey }
}

export default useData
