import { manillaService } from "../../firebase/manilla/Manilla.service"
import { useGet } from "../../hooks/useGet"
import { Box, Grid } from '@mui/material';
import { CardManilla } from "../card-manilla/CardManilla";
export const ManillaList = () => {

    const { data, error, isLoading } = useGet(manillaService)
    return (
        <>

            {/* <Box
                sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem'
                }}
            >
                {data.map(manilla => (
                    <CardManilla manilla={manilla} />
                ))}
            </Box> */}

            <Grid
                container
                display={'flex'}
                justifyContent={'center'}
                gap={2}
            >
                {data.map(manilla => (
                    <Grid item>
                        <CardManilla manilla={manilla} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
