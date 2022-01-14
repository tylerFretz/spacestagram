import React from 'react';
import { IconButton, Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder, Fullscreen } from '@mui/icons-material';
import { useGetPostVote, useVote } from '../../hooks/usePosts';

interface Props {
	date: string,
	toggleFullscreen: (event: React.MouseEvent<HTMLElement>) => void,
	mediaType: string
}

const PostActions = ({ date, toggleFullscreen, mediaType }: Props) => {
	const { mutate } = useVote(date);
	const voteCount = useGetPostVote(date);


	if (!voteCount.data) return null;

	const count = voteCount.data.votes;

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{ display: 'flex', margin: '0 .5rem' }}>
			<Checkbox
				icon={<FavoriteBorder />}
				checkedIcon={<Favorite color='error' />}
				onChange={() => mutate()}
				inputProps={{ 'aria-label': 'Like checkbox' }}
				checked={voteCount.data.userLiked}
			/>
				<p aria-label='Vote count'>{count}</p>
			</div>
			{mediaType === 'image' && (
				<IconButton onClick={toggleFullscreen} aria-label='Toggle Fullscreen' >
					<Fullscreen />
				</IconButton>
			)}
		</div>
	);
}

export default PostActions;