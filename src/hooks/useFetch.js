import { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(url)
        // if (isMounted) {
        setData(response.data.result)
        setError(null)
        console.log(response)
        // }
      } catch (err) {
        // if (isMounted) {
        setError(err)
        setData(null)
        // }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const cleanUp = () => {
      isMounted = false
    }
    return cleanUp()
  }, [url])

  return { data, error, loading }
}
export default useFetch
