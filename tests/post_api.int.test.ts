import supertest from 'supertest';
import app from '../index';
const Post = require('../models/Post');

const api = supertest(app);
const testFingerPrintHashes = ['12345ABCDE6789FGH', 'ASJHW85635354SDASD'];


beforeEach(async () => {
	await Post.deleteMany({});
});

describe('Fetching count of single post - GET /api/posts/votes/:date', () => {
	beforeEach(async () => {
		await api
			.post('/api/posts/votes/1999-12-25')
			.set('Authorization', testFingerPrintHashes[0]);
	});

	test('Count is returned as 0 for posts not in db', async () => {
		const res = await api.get('/api/posts/votes/2005-12-25');
		expect(res.body.votes).toBe(0);
	});

	test('Count is returned as 1 for a post with 1 vote', async () => {
		const res = await api.get('/api/posts/votes/1999-12-25');
		expect(res.body.votes).toBe(1);
	});
});


describe('Voting on a post - POST /api/posts', () => {
	test('A user can vote on a post that they have not before', async () => {
		const beforeVote = await api.get('/api/posts/votes/1999-12-25');
		const afterVote = await api.post('/api/posts/vote/1999-12-25').set('Authorization', testFingerPrintHashes[0]);
		expect(beforeVote.body.votes).toBe(0);
		expect(afterVote.body.votes).toBe(1);
	});

	test('A user can remove their vote', async () => {
		const voteRes = await api.post('/api/posts/vote/1999-12-25').set('Authorization', testFingerPrintHashes[0]);
		const removeVoteRes = await api.post('/api/posts/vote/1999-12-25').set('Authorization', testFingerPrintHashes[0]);
		expect(voteRes.body.votes).toBe(1);
		expect(removeVoteRes.body.votes).toBe(0);
	});

	test('Multiple users can vote on a post', async () => {
		const firstVote = await api.post('/api/posts/vote/1999-12-25').set('Authorization', testFingerPrintHashes[0]);
		const secondVote = await api.post('/api/posts/vote/1999-12-25').set('Authorization', testFingerPrintHashes[1]);
		expect(firstVote.body.votes).toBe(1);
		expect(secondVote.body.votes).toBe(2);
	});
});
