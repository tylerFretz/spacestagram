import React, { useState } from 'react';
import { Card, CardContent, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { usePostByDate } from '../../hooks/usePosts';
import useLockedBody from '../../hooks/useLockedBody';
import PostActions from './PostActions';
import ToggleableText from './ToggleableText';
import ExpandableImage from './ExpandableImage';

const useStyles = makeStyles((theme: Theme) => ({
	postCard: {
		maxWidth: '60vw',
		[theme.breakpoints.down('md')]: {
			maxWidth: '95vw'
		}
	},
	contentTopContainer: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}));


interface Props {
	date: string
}

const PostCard = ({ date }: Props) => {
	const classes = useStyles();
	const [isExpanded, setIsExpanded] = useState(false);
	const [locked, setLocked] = useLockedBody(false);
	const api = usePostByDate(date);

	const toggleFullscreen = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setIsExpanded(prev => !prev);
		setLocked(!locked);
	}

	if (!api.data) return null;
	const post = api.data;

	return (
		<Card className={classes.postCard}>
			<ExpandableImage
				url={post.url}
				title={post.title}
				mediaType={post.media_type}
				toggleFullscreen={toggleFullscreen}
				isExpanded={isExpanded}
				description={post.explanation}
			/>
			<CardContent>
				<div className={classes.contentTopContainer}>
					<Typography variant='h5' component='h5'>
						{post.title}
					</Typography>
					<PostActions date={date} toggleFullscreen={toggleFullscreen} mediaType={post.media_type} />
				</div>
				<Typography variant='subtitle1' component='h6'>{post.date}</Typography>
				<ToggleableText text={post.explanation} />
			</CardContent>
		</Card>
	)
};

export default PostCard;