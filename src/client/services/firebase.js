import {database} from 'firebase/app';
import CancelablePromise from "../utils/cancelable-promise";

export default class Firebase {
    static getAboutPageContent() {
        return new CancelablePromise((resolve, reject) => {
            database().ref().child('about').on('value',
                data => resolve(data.toJSON()), error => reject(error.message));
        });
    }
}
