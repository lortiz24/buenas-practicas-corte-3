import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, MenuItem, Typography, Button } from '@mui/material';
import { useGetDije } from '../../hooks/useGetDije';
import { useGetTipoDije } from '../../hooks/useGetTipoDije';
import { useGetMonedas } from '../../hooks/useGetMonedas';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import { useForm } from '../../hooks/useForm';
import { FormBuildManilla } from '../../interface/form.interface';
import { useGetMaterial } from '../../hooks/useGetMaterial';

interface Props {
    onSubmit?: (values: FormBuildManilla) => void;
}


const formValues: FormBuildManilla = {
    cantidad: '1',
    dije: '',
    moneda: '',
    material: '',
    typeDije: ''
}

export const FormSelectManilla = ({ onSubmit }: Props) => {
    const { dijes } = useGetDije()
    const { tipoDijes } = useGetTipoDije()
    const { monedas } = useGetMonedas()
    const { materiales } = useGetMaterial()
    const { formState, onInputChange, onResetForm } = useForm(formValues)

    const handledSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSubmit) onSubmit(formState)
    }


    return (
        <Box
            onSubmit={handledSubmit}
            component="form"
            width={'100%'}
            noValidate
            autoComplete="off"
        >
            <Grid
                container
                width={'100%'}
                gap={2}
                display={'flex'}
                justifyContent={'space-between'}>
                <Grid
                    item
                    xs={12}
                    md={5}
                    width={'100%'}
                >
                    <TextField
                        name='cantidad'
                        onChange={onInputChange}
                        defaultValue={1}
                        required
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}

                        inputProps={{
                            min: 1,
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
                        name='material'
                        onChange={onInputChange}
                        required
                        select
                        label="Material"
                        helperText="Por favor, seleccione el material"
                        sx={{
                            width: '100%'
                        }}
                    >
                        {materiales.map((option) => (
                            <MenuItem key={option.value} value={option.value.toLowerCase()}>
                                <Typography textTransform={'capitalize'}>{option.label}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5} >
                    <TextField
                        name='dije'
                        onChange={onInputChange}
                        required
                        select
                        label="Dije"
                        helperText="Por favor, seleccione el dije"
                        sx={{
                            width: '100%'
                        }}
                    >
                        {dijes.map((option) => (
                            <MenuItem key={option.id} value={option.name.toLowerCase()}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>

                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5} >
                    <TextField
                        name='typeDije'
                        onChange={onInputChange}
                        required
                        select
                        label="Tipo de dije"
                        helperText="Por favor, seleccione el tipo de dije"
                        sx={{
                            width: '100%'
                        }}
                    >
                        {tipoDijes.map((option) => (
                            <MenuItem key={option} value={option.toLowerCase()}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={5} >
                    <TextField
                        name='moneda'
                        onChange={onInputChange}
                        required
                        select
                        label="Moneda"
                        helperText="Por favor, seleccione su moneda"
                        sx={{
                            width: '100%'
                        }}
                    >
                        {monedas.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                <Typography textTransform={'capitalize'}>{option.label}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={5} >
                    <Button
                        startIcon={<BuildOutlinedIcon />}
                        type='submit'
                    >

                        Contruir
                    </Button>

                </Grid>
            </Grid>

        </Box>
    )
}
