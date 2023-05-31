import { useState } from 'react'
import { Box, Grid} from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ManillaList } from '../components/listado-manillas/ManillaList';
import { manillaService } from '../firebase/manilla/Manilla.service';
import { Manilla } from '../interface/manilla.interface';
import { FormSelectManilla } from '../components/form-select-manilla/FormSelectManilla';
import { FormBuildManilla } from '../interface/form.interface';
import { CardManillaDos } from '../components/card-manilla/CardManillaBuild.tsx';
import { useMyTabs } from '../hooks/useMyTabs.ts';
import '../components/card-manilla/cardManilla.style.css'



const manillaInitial: Manilla = {
    dije: '',
    id: '',
    img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2FQuestion.png?alt=media&token=9cc212b3-25d7-40fd-b4f7-3923652a2b4c&_gl=1*m75k68*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQyNDQ5Ni41Mi4xLjE2ODU0MjQ1MTEuMC4wLjA.',
    material: '',
    name: "Cree su manilla",
    precio: {
        moneda: 'usd',
        valor: 0
    },
    tipo: 'niquel'
}



export const HomePage = () => {
    const { handleChange, value } = useMyTabs()
    const [manillaSelect, setmanillaSelect] = useState<Manilla>(manillaInitial)
    const [formBuildConfig, setformBuildConfig] = useState<FormBuildManilla>()
    const [isLoadingBuild, setisLoadingBuild] = useState(false)



    const onBuild = async (values: FormBuildManilla) => {
        setisLoadingBuild(true)
        const { data: manilla } = await manillaService.getWhere(
            { fieldPath: 'dije', opStr: '==', value: values.dije },
            { fieldPath: 'material', opStr: '==', value: values.material },
            { fieldPath: 'tipo', opStr: '==', value: values.typeDije },
        )
        if (Array.isArray(manilla) && manilla.length > 0) {
            setmanillaSelect(manilla[0])
            setformBuildConfig(values)
        } else {
            setmanillaSelect(manillaInitial)
        }
        setisLoadingBuild(false)

    }


    const onDestroy = () => {
        setmanillaSelect(manillaInitial)
        setformBuildConfig(undefined)
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            {/* <Button onClick={createManilla}>epaa</Button> */}
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="Construir Manilla" value="1" />
                        <Tab label="Listado" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid
                        container
                        display={'flex'}
                        justifyContent={'space-between'}
                        gap={1}
                    >
                        <Grid item xs={12} sm={12} lg={6} marginBottom={{ xs: 2, sm: 2, md: 0 }}>
                            <FormSelectManilla onSubmit={onBuild} initialValue={formBuildConfig} onDestroy={onDestroy} />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={5}
                            display={'flex'}
                            justifyContent={'center'}>
                            <CardManillaDos manilla={manillaSelect} buildConfigManillaProps={formBuildConfig} isLoadingBuild={isLoadingBuild} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value="2"><ManillaList /></TabPanel>
                {/* <TabPanel value="3">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div className='contenedorCard' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <img src={manillaInitial.img} style={{ width: '400px' }} />
                            <Typography
                                className='first'
                                variant="h2"
                                component="span"
                                style={{ textAlign: 'center' }} textAlign={'center'}>
                                <strong>$ 100</strong>
                            </Typography>
                        </div>
                    </Box>
                </TabPanel> */}
            </TabContext>
        </Box>
    )
}
