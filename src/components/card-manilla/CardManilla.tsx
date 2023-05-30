
import { Card, CardMedia, CardHeader, Avatar, CardActions, Collapse, CardContent, Typography } from '@mui/material'
import ManillaImage from '../../assets/manilla-1.png'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormSelectManilla } from '../form-select-manilla/FormSelectManilla';
import { useGet } from '../../hooks/useGet';
import { dijeService } from '../../firebase/dije/Dije.service';
import { Manilla } from '../../interface/manilla.interface';



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
    manilla?: Manilla
}

export const CardManilla = ({ manilla }: Props) => {
    const [expanded, setExpanded] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    return (

        <Card
            sx={{
                width: {
                    xs: '100%', sm: 400, lg: 400
                },
                borderRadius: '2rem'
            }}>
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
                title={manilla?.name ?? "Shrimp and Chorizo Paella"}
            // subheader="September 14, 2016"
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
                component="img"
                image={manilla?.img ?? ManillaImage}
                alt="Paella dish"
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <FormSelectManilla />
                </CardContent>
            </Collapse>
        </Card >


    )
}
