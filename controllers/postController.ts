const postRouter = require('express').router();
import { Request, Response } from 'express';
const Post = require('../models/Post');

interface ParamReq extends Request {
	params: Record<string, string>,
	fingerPrintId?: string
}

/**
 * @summary - Vote on a post. Uses FingerPrintJS hash to relate a user to a vote.
 * @param date - Required string in the format 'YYYY-MM-DD'. Each post should have a unique date.
 * @param fingerPrintId - Required string hash that identifies a user. In request header.
 */
postRouter.post('/:date/vote', async (req: ParamReq, res: Response) => {
	const { date } = req.params;
	const isDate = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g);

	// check if date is correct format
	if (!isDate) {
		return res.status(400).json({ error: 'Invalid date parameter' });	
	}

	const { fingerPrintId } = req;
	const post = await Post.findOne({ date: req.params.date });

	// check if post already exists in db. Create record of post if not.
	if (!post) {
		const newPost = new Post({
			date: new Date(date),
			votes: [fingerPrintId]
		});

		await newPost.save();
		return res.status(201);
	} else {
		post.votes = post.votes.concat(fingerPrintId);
		await post.save();
		return res.status(200);
	}
});

/**
 * @summary - Get vote count.
 * @param date - Required string in the format 'YYYY-MM-DD'. Each post should have a unique date.
 * @returns - amount of votes the post has as a number.
 */
postRouter.get('/:date', async (req: ParamReq, res: Response) => {
	const { date } = req.params;
	const isDate = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g);

	// check if date is correct format
	if (!isDate) {
		return res.status(400).json({ error: 'Invalid date parameter' });	
	}

	const post = await Post.findOne({ date: req.params.date });

	if (post) {
		return res.status(200).send(post.votes.length);
	} else {
		return res.status(404).send(0);
	}
});

module.exports = postRouter();