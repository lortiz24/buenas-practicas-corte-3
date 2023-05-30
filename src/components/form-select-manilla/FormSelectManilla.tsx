import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, MenuItem } from '@mui/material';
import { useGet } from '../../hooks/useGet';
import { dijeService } from '../../firebase/dije/Dije.service';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];



export const FormSelectManilla = () => {
    const { data, error, isLoading } = useGet(dijeService)

    return (
        <Box
            component="form"
            width={'100%'}
            noValidate
            autoComplete="off"
        >
            <Grid
                container
                rowGap={2}
                columnGap={2}
                display={'flex'}
                justifyContent={'center'}>
                <Grid
                    item
                    xs={12}
                    md={5}
                >
                    <TextField
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{
                            width: '100%'
                        }}
                    />

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5} >
                    <TextField
                        select
                        label="Select"
                        defaultValue="EUR"
                        helperText="Por favor, seleccione el dije "
                        sx={{
                            width: '100%'
                        }}
                    >
                        {data.map((option) => (
                            <MenuItem key={option.id} value={option.name.toLowerCase()}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                </Grid>
            </Grid>
        </Box>
    )
}
