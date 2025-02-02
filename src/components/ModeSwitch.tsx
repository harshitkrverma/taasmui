'use client';
import { useColorScheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Box from '@mui/material/Box';

export default function ModeSwitch() {
    const { mode, setMode, systemMode } = useColorScheme();

    const handleToggle = () => {
        const currentMode = mode === 'system' ? systemMode : mode;
        setMode(currentMode === 'dark' ? 'light' : 'dark');
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
            <LightModeIcon fontSize="small" />
            <Switch
                checked={mode === 'system' ? systemMode === 'dark' : mode === 'dark'}
                onChange={handleToggle}
                inputProps={{ 'aria-label': 'Theme toggle' }}
            />
            <DarkModeIcon fontSize="small" />
        </Box>
    );
}