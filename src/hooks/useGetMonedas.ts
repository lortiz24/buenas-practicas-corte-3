import { useEffect, useState } from 'react'

interface SelectOption {
    label: string;
    value: string;
}

const monedasDb: SelectOption[] = [
    {
        label: 'Dolar',
        value: 'usd'
    },
    {
        label: 'Peso colombiano',
        value: 'cop'
    },
]

export const useGetMonedas = () => {
    const [monedas, setMonedas] = useState<SelectOption[]>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setMonedas(monedasDb)
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        monedas
    }
}
