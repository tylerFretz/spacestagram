import React from 'react';
import { Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'; 
import PostList from './components/PostList';
import Header from './components/Header';


const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.mode === 'dark' ? '#222222' : '#DDE4E7',
		transition: 'background 0.5s ease',
		minHeight: '100vh'
	}
}))

const App = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Header />
			<PostList />
		</div>
	)
}

export default App;
