import { manillaService } from "../../firebase/manilla/Manilla.service"
import { useGet } from "../../hooks/useGet"
import { Grid } from '@mui/material';
import { CardManilla } from "../card-manilla/CardManilla";
export const ManillaList = () => {

    const { data, isLoading } = useGet(manillaService)
    return (
        <>
            <Grid
                container
                display={'flex'}
                justifyContent={'center'}
                gap={2}
            >
                {data.map(manilla => (
                    <Grid item key={manilla.id}>
                        <CardManilla manilla={manilla} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
