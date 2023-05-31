import { useState } from 'react'
import { CardManilla } from "../components/card-manilla/CardManilla"
import { Box, Grid, Button, Typography } from '@mui/material';
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
    const createManilla = () => {
        const manillas: Omit<Manilla, 'id'>[] = [
            {
                material: 'cuero',
                dije: 'martillo',
                tipo: 'oro',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-1.png?alt=media&token=417fcf5f-f96b-4bad-8e24-fd26ab7dc132&_gl=1*m7idu8*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjA0MTUuMC4wLjA.',
                name: 'Mar infinito',
                precio: { moneda: 'usd', valor: 100 }
            },
            {
                material: 'cuero',
                dije: 'martillo',
                tipo: 'oro-rosado',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-2.png?alt=media&token=add9c8df-840b-4e27-834b-121497409054&_gl=1*eblkcs*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjAxNTMuMC4wLjA.',
                name: 'Sangre rosa',
                precio: { moneda: 'usd', valor: 100 }
            },
            {
                material: 'cuero',
                dije: 'martillo',
                tipo: 'plata',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-3.png?alt=media&token=f04d3dd6-c0b2-47dd-a5fb-db54c2ea5c21&_gl=1*5af9ep*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjA0ODcuMC4wLjA.',
                precio: { moneda: 'usd', valor: 80 },
                name: 'Ciudad de oro',
            },
            {
                material: 'cuero',
                dije: 'martillo',
                tipo: 'niquel',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-3.png?alt=media&token=f04d3dd6-c0b2-47dd-a5fb-db54c2ea5c21&_gl=1*eotnxv*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjA4MTEuMC4wLjA.',
                precio: { moneda: 'usd', valor: 70 },
                name: 'Ciudad de plata',
            },
            {
                material: 'cuero',
                dije: 'ancla',
                tipo: 'oro',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-2.png?alt=media&token=add9c8df-840b-4e27-834b-121497409054&_gl=1*4ixopw*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjE3MzMuMC4wLjA.',
                precio: { moneda: 'usd', valor: 120 },
                name: 'Ciudad de Oro',
            },
            {
                material: 'cuero',
                dije: 'ancla',
                tipo: 'oro-rosado',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-5.png?alt=media&token=7040762e-af9f-4009-9a76-5b4c3697fe05&_gl=1*rcfn7f*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjE0NzQuMC4wLjA.',
                precio: { moneda: 'usd', valor: 120 },
                name: 'Ciudad de Oro',
            },
            {
                material: 'cuero',
                dije: 'ancla',
                tipo: 'plata',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-4.png?alt=media&token=80d6c532-a621-4219-a626-f90308b3e654&_gl=1*1sc9c5q*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjA2MjAuMC4wLjA.',
                precio: { moneda: 'usd', valor: 100 },
                name: 'Ciudad de Oro',
            },
            {
                material: 'cuero',
                dije: 'ancla',
                tipo: 'niquel',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-10.png?alt=media&token=04aa1d24-46b3-432f-ab7c-fc9478c8387c&_gl=1*7s7eib*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjEwNzMuMC4wLjA.',
                precio: { moneda: 'usd', valor: 90 },
                name: 'Mar de plata',
            },
            {
                material: 'cuerda',
                dije: 'martillo',
                tipo: 'oro',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-9.png?alt=media&token=89032866-e8bb-419e-9d62-e008480d9b40&_gl=1*1eos1x4*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjE4MzguMC4wLjA.',
                precio: { moneda: 'usd', valor: 90 },
                name: 'La rosalia',
            },
            {
                material: 'cuarda',
                dije: 'martillo',
                tipo: 'oro-rosado',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-10.png?alt=media&token=04aa1d24-46b3-432f-ab7c-fc9478c8387c&_gl=1*77m9e0*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjE4NjYuMC4wLjA.',
                precio: { moneda: 'usd', valor: 90 },
                name: 'La rosaplateada',
            },
            {
                material: 'cuerda',
                dije: 'martillo',
                tipo: 'plata',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-11.png?alt=media&token=0f0657cf-8a17-498d-9524-11b9ef2bde2b&_gl=1*1x8m245*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjE5MjMuMC4wLjA.',
                precio: { moneda: 'usd', valor: 70 },
                name: 'Rio de oro',
            },
            {
                material: 'cuerda',
                dije: 'martillo',
                tipo: 'niquel',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-13.png?alt=media&token=9a2fa1e8-d3d1-40d5-862b-0ef7a5684bd1&_gl=1*1rnqui2*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjIwMTQuMC4wLjA.',
                precio: { moneda: 'usd', valor: 50 },
                name: 'Rey del mar',
            },
            {
                material: 'cuerda',
                dije: 'ancla',
                tipo: 'oro',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-14.png?alt=media&token=427cbe2f-4450-4c89-85dd-f4259755f1d1&_gl=1*1ji4mx*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjIwNzAuMC4wLjA.',
                precio: { moneda: 'usd', valor: 110 },
                name: 'Encuentro demoniaco',
            },
            {
                material: 'cuerda',
                dije: 'ancla',
                tipo: 'oro-rosado',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-14.png?alt=media&token=427cbe2f-4450-4c89-85dd-f4259755f1d1&_gl=1*wksm3w*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjIwNzAuMC4wLjA.',
                precio: { moneda: 'usd', valor: 110 },
                name: 'Encuentro demoniaco',
            },
            {
                material: 'cuerda',
                dije: 'ancla',
                tipo: 'plata',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-15.png?alt=media&token=ae80dfe7-5623-4194-b318-f579dda210a2&_gl=1*1landrr*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjIyMTIuMC4wLjA.',
                precio: { moneda: 'usd', valor: 90 },
                name: 'La sequia',
            },
            {
                material: 'cuerda',
                dije: 'ancla',
                tipo: 'niquel',
                img: 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/buenas-practicas%2Fmanilla-16.png?alt=media&token=205db555-adb2-49e2-9368-8fc4cf7cbf70&_gl=1*1bga0o*_ga*MjA2NDM0OTY1OS4xNjc5MDg4NDA2*_ga_CW55HF8NVT*MTY4NTQxNzk5MS41MS4xLjE2ODU0MjIyNDAuMC4wLjA.',
                precio: { moneda: 'usd', valor: 80 },
                name: 'Amor prohibido',
            },
        ]

        manillas.map(manilla => {
            manillaService.create(manilla)
        })

    }


    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            {/* <Button onClick={createManilla}>epaa</Button> */}
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="Construir Manilla" value="1" />
                        <Tab label="Listado" value="2" />
                        <Tab label="Listado" value="3" />
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
                <TabPanel value="3">
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
                </TabPanel>
            </TabContext>
        </Box>
    )
}
