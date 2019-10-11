import {database} from 'firebase'
import {Post} from "~/models/post";
import {About} from "~/models/about";
import {Comment} from "~/models/comment";
import {Observable, Subject} from "~/node_modules/rxjs";

export class FirebaseService {
	private static _instance: FirebaseService;
	public searchQuery = new Subject<string>();

	private constructor() {}

	public static getInstance(): FirebaseService {
		return this._instance || (this._instance = new FirebaseService());
	}

	getPosts(): Observable<Post[]> {
		return new Observable(observer => {
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
				observer.next(posts)
			}, (error: any) => observer.error(error))
		})
	}

	getPost(slug: string): Promise<Post> {
		return new Promise<Post>((resolve, reject) => {
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
				resolve(post)
			}, (error: any) => reject(error))
		})
	}

	postComment(slug: string, commentObj: Comment): Observable<void> {
		return new Observable(observer => {
			const dbRef = database().ref().child('posts');
			dbRef.orderByChild('slug').equalTo(slug)
			.once('value', data => {
				if (data && data.toJSON()) {
					const json: any = data.toJSON();
					const key = Object.keys(json)[0];
					dbRef.child(key).child('comments').push(commentObj)
				}
				observer.next();
				observer.complete()
			}, (error: any) => observer.error(error))
		})
	}

	getAboutPageContent(): Observable<About> {
		return new Observable(observer => {
			database().ref().child('about').on('value',
			data => observer.next(data.toJSON() as About),
			(error: any) => observer.error(error));
		});
	}

	updatePostViewCount(slug: string, count: number): Observable<void> {
		return new Observable(observer => {
			const dbRef = database().ref().child('posts');
			dbRef.orderByChild('slug').equalTo(slug)
				.once('value', data => {
					if (data && data.toJSON()) {
						const json: any = data.toJSON();
						const key = Object.keys(json)[0];
						dbRef.child(key).child('views').set(count)
					}
					observer.next();
					observer.complete()
				}, (error: any) => observer.error(error))
		})
	}
}
