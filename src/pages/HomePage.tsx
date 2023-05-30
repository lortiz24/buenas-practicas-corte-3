import { useState } from 'react'
import { CardManilla } from "../components/card-manilla/CardManilla"
import { Box, Grid } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export const HomePage = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Construir Manilla" value="1" />
                        <Tab label="Listado" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                    >
                        <CardManilla />
                    </Box>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
        </Box>
    )
}
