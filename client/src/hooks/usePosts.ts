import { useQuery } from "react-query";
import axios from 'axios';

interface Post {
	date: string,
	explanation: string,
	hdurl: string,
	media_type: string,
	service_version: string,
	title: string,
	url: string,
	copyright?: string
}

const BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&`;

const getPostByDate = (date: string) =>	{
	return axios.get(`${BASE_URL}date=${date}`);
}

const getPostsByDateRange = (startDate: string, endDate: string) => {
	return axios.get(`${BASE_URL}start_date=${startDate}&end_date=${endDate}`);
}

