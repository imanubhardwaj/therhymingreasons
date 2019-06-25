<template>
  <div class="post">
    <div class="spinner" v-if="loading">
      <Spinner></Spinner>
      <p>Loading</p>
    </div>
    <h1 class="heading" v-if="!loading">{{post.title}}</h1>
    <img class="image" v-if="post.img" :src="post.img" alt="Post Image">
    <p v-html="post.content" class="content"></p>
    <div class="meta" v-if="!loading">
      <span><v-icon>fa-user</v-icon>{{post.author}}</span>
      <span><v-icon>fa-clock</v-icon>{{post.date}}</span>
      <span><v-icon>fa-folder</v-icon>{{post.category}}</span>
      <br>
      <span><v-icon>fa-tags</v-icon>{{post.tags}}</span>
    </div>
    <div class="comment-box" v-if="!loading">
      <label for="comment-box">Leave a comment</label>
      <div class="comment">
        <textarea id="comment-box" placeholder="Type your comment here"></textarea>
      </div>
      <button class="post-btn">Post Comment</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FirebaseService from '../services/firebase.service'
import Spinner from '../components/Spinner'

export default {
  name: 'post',
  components: {
    Spinner
  },
  created: function () {
    (new FirebaseService()).getPost(this.$route.params.postId).subscribe(post => {
      this.post = post
      this.loading = false
    })
  },
  data: function () {
    return {
      post: {},
      loading: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/abstracts/mixins";
  @import "../sass/flex-mixins/flex-styles";
  .post {
    margin: 2em 0;

    .spinner {
      text-align: center;
      @include absCenter();
    }

    .heading {
      font-weight: 500;
      font-size: 1.7em !important;

      &::before {
        background: #767676;
        content: "\020";
        display: block;
        height: 2px;
        margin: 1rem 0;
        width: 1em;
      }
    }

    img.image {
      margin-top: 3em;
      width: 100%;
      object-fit: contain;
      border-radius: 5px;
    }

    p.content {
      font-size: 16px !important;
      margin: 32px 0;
      max-width: 100%;
    }

    div.meta {
      @include fx-layout(row);
      flex-wrap: wrap;

      > * {
        word-break: break-all;
        margin-right: 1.25em;
        margin-bottom: 1em;
      }
    }

    .v-icon {
      font-size: 18px;
      margin-right: 5px;
    }

    .comment-box {
      @include fx-layout-with-gap(column, 1em);
      margin: 3em 0;

      label {
        font-size: 1.5em;
        font-weight: 600;
      }

      .comment {
        padding: 5px 10px 0 10px;
        border: 1px solid rgb(44, 62, 80);
        border-radius: 2px;

        textarea {
          width: 100%;
          outline: none;
          resize: none;
          min-height: 100px;
        }
      }

      .post-btn {
        margin-top: 1em;
        width: fit-content;
        padding: 5px 10px;
        color: white;
        background-color: #2c3e50;
        border-radius: 5px;
        outline: none;
        @include fx-flex-align(flex-end);
      }
    }

    @include respond(tab) {
      img.image {
        width: 50%;
      }

      p.content {
        font-size: 14px !important;
        max-width: calc(8 * (100vw / 12) - 28px);
      }

      .comment-box {
        max-width: 60%;
      }
    }
  }
</style>
