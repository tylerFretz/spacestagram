const express = require('express');
import { Request, Response } from 'express';
const Post = require('../models/Post');
const postRouter = express.Router();

interface ParamReq extends Request {
	params: Record<string, string>,
	authorization?: string
}

/**
 * @summary - Vote on a post. Uses FingerPrintJS hash to relate a user to a vote.
 * @param date - Required. String in the format 'YYYY-MM-DD'. Each post should have a unique date.
 * @param authorization - Required in header. String fingerprint hash that identifies a user.
 */
postRouter.post('/:date', async (req: ParamReq, res: Response) => {
	const { date } = req.params;
	const isDate = date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/g);

	// check if date is correct format
	if (!isDate) {
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
		return res.json({ votes: 1 });
	} else {
		// if a user has already voted for a post
		if (post.votes.some(id => id === authorization)) {
			post.votes = post.votes.filter(id => id !== authorization);
		}
		// if a user has not voted for the post yet
		else {
			post.votes = post.votes.concat(authorization);
		}
		await post.save();
		return res.json({ votes: post.votes.length });
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
		return res.sendStatus(400);
	}

	const post = await Post.findOne({ date: req.params.date });

	if (post) {
		return res.json({ votes: post.votes.length });
	} else {
		return res.json({ votes: 0 });
	}
});

module.exports = postRouter;