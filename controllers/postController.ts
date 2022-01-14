const express = require('express');
import axios from 'axios';
import { Request, Response } from 'express';
const Post = require('../models/Post');
const postRouter = express.Router();

interface ParamReq extends Request {
	params: Record<string, string>,
	authorization?: string
}

const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&`;

const isDate = (date: string) => {
	const match = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g);
	return match;
};

/**
 * @summary - Calls the NASA APOD API to get a single posts by date.
 * @param date - Required. String in the format 'YYYY-MM-DD'.
 * @returns - post object
 */
postRouter.get('/nasa/:date', async (req: ParamReq, res: Response) => {
	const { date } = req.params;

	// check if date is correct format
	if (!isDate(date)) {
		return res.sendStatus(400);
	}

	const { data } = await axios.get(`${NASA_URL}date=${date}`);

	if (data) {
		return res.json(data);
	} else {
		return res.sendStatus(404);
	}
});

/**
 * @summary - Calls the NASA APOD API to get a list of posts by date range.
 * @param startDate - Required. String in the format 'YYYY-MM-DD'.
 * @param endDate - Required. String in the format 'YYYY-MM-DD'.
 * @returns - Array of image post objects
 */
postRouter.get('/nasa/list/:startDate/:endDate', async (req: ParamReq, res: Response) => {
	const { startDate, endDate } = req.params;
	
	// check if date is correct format
	if (!isDate(startDate) || !isDate(endDate)) {
		return res.sendStatus(400);
	}

	const { data } = await axios.get(`${NASA_URL}start_date=${startDate}&end_date=${endDate}`);
	if (data) {
		// sort returned array by date property descending
		data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
		return res.json(data);
	} else {
		return res.sendStatus(404);
	}
});


/**
 * @summary - Vote on a post. Uses FingerPrintJS hash to relate a user to a vote.
 * @param date - Required. String in the format 'YYYY-MM-DD'. Each post should have a unique date.
 * @param authorization - Required in header. String fingerprint hash that identifies a user.
 * @returns - amount of votes the post has as a number.
 */
postRouter.post('/vote/:date', async (req: ParamReq, res: Response) => {
	const { date } = req.params;

	// check if date is correct format
	if (!isDate(date)) {
		return res.sendStatus(400);	
	}

	const { authorization } = req.headers;
	if (!authorization) {
		return res.sendStatus(401);
	}

	const post = await Post.findOne({ date: req.params.date });

	// check if post already exists in db. Create record of post if not.
	if (!post) {
		const newPost = new Post({
			date: new Date(date),
			votes: [authorization]
		});

		await newPost.save();
		return res.json({ votes: 1, userLiked: true });
	} else {
		// if a user has already voted for a post
		if (post.votes.some(id => id === authorization)) {
			post.votes = post.votes.filter(id => id !== authorization);
			await post.save();
			return res.json({ votes: post.votes.length, userLiked: false });
		}
		// if a user has not voted for the post yet
		else {
			post.votes = post.votes.concat(authorization);
			await post.save();
			return res.json({ votes: post.votes.length, userLiked: true });
		}
	}
});

/**
 * @summary - Get vote count.
 * @param date - Required string in the format 'YYYY-MM-DD'. Each post should have a unique date.
 * @returns - amount of votes the post has as a number.
 */
postRouter.get('/votes/:date', async (req: ParamReq, res: Response) => {
	const { date } = req.params;

	// check if date is correct format
	if (!isDate(date)) {
		return res.sendStatus(400);
	}

	const post = await Post.findOne({ date: req.params.date });

	if (post) {
		const { authorization } = req.headers;
		const votes: string[] = post.votes;
		if (authorization && votes.some((id) => id === authorization)) {
			return res.json({ votes: post.votes.length, userLiked: true });
		} else {
			return res.json({ votes: post.votes.length, userLiked: false });
		}
	} else {
		return res.json({ votes: 0, useLiked: false });
	}
});

module.exports = postRouter;