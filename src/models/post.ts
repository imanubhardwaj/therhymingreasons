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
}
