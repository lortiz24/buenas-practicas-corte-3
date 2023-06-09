import { useEffect, useState } from 'react';
import { Card, CardMedia, CardHeader, Avatar, CardActions, Collapse, CardContent, Typography, Box, CircularProgress } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormSelectManilla } from '../form-select-manilla/FormSelectManilla';
import { Manilla } from '../../interface/manilla.interface';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormBuildManilla } from '../../interface/form.interface';
import { manillaService } from '../../firebase/manilla/Manilla.service';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



interface Props {
    manilla?: Manilla,
    formBuilder?: boolean;
    manillaFound?: Manilla,
    buildConfigManillaProps?: FormBuildManilla
}

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


export const CardManilla = ({ manilla, formBuilder = false, buildConfigManillaProps }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [manillaSelect, setmanillaSelect] = useState<Manilla>(manillaInitial)
    const [isLoadingBuild, setisLoadingBuild] = useState(true)
    const [buildConfigManilla, setbuildConfigManilla] = useState<FormBuildManilla>()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        if (manilla) {
            setmanillaSelect(manilla)
            setisLoadingBuild(false)
        } else {
            setisLoadingBuild(false)
        }
    }, [manilla])




    useEffect(() => {
        if (buildConfigManillaProps) {
            setbuildConfigManilla(buildConfigManillaProps)
        }
    }, [buildConfigManillaProps])



    const onBuild = async (values: FormBuildManilla) => {
        setbuildConfigManilla(values)
        setisLoadingBuild(true)
        const { data: manilla } = await manillaService.getWhere(
            { fieldPath: 'dije', opStr: '==', value: values.dije },
            { fieldPath: 'material', opStr: '==', value: values.material },
            { fieldPath: 'tipo', opStr: '==', value: values.typeDije },
        )
        if (Array.isArray(manilla) && manilla.length > 0) {
            setmanillaSelect(manilla[0])
        }
        setisLoadingBuild(false)

    }

    const getPrecio = () => {
        if (!buildConfigManilla && !manillaSelect) {
            return '$ 0'
        }
        if (!buildConfigManilla && manillaSelect) {
            return `$ ${manillaSelect.precio.valor}`
        }

        if (buildConfigManilla?.moneda === 'usd')
            return `$ ${manillaSelect.precio.valor * (Number(buildConfigManilla.cantidad) ?? 1)}`
        else
            return `$ ${manillaSelect.precio.valor * 5000 * (Number(buildConfigManilla?.cantidad) ?? 1)}`
    }


    return (

        <Card
            sx={{
                width: {
                    xs: '100%', sm: 400, lg: 400
                },
                borderRadius: '2rem'
            }}>
            {isLoadingBuild
                ?
                <>
                    <Box
                        height={400}
                        display={'flex'}
                        justifyContent={'center'}
                        flexDirection={'column'}
                        alignItems={'center'}
                    >
                        <CircularProgress color="primary" />
                    </Box>
                </>
                :
                (
                    <Box>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    M
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={<Typography
                                variant='body2'
                                fontSize={20}
                            >{manillaSelect.name}</Typography>}
                            subheader={getPrecio()}
                        />
                        <CardMedia
                            sx={{
                                width: {
                                    xs: '100%'
                                },
                                height: {
                                    xs: '100%', sm: 400, lg: 400
                                },
                                objectFit: 'contain',
                            }}
                            loading={'lazy'}
                            component="img"
                            image={manillaSelect.img}
                            alt="Paella dish"
                        />
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <AddShoppingCartIcon />
                            </IconButton>
                            {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                            {formBuilder && <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>}
                        </CardActions>

                    </Box>
                )
            }

            {formBuilder &&
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <FormSelectManilla onSubmit={onBuild} />
                    </CardContent>
                </Collapse>
            }
        </Card >


    )
}
