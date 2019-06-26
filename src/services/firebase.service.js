import { database } from 'firebase'
import { BehaviorSubject, Observable } from 'rxjs'

export class FirebaseService {
  static searchQuery = new BehaviorSubject('');

  getPosts () {
    return new Observable(subscriber => {
      database().ref().child('posts').on('value', data => {
        const posts = []
        if (data && data.toJSON()) {
          const json = data.toJSON()
          Object.keys(json).forEach(key => {
            let post = json[key]
            const comments = []
            Object.keys(post.comments || {}).forEach(key => {
              comments.push(post.comments[key])
            })
            post = { ...post, comments }
            posts.push(post)
          })
        }
        posts.sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())
        subscriber.next(posts)
      }, error => subscriber.error(error))
    })
  }

  getPost (slug) {
    return new Observable(subscriber => {
      database().ref().child('posts').orderByChild('slug').equalTo(slug)
        .on('value', data => {
          let post = {}
          if (data && data.toJSON()) {
            const json = data.toJSON()
            const key = Object.keys(json)[0]
            post = json[key]
            const comments = []
            Object.keys(post.comments || {}).forEach(key => {
              comments.push(post.comments[key])
            })
            post = { ...post, comments }
          }
          subscriber.next(post)
        })
    })
  }

  postComment (slug, commentObj) {
    return new Observable(subscriber => {
      const dbRef = database().ref().child('posts')
      dbRef.orderByChild('slug').equalTo(slug)
        .once('value', data => {
          if (data && data.toJSON()) {
            const json = data.toJSON()
            const key = Object.keys(json)[0]
            dbRef.child(key).child('comments').push(commentObj)
          }
          subscriber.next()
          subscriber.complete()
        })
    })
  }
}

export default FirebaseService
