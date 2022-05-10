import { dev } from '$app/env';

const scopes = 'identity,edit,flair,history,mysubreddits,read,report,save,subscribe,vote,wikiread';
const dev_id = 'tT1Kn4B5dgU6deCTXDlltw';
const prod_id = process.env.REDDIT_PROD_ID;
const dev_secret = "r4CGYtM5Zfgn5ZR5zyHDACE0HdQe4g"
const prod_secret = process.env.REDDIT_PROD_SECRET
const dev_uri = 'http://localhost:3000/api/login';
const prod_uri = 'https://arctic-reddit.vercel.app/api/login';

export const redirect_uri = dev ? dev_uri : prod_uri
export const client_id = dev ? dev_id : prod_id
export const reddit_secret = dev ? dev_secret : prod_secret
export const auth_url = dev
	? `https://www.reddit.com/api/v1/authorize.compact?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&duration=permanent&scope=${scopes}&state=arctic`
	: `https://www.reddit.com/api/v1/authorize.compact?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&duration=permanent&scope=${scopes}&state=arctic`;

