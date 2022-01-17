import React from 'react';
import { CardMedia, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	imageContainer: {
		position: 'relative',
		paddingBottom: '56.25%', // 16:9 ratio
		height: 0,
		overflow: 'hidden',
		textAlign: 'center',
		marginBottom: '1rem'
	},
	image: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		border: 'none'
	},
	imageModal: {
		width: '100%',
		maxHeight: '95vh',
		maxWidth: '95vw'
	},
	overlay: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'fixed',
		width: '100vw',
		height: '100vh',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 5, 0.95)',
		zIndex: 99,
		cursor: 'pointer',
		paddingTop: '1%',
		overflow: 'scroll'
	},
	overlayButton: {
		position: 'absolute',
		right: 0,
		margin: '1rem 1rem'
	},
});

interface Props {
	url?: string
	title: string
	mediaType: string
	toggleFullscreen: (event: React.MouseEvent<HTMLElement>) => void
	isExpanded: boolean
	description: string
	copyright?: string
	date: string
}

const ExpandableImage = ({ url, title, mediaType, toggleFullscreen, isExpanded, description, copyright, date }: Props) => {
	const classes = useStyles();

	return (
		<>
		{/* wrapping image in container to prevent layout shifts using the padding-bottom hack  */}
			<div className={classes.imageContainer}>
				<CardMedia
					className={classes.image}
					// media type may be a video, in which case iframe is needed
					component={mediaType === 'image' ? 'img' : 'iframe'}
					alt={title}
					src={url}
					title={mediaType === 'image' ? `Image of ${title}` : `Video of ${title}`}
					allowFullScreen
					loading='lazy'
				/>
				{isExpanded && (
					<div className={classes.overlay}>
							<IconButton onClick={toggleFullscreen} component='span' role='button' style={{ alignSelf: 'flex-end', opacity: .8, color: '#FFF' }}>
								<CloseIcon />
							</IconButton>
						<div className={classes.imageContainer}>
							<img src={url} alt={title} className={classes.imageModal}></img>
						</div>
						<div style={{ padding: '1% 2%' }}>
							<Typography variant='subtitle1' style={{ textIndent: '30px', textAlign: 'justify', color: '#FFF', fontSize: '.85rem' }}>
								{description}
							</Typography>
							<p style={{ color: '#FFF', fontSize: '.75rem', paddingTop: '1.5 rem' }}>
								Photo taken {date}
								{copyright && (
									<span> by {copyright}</span>
								)}
							</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default ExpandableImage;