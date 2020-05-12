import axios from "axios";
import CancelablePromise from "../utils/cancelable-promise";

class ApiService {
    constructor() {
        axios.defaults.baseURL = "https://trr-backend.herokuapp.com/api/v1"
    }

    getPosts() {
        return new CancelablePromise((resolve, reject) => {
            axios.get("posts").then(res => resolve(res.data.data), error => reject(error.message));
        });
    }

    getPost(slug) {
        return new CancelablePromise((resolve, reject) => {
            axios.get(`posts/${slug}`).then(res => resolve(res.data.data), error => reject(error.message));
        });
    }

    postComment(slug, data) {
        return new CancelablePromise((resolve, reject) => {
            axios.post(`posts/${slug}/comment`, data).then(res => resolve(res.data.data), error => reject(error.message));
        })
    }
}
export default new ApiService();
