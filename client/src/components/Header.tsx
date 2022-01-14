import React from 'react';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ToggleThemeButton from './ToggleThemeButton';


const useStyles = makeStyles((theme: Theme) => ({
	header: {
		position: 'relative',
		width: '100%',
		top: 0,
		backgroundColor: theme.palette.mode === 'dark' ? 'teal' : '#FFF',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 1.4rem',
		height: '4rem',
		boxShadow: '0 2px 2px rgba(0 , 0, 0, 0.1)',
	},
	logo: {
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 15px',
	}
}));

const Header = () => {
	const classes = useStyles();

	return (
		<div className={classes.header}>
			<div style={{ display: 'flex' }}>
			<div className={classes.logo}>
				<img src='/images/logo.png' alt='spacestagram logo' style={{ height: '50px' }} />
			</div>
			<h1 style={{ marginLeft: '10%'}}>Spacestagram</h1>
			</div>
			<ToggleThemeButton />
		</div>
	)
};

export default Header;