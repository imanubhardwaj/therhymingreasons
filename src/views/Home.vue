<template>
  <div class="home">
    <Post v-for="post in posts" :key="post.title" :post="post" :preview="false"></Post>
    <div class="spinner" v-if="loading">
      <Spinner></Spinner>
      <p>Loading</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '../components/Post'
import FirebaseService from '../services/firebase.service'
import Spinner from '../components/Spinner'

export default {
  name: 'home',
  components: {
    Spinner,
    Post
  },
  data: function () {
    return {
      loading: true,
      posts: []
    }
  },
  created () {
    FirebaseService.getPosts().subscribe(posts => {
      this.posts = posts
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/abstracts/mixins";
.spinner {
  text-align: center;
  @include absCenter();
}
</style>
