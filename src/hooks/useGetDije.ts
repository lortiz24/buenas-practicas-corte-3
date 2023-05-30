import { useEffect, useState } from 'react'
import { Dije } from '../interface/dije.interface'

const dijesDb: Omit<Dije, 'tipo'>[] = [
    {
        name: 'Ancla',
        id: 'efneuifnefe5f456e1f52ef',
        status: 'disponible',
    },
    {
        name: 'Martillo',
        id: '12e256f1e51f1ef5',
        status: 'disponible',
    },
]

export const useGetDije = () => {
    const [dijes, setdijes] = useState<Omit<Dije, 'tipo'>[]>([])
    const [isLoading, setIsLoading] = useState(true)
console.log('dijes',dijes)
    useEffect(() => {
        setdijes(dijesDb)
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        dijes
    }
}
