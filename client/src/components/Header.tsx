import React from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import ToggleThemeButton from './ToggleThemeButton';


const useStyles = makeStyles((theme: Theme) => ({
	header: {
		position: 'sticky',
		zIndex: 99,
		width: '100%',
		top: 0,
		backgroundColor: theme.palette.mode === 'dark' ? 'teal' : '#FFF',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 1.4rem',
		height: '4rem',
		boxShadow: '0 2px 2px rgba(0 , 0, 0, 0.3)',
	},
	logoContainer: {
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 15px',
		[theme.breakpoints.down('sm')]: {
			padding: 0,
			marginRight: '15px'
		}
	},
	logo: {
		height: '3rem'
	}
}));

const Header = () => {
	const classes = useStyles();
	const theme: Theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div className={classes.header}>
			<div style={{ display: 'flex' }}>
			<div className={classes.logoContainer}>
				<img className={classes.logo} src='/images/logo.png' alt='spacestagram logo' />
			</div>
			<div style={{ paddingLeft: '.5rem', paddingRight: '1.5rem' }}>
				<h1 style={{ margin: 0, fontSize: isMobile ? '1rem' : '2rem', lineHeight: 1.3 }}>Spacestagram</h1>
				<p style={{ margin: 0, fontSize: isMobile ? '.6rem' : '.85rem' }}>The most recent images from NASA's Astronomy Picture of the Day</p>
			</div>
			</div>
			<ToggleThemeButton />
		</div>
	)
};

export default Header;