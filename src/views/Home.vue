import {AudioState} from "../models/post";
import {AudioState} from "../models/post";
<template>
  <div class="home">
    <SearchComponent :animate="false" class="mobile-search-bar" v-if="!loading"></SearchComponent>
    <PostComponent v-for="post in filteredPosts" :key="post.title" :post="post" :showComment="true"
                   @audioStateChange="audioToggle(post, $event)">
    </PostComponent>
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
      <SpinnerComponent></SpinnerComponent>
      <p>Loading</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {debounceTime} from 'rxjs/operators'
  import {Component, Inject, Vue} from "vue-property-decorator";
  import SearchComponent from "@/components/Search.vue";
  import SpinnerComponent from "@/components/Spinner.vue";
  import PostComponent from "@/components/Post.vue";
  import {AudioState, Post} from "@/models/post";
  import {FirebaseService} from "@/services/firebase.service";

  @Component({
    components: {
      SearchComponent,
      SpinnerComponent,
      PostComponent
    }
  })
  export default class HomePage extends Vue {
    loading: boolean = true;
    posts: Post[] = [];
    filteredPosts: Post[] = [];
    currentPage: number = 1;
    totalPages: number = 0;
    pageSize: number = 5;
    @Inject('firebase_service') private firebaseService!: FirebaseService;

    created() {
      this.firebaseService.getPosts().subscribe(posts => {
        this.loading = false;
        this.posts = posts.map(_post => {
          return {
            ..._post,
            audioState: AudioState.READY
          };
        });
        this.totalPages = Math.ceil(posts.length / this.pageSize);
        this.updatePagePosts();
      });
      this.firebaseService.searchQuery.asObservable().pipe(debounceTime(400)).subscribe(query => {
        if (!query) {
          this.updatePagePosts();
          return
        }
        this.filteredPosts = this.posts.filter(post => {
          return post.title.toLowerCase().includes(query.toLowerCase())
        })
      });
    }

    updatePagePosts() {
      this.filteredPosts = this.posts.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }

    paginate(page: number) {
      this.filteredPosts = this.posts.slice((page - 1) * this.pageSize, page * this.pageSize)
    }

    audioToggle(post: Post, audioState: AudioState) {
      this.posts = this.posts.map(_post => {
        return {
          ..._post,
          audioState: ((_post.slug !== post.slug) ?
            (_post.audioState === AudioState.PLAYING ? AudioState.PAUSED : _post.audioState) : audioState)
        };
      });
      this.updatePagePosts();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/abstracts/mixins";
  @import "../sass/flex-mixins/flex-styles";

  .home {
    min-height: 40vh;
  }

  .spinner {
    text-align: center;
    @include absCenter();
  }

  .mobile-search-bar {
    display: flex;
    margin-top: 1rem;
  }

  /deep/ .post {
    margin: 2em 0 5em 0;
  }

  .no-posts {
    margin-top: 2em;
    font-size: 1.5em;
  }

  /deep/ .v-pagination {
    button:focus {
      outline: none;
    }

    .v-pagination__navigation .v-icon {
      font-size: 1rem !important;
    }

    .v-pagination__item--active {
      color: #ffffff !important;
      background-color: #2c3e50 !important;
    }

    .v-pagination__item {
      box-shadow: none !important;
    }

    .v-pagination__navigation {
      box-shadow: none !important;
    }
  }

  @include respond(tab) {
    .mobile-search-bar {
      display: none;
    }
  }
</style>
