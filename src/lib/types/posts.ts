import type { Post, Comment } from '$lib/types/reddit';

export interface Batch {
	posts: Post[];
	batch_count: number;
	after_id: string;
}
