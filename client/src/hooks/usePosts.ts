import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useFingerPrintId } from '../context/FingerPrintContext';

const BASE_URL = '/api/posts';

const getPosts = async (startDate: string, endDate: string) => {
	const { data } = await axios.get(`${BASE_URL}/nasa/${startDate}/${endDate}`);
	return data;
}

const getPostVote = async (date: string) => {
	return await axios.get(`${BASE_URL}/votes/${date}`);
}

const vote = (date: string, id: string) => {
	return axios.post(`${BASE_URL}/vote/${date}`, null, {
		headers: { 'Authorization': id }
	});
}

export const usePostsByDateRange = (startDate: string, endDate: string) => (
	useQuery(
		['posts', 'list'], 
		() => getPosts(startDate, endDate)
	)
);

export const useGetPostVote = (date: string) => (
	useQuery(
		['posts', 'votes', date],
		() => getPostVote(date)
	)
);

export const useVote = (date: string) => {
	const queryclient = useQueryClient();
	const { fingerPrintId } = useFingerPrintId();

	return useMutation(
		(newVoteCount) => vote(date, fingerPrintId), {
			onSuccess: (newVote) => {
				queryclient.setQueryData(['posts', 'votes', date], newVote);
			}
		}
	);
}

