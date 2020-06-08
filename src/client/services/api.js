import axios from "axios";
import CancelablePromise from "../utils/cancelable-promise";

class ApiService {
    constructor() {
        axios.defaults.baseURL = process.env.API_BASE_URL
    }

    getPosts() {
        return new CancelablePromise((resolve, reject) => {
            axios.get("posts")
                .then(res => resolve(res.data.data))
                .catch(error => reject(error.message));
        });
    }

    searchPosts(query) {
        return new CancelablePromise((resolve, reject) => {
            axios.get(`search?query=${query}`)
                .then(res => resolve(res.data.data))
                .catch(error => reject(error.message));
        });
    }

    getPost(slug) {
        return new CancelablePromise((resolve, reject) => {
            axios.get(`posts/${slug}`)
                .then(res => resolve(res.data.data))
                .catch(error => reject(error.message));
        });
    }

    postComment(slug, data) {
        return new CancelablePromise((resolve, reject) => {
            axios.post(`posts/${slug}/comment`, data)
                .then(res => resolve(res.data.data))
                .catch(error => reject(error.message));
        })
    }
}
export default new ApiService();
