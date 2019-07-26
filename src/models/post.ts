import {Comment} from "@/models/comment";

export interface Post {
	slug: string;
	title: string;
	img: string;
	content: string;
	date: number;
	tags: string;
	author: string;
	comments: Comment[];
	views?: number;
	audioUrl?: string;
	audioState: AudioState;
}

export enum AudioState {
	READY = 'ready',
	PLAYING = 'playing',
	PAUSED = 'paused',
	ENDED = 'ended'
}
