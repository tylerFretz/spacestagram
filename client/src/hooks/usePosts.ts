import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useFingerPrintId } from '../context/FingerPrintContext';

const BASE_URL = '/api/posts';

// ### Helper functions ###

const getPost = async (date: string) => {
	const { data } = await axios.get(`${BASE_URL}/nasa/${date}`);
	return data;
}

const getPosts = async (startDate: string, endDate: string) => {
	const { data } = await axios.get(`${BASE_URL}/nasa/list/${startDate}/${endDate}`);
	return data;
}

const getPostVote = async (date: string, id: string) => {
	const { data } = await axios.get(`${BASE_URL}/votes/${date}`, { headers: { 'Authorization': id } });
	return data;
}

const vote = async (date: string, id: string) => {
	const { data } = await axios.post(`${BASE_URL}/vote/${date}`, null, { 
		headers: { 'Authorization': id }
	});
	return data;
}

// ### React-query custom hooks ###

export const usePostByDate = (date: string) => (
	useQuery(
		['posts', 'list', date],
		() => getPost(date)
	)
);

export const usePostsByDateRange = (startDate: string, endDate: string) => {
	const queryClient = useQueryClient();

	return useQuery(
		['posts', 'list'], 
		() => getPosts(startDate, endDate),
		{
			// create specific keys for each post in the cache so they can be accessed easier
			onSuccess: (data: any[]) => {
				data.forEach(post => {
					queryClient.setQueryData(['posts', 'list', post.date], post);
				})
			}
		}
	)
};

export const useGetPostVote = (date: string) => {
	const { fingerPrintId } = useFingerPrintId();
	return useQuery(
		['posts', 'votes', date],
		() => getPostVote(date, fingerPrintId)
	)
};

export const useVote = (date: string) => {
	const queryClient = useQueryClient();
	const { fingerPrintId } = useFingerPrintId();

	return useMutation(
		(newVoteCount) => vote(date, fingerPrintId), {
			onSuccess: (newVote) => {
				queryClient.setQueryData(['posts', 'votes', date], newVote);
			}
		}
	);
}

