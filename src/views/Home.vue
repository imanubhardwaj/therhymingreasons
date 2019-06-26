<template>
  <div class="home">
    <Search :animate="false" class="mobile-search-bar"></Search>
    <Post v-for="post in filteredPosts" :key="post.title" :post="post" :showComment="true"></Post>
    <p class="no-posts" v-if="!filteredPosts.length && !loading">No Posts Found !</p>
    <div class="text-xs-center" v-if="!loading && totalPages > 1">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        circle
        @input="paginate"
      ></v-pagination>
    </div>
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
import Search from '../components/Search'
import { debounceTime } from 'rxjs/operators'

export default {
  name: 'home',
  components: {
    Search,
    Spinner,
    Post
  },
  data: function () {
    return {
      loading: true,
      posts: [],
      filteredPosts: [],
      currentPage: 1,
      totalPages: 0,
      pageSize: 5
    }
  },
  created () {
    (new FirebaseService()).getPosts().subscribe(posts => {
      this.loading = false
      this.posts = posts
      this.totalPages = Math.ceil(posts.length / this.pageSize)
      this.updatePagePosts()
    })
    FirebaseService.searchQuery.asObservable().pipe(debounceTime(400)).subscribe(query => {
      if (!query) {
        this.updatePagePosts()
        return
      }
      this.filteredPosts = this.posts.filter(post => {
        return post.title.toLowerCase().includes(query.toLowerCase())
      })
    })
  },
  methods: {
    updatePagePosts: function () {
      this.filteredPosts = this.posts.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    paginate: function (page) {
      this.filteredPosts = this.posts.slice((page - 1) * this.pageSize, page * this.pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/abstracts/mixins";
@import "../sass/flex-mixins/flex-styles";
.spinner {
  text-align: center;
  @include absCenter();
}
.mobile-search-bar {
  display: flex;
  margin-top: 1rem;
}
/deep/.post {
  margin: 2em 0 5em 0;
}
.no-posts {
  margin-top: 2em;
  font-size: 1.5em;
}
/deep/.v-pagination {
  button:focus {
    outline: none;
  }

  .v-pagination__navigation .v-icon {
    font-size: 1rem !important;
  }
  .v-pagination__item--active {
    color: #000 !important;
  }
}
@include respond(tab) {
  .mobile-search-bar {
    display: none;
  }
}
</style>
