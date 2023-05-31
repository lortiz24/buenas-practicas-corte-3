import { useEffect, useState } from 'react';
import { Card, CardMedia, CardHeader, Avatar, CardActions, Collapse, CardContent, Typography, LinearProgress, Box, Stack, Skeleton, CircularProgress } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Manilla } from '../../interface/manilla.interface';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { FormBuildManilla } from '../../interface/form.interface';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



interface Props {
    manilla: Manilla,
    formBuilder?: boolean;
    manillaFound?: Manilla,
    buildConfigManillaProps?: FormBuildManilla;
    isLoadingBuild: boolean
}




export const CardManillaDos = ({ manilla, buildConfigManillaProps, isLoadingBuild }: Props) => {
    const [buildConfigManilla, setbuildConfigManilla] = useState<FormBuildManilla>()

    useEffect(() => {
        if (buildConfigManillaProps) {
            setbuildConfigManilla(buildConfigManillaProps)
        }
    }, [buildConfigManillaProps])


    const getPrecio = () => {
        if (!buildConfigManilla && !manilla) {
            return '$ 0'
        }
        if (!buildConfigManilla && manilla) {
            return `$ ${manilla.precio.valor}`
        }

        if (buildConfigManilla?.moneda === 'usd')
            return `$ ${manilla.precio.valor * (Number(buildConfigManilla.cantidad) ?? 1)}`
        else
            return `$ ${manilla.precio.valor * 5000 * (Number(buildConfigManilla?.cantidad) ?? 1)}`
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
                            >{manilla.name}</Typography>}
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
                            image={manilla.img}
                            alt="Paella dish"
                        />
                        <CardActions disableSpacing sx={{ paddingX: 2, paddingBottom: 2 }}>
                            <IconButton aria-label="add to favorites">
                                <AddShoppingCartIcon />
                            </IconButton>
                        </CardActions>

                    </Box>
                )
            }

        </Card >


    )
}
