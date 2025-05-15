import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const pages = [
  { title: 'Quem Somos', path: '/quem-somos' },
  { title: 'Notícias', path: '/noticias' },
  { title: 'Como Se Tornar um Escoteiro', path: '/como-se-tornar-escoteiro' },
  { title: 'Contato', path: '/contato' }
]

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
              height: 72,
            }}
          >
            <img
              src="/src/assets/logo-sucuarana.jpeg"
              alt="Logo Suçuarana"
              style={{
                height: 64,
                width: 'auto',
                display: 'block',
                background: 'transparent',
                marginRight: 16
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#BC884F', ml: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: 18, lineHeight: 1 }}>
                283
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: 18, lineHeight: 1 }}>
                Grupo Escoteiro
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: 18, lineHeight: 1 }}>
                Suçuarana
              </Typography>
            </Box>
          </Box>
          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: '#BC884F' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.path}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.path}
                >
                  <Typography textAlign="center" sx={{ color: '#BC884F' }}>{page.title}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={handleCloseNavMenu}
                component={RouterLink}
                to="/admin"
              >
                <Typography textAlign="center" sx={{ color: '#BC884F' }}>Admin</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* Logo - Mobile */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              textDecoration: 'none',
              height: 56,
            }}
          >
            <img
              src="/src/assets/logo-sucuarana.jpeg"
              alt="Logo Suçuarana"
              style={{
                height: 44,
                width: 'auto',
                display: 'block',
                background: 'transparent',
                marginRight: 8
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#BC884F', ml: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: 14, lineHeight: 1 }}>
                283
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: 14, lineHeight: 1 }}>
                Grupo Escoteiro
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: 14, lineHeight: 1 }}>
                Suçuarana
              </Typography>
            </Box>
          </Box>
          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#BC884F', display: 'block', mx: 1 }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          {/* Admin button - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={RouterLink}
              to="/admin"
              variant="contained"
              sx={{
                my: 2,
                backgroundColor: '#BC884F',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#a06f3f'
                }
              }}
            >
              Admin
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar