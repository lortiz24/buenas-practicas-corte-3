import { useEffect, useState } from 'react'
import { TipoDije } from '../interface/dije.interface'

const dijesDb: TipoDije[] = ['niquel', 'oro', 'oro-rosado', 'plata']

export const useGetTipoDije = () => {
    const [tipoDijes, setdijes] = useState<TipoDije[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setdijes(dijesDb)
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        tipoDijes
    }
}
