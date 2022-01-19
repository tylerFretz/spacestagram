import React, { useState, useEffect, lazy, Suspense } from 'react';
import { format, subDays } from 'date-fns';
import { Stack, Theme, CircularProgress, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { usePostsByDateRange } from '../hooks/usePosts';
const PostCard = lazy(() => import('./PostCard'));

const useStyles = makeStyles((theme: Theme) => ({
	listContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0% 10%',
		padding: '2% 5%',
		[theme.breakpoints.down('sm')]: {
			margin: '2% 0'
		}
	},
	progress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: '-12px',
		marginLeft: '-12px'
	}
}));

interface Props {
	length: number
}

const PostList = ({ length }: Props) => {
	const [startDate, setStartDate] = useState(format(subDays(Date.now(), length - 1), 'yyyy-MM-dd'));
	const api = usePostsByDateRange(startDate, format(Date.now(), 'yyyy-MM-dd'));
	const classes = useStyles();

	useEffect(() => {
		api.refetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate]);



	const loadMore = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setStartDate(format(subDays(Date.parse(startDate), length - 1), 'yyyy-MM-dd'));
	}

	

	return api.data ? (
		<section className={classes.listContainer}>
			<Stack direction='column' spacing={2} alignItems='center'>
				<Suspense fallback={<CircularProgress size={200} style={{ padding: '3rem' }} />}>
					{api.data.map((post) => (
						<PostCard key={post.date} date={post.date} />
					))}
				</Suspense>
				<div style={{ position: 'relative' }}>
						<Button
							variant='contained'
							disabled={api.isFetching}
							onClick={loadMore}
						>
							Load more
						</Button>
						{api.isFetching && (
							<CircularProgress size={24} className={classes.progress} />
						)}
				</div>
			</Stack>
		</section>
	) : null;
}

export default PostList;