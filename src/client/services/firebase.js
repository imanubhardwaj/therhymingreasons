import {database} from 'firebase/app';
import CancelablePromise from "../utils/cancelable-promise";

export default class Firebase {
    static getPosts() {
        return new CancelablePromise((resolve, reject) => {
            database().ref().child('posts').on('value', data => {
                const posts = [];
                if (data && data.toJSON()) {
                    const json = data.toJSON();
                    Object.keys(json).forEach((key) => posts.push(json[key]));
                }
                posts.sort((post1, post2) => post2.date - post1.date);
                resolve(posts);
            }, error => reject(error.message));
        });
    }

    static getPost(slug) {
        return new CancelablePromise((resolve, reject) => {
            database().ref().child('posts').orderByChild('slug').equalTo(slug)
                .on('value', data => {
                    let post;
                    if (data && data.toJSON()) {
                        const json = data.toJSON();
                        const key = Object.keys(json)[0];
                        post = json[key];
                        let comments = [];
                        Object.keys(post.comments || {}).forEach(key => comments.push(post.comments[key]));
                        if (!comments.length) {
                            comments = null;
                        }
                        post = {...post, comments};
                    }
                    resolve(post);
                }, error => reject(error.message));
        });
    }

    static updatePostViewCount(slug, count) {
        return new CancelablePromise((resolve, reject) => {
            const dbRef = database().ref().child('posts');
            dbRef.orderByChild('slug').equalTo(slug)
                .once('value', data => {
                    if (data && data.toJSON()) {
                        const json = data.toJSON();
                        const key = Object.keys(json)[0];
                        dbRef.child(key).child('views').set(count);
                    }
                    resolve();
                }, error => reject(error.message));
        })
    }

    static postComment(slug, commentObj) {
        return new CancelablePromise((resolve, reject) => {
            const dbRef = database().ref().child('posts');
            dbRef.orderByChild('slug').equalTo(slug)
                .once('value', data => {
                    if (data && data.toJSON()) {
                        const json = data.toJSON();
                        const key = Object.keys(json)[0];
                        dbRef.child(key).child('comments').push(commentObj)
                    }
                    resolve();
                }, error => reject(error.message));
        })
    }

    static getAboutPageContent() {
        return new CancelablePromise((resolve, reject) => {
            database().ref().child('about').on('value',
                data => resolve(data.toJSON()), error => reject(error.message));
        });
    }
}
