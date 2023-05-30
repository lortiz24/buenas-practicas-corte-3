import { useEffect, useState } from 'react'
import { HttpAdapter } from '../interface/service'
import { StatusResponse } from '../interface/statusResponse'


export const useGet = <T>(service: HttpAdapter<T>) => {
  const [data, setdata] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, seterror] = useState<StatusResponse>('success')
  useEffect(() => {
    service.getAll()
      .then((response) => {
        if (response.status === 'error') {
          return seterror('error')
        }
        if (Array.isArray(response.data)) {
          return setdata(response.data)
        }

      })
      .finally(() => {
        setIsLoading(false)
      })

  }, [])


  return {
    isLoading, data, error
  }
}
