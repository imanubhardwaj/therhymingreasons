import {database} from 'firebase'
import {Observable, Subject} from 'rxjs'
import {Post} from "@/models/post";
import {Comment} from "@/models/comment";
import {About} from "@/models/about";

export class FirebaseService {
	private static instance: FirebaseService;
	public searchQuery = new Subject<string>();

	private constructor() {
	}

	public static getInstance(): FirebaseService {
		return this.instance || (this.instance = new this());
	}

	getPosts(): Observable<Post[]> {
		return new Observable(subscriber => {
			database().ref().child('posts').on('value', data => {
				const posts: Post[] = [];
				if (data && data.toJSON()) {
					const json: any = data.toJSON();
					Object.keys(json).forEach((key: string) => {
						let post: Post = json[key];
						const comments: Comment[] = [];
						Object.keys(post.comments || {}).forEach((key: any) => {
							comments.push(post.comments[key])
						});
						post = {...post, comments};
						posts.push(post)
					})
				}
				posts.sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());
				subscriber.next(posts)
			}, (error: any) => subscriber.error(error))
		})
	}

	getPost(slug: string): Observable<Post> {
		return new Observable(subscriber => {
			database().ref().child('posts').orderByChild('slug').equalTo(slug)
			.on('value', data => {
				let post: Post;
				if (data && data.toJSON()) {
					const json: any = data.toJSON();
					const key = Object.keys(json)[0];
					post = json[key];
					const comments: Comment[] = [];
					Object.keys(post.comments || {}).forEach((key: any) => {
						comments.push(post.comments[key])
					});
					post = {...post, comments}
				}
				// @ts-ignore
				subscriber.next(post)
			}, (error: any) => subscriber.error(error))
		})
	}

	postComment(slug: string, commentObj: Comment): Observable<void> {
		return new Observable(subscriber => {
			const dbRef = database().ref().child('posts');
			dbRef.orderByChild('slug').equalTo(slug)
			.once('value', data => {
				if (data && data.toJSON()) {
					const json: any = data.toJSON();
					const key = Object.keys(json)[0];
					dbRef.child(key).child('comments').push(commentObj)
				}
				subscriber.next();
				subscriber.complete()
			}, (error: any) => subscriber.error(error))
		})
	}

	getAboutPageContent(): Observable<About> {
		return new Observable(subscriber => {
			database().ref().child('about').on('value',
			data => subscriber.next(data.toJSON() as About),
			(error: any) => subscriber.error(error));
		});
	}
}
