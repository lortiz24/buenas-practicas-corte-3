import { manillaService } from "../../firebase/manilla/Manilla.service"
import { useGet } from "../../hooks/useGet"
import { Box } from '@mui/material';
export const ManillaList = () => {

    const { data, error, isLoading } = useGet(manillaService)
    return (
        <Box>
            {data.map(manilla => (
                <>{manilla.name}</>
            ))}
        </Box>
    )
}
