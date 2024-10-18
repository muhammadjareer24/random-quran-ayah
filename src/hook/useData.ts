import { useEffect, useState } from "react"
import { AyahType, InfoType } from "../types"
import { infoUrl, url } from "../config/api"

const useData = () => {
  const [ayahs, setAyahs] = useState<AyahType[]>([])

  const [info, setInfo] = useState<InfoType[]>([])

  const [loading, setLoading] = useState<boolean>(true)

  const [error, setError] = useState<string | null>(null)

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
        // displayRandomAyah(ayahsData.quran, infoData)
      } catch (error) {
        setError("Error in fetching Ayahs")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { ayahs, info, loading, error }
}

export default useData
