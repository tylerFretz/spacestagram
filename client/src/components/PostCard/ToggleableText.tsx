import React, { useState } from 'react';
import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSpring, config, animated } from 'react-spring';
import useElementSize from '../../hooks/useElementSize';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const useStyles = makeStyles((theme: Theme) => ({
	toggleButton: {
		border: 'none',
		backgroundColor: 'inherit',
		cursor: 'pointer',
		display: 'inline-block',
		color: theme.palette.mode === 'dark' ? '#AAA' : '#000',
		padding: 0,
		fontSize: '1.1rem',
		'&:hover': {
			color: theme.palette.success.light
		},
	}
}));

interface Props  {
	text: string
}

const ToggleableText = ({ text }: Props) => {
	const [hidden, setHidden] = useState(false);
	const [textRef, { height }] = useElementSize();
	const classes = useStyles();

	const slideInStyles = useSpring({
		config: { ...config.slow },
		from: { opacity: 0, height: 0 },
		to: {
			opacity: hidden ? 1 : 0,
			height: hidden ? height : 0
		}
	});

	const toggleHidden = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setHidden(prev => !prev);
	}

	return (
		<>
			<animated.div style={{ ...slideInStyles, overflow: 'hidden' }}>
				<Typography variant='body2' component='p' ref={textRef} style={{ textIndent: '30px', textAlign: 'justify' }}>
					{text}
				</Typography>
			</animated.div>
			<button onClick={toggleHidden} className={classes.toggleButton} aria-label='toggle description'>
				{hidden ? 'Hide description' : 'Read description'}
				<ArrowDropDownIcon 
					style={{
						transform: hidden ? '' : 'rotate(180deg)',
						transition: 'transform 900ms ease'
					}} 
				/>
			</button>
		</>
	);
}

export default ToggleableText;