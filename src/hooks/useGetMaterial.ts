import { useEffect, useState } from 'react'

interface SelectOption {
    label: string;
    value: string;
}

const monedasDb: SelectOption[] = [
    {
        label: 'Cuero',
        value: 'cuero'
    },
    {
        label: 'Cuerda',
        value: 'cuerda'
    },
]

export const useGetMaterial = () => {
    const [materiales, setMonedas] = useState<SelectOption[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setMonedas(monedasDb)
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        materiales
    }
}
