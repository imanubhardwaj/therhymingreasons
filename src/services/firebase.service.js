import { database } from 'firebase'
import { Observable } from 'rxjs'

const FirebaseService = {
  getPosts: function () {
    return new Observable(subscriber => {
      database().ref().child('posts').on('value', data => {
        const posts = []
        if (data && data.toJSON()) {
          const json = data.toJSON()
          Object.keys(json).forEach(key => posts.push({ ...json[key], id: key }))
        }
        posts.sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())
        subscriber.next(posts)
      }, error => subscriber.error(error))
    })
  }
}

export default FirebaseService
