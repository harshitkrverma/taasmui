"use client";
import { useState } from 'react';
import {
    AppBar,
    Box,
    Container,
    MenuItem,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    Button,
    Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/navigation';
import ModeSwitch from "@/components/ModeSwitch";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Type definitions
interface PageItem {
    title: string;
    path?: string;
    subMenu?: SubMenuItem[];
}

interface SubMenuItem {
    title: string;
    path: string;
}

const pages: PageItem[] = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    {
        title: 'Tools',
        subMenu: [
            { title: 'Pins', path: '/tools/pins' },
            { title: 'Health Check', path: '/tools/healthcheck' },
            { title: 'Encoder', path: '/tools/encoder' }

        ]
    },
    { title: 'FAQ\'s', path: '/faqs' }
];

const userPages = [
    { title: 'Profile', path: '/profile' },
    { title: 'History', path: '/history' }
];

// Type guard function
const hasSubMenu = (item: PageItem): item is PageItem & { subMenu: SubMenuItem[] } => {
    return !!item.subMenu;
};

export default function NavBar() {
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
    const [anchorElTools, setAnchorElTools] = useState<HTMLElement | null>(null);

    const handleNavigation = (path?: string) => {
        if (path) {
            router.push(path);
            setAnchorElNav(null);
            setAnchorElUser(null);
            setAnchorElTools(null);
        }
    };

    const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElTools(event.currentTarget);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Logo section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Box
                            component="img"
                            src="/Jenkins.png"
                            sx={{
                                height: 40,
                                display: { xs: 'none', md: 'flex' },
                                mr: 1
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="a"
                            href="/"
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TAAS
                        </Typography>
                    </Box>

                    {/* Mobile menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={(e) => setAnchorElNav(e.currentTarget)}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={() => setAnchorElNav(null)}
                        >
                            {pages.map((page) => (
                                hasSubMenu(page) ? (
                                    <div key={page.title}>
                                        <MenuItem onClick={handleOpenSubMenu}>
                                            {page.title}
                                            <ArrowDropDownIcon fontSize="small" />
                                        </MenuItem>
                                        <Menu
                                            anchorEl={anchorElTools}
                                            open={Boolean(anchorElTools)}
                                            onClose={() => setAnchorElTools(null)}
                                        >
                                            {page.subMenu.map((subItem) => (
                                                <MenuItem
                                                    key={subItem.title}
                                                    onClick={() => handleNavigation(subItem.path)}
                                                >
                                                    {subItem.title}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                ) : (
                                    <MenuItem
                                        key={page.title}
                                        onClick={() => handleNavigation(page.path)}
                                    >
                                        {page.title}
                                    </MenuItem>
                                )
                            ))}
                        </Menu>
                    </Box>

                    {/* Desktop menu */}
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        gap: 2,
                        ml: 3
                    }}>
                        {pages.map((page) => (
                            hasSubMenu(page) ? (
                                <Box key={page.title} sx={{ position: 'relative' }}>
                                    <Button
                                        onClick={handleOpenSubMenu}
                                        sx={{ color: 'white' }}
                                        endIcon={<ArrowDropDownIcon />}
                                    >
                                        {page.title}
                                    </Button>
                                    <Menu
                                        anchorEl={anchorElTools}
                                        open={Boolean(anchorElTools)}
                                        onClose={() => setAnchorElTools(null)}
                                    >
                                        {page.subMenu.map((subItem) => (
                                            <MenuItem
                                                key={subItem.title}
                                                onClick={() => handleNavigation(subItem.path)}
                                            >
                                                {subItem.title}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            ) : (
                                <Button
                                    key={page.title}
                                    onClick={() => handleNavigation(page.path)}
                                    sx={{ color: 'white' }}
                                >
                                    {page.title}
                                </Button>
                            )
                        ))}
                    </Box>

                    <ModeSwitch />

                    {/* User menu */}
                    <Box sx={{ flexGrow: 0, ml: 2 }}>
                        <Tooltip title="User menu">
                            <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                                <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={() => setAnchorElUser(null)}
                        >
                            {userPages.map((userPage) => (
                                <MenuItem
                                    key={userPage.title}
                                    onClick={() => handleNavigation(userPage.path)}
                                >
                                    {userPage.title}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}