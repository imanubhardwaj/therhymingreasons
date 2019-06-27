<template>
  <div class="post">
    <div class="spinner" v-if="loading">
      <Spinner></Spinner>
      <p>Loading</p>
    </div>
    <Post v-if="!loading" :post="post" :showComment="false"></Post>
    <div id="comment-box" class="comment-box" v-if="!loading">
      <label for="comment">Leave a comment</label>
      <div class="input-container name">
        <input v-model="name" placeholder="Type your name here" type="text" required>
      </div>
      <div class="input-container">
        <textarea id="comment" v-model="comment" placeholder="Type your comment here" required></textarea>
      </div>
      <button class="post-btn" :disabled="!name || !comment" @click="postComment">Post Comment</button>
    </div>
    <div class="comments-list" v-if="comments.length">
      <p class="comments-label">Comments</p>
      <Comment v-for="comment in comments" :key="comment.date" :comment="comment"></Comment>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FirebaseService from '../services/firebase.service'
import Spinner from '../components/Spinner'
import moment from 'moment'
import Comment from '../components/Comment'
import Post from '../components/Post'

export default {
  name: 'post',
  components: {
    Comment,
    Spinner,
    Post
  },
  created: function () {
    (new FirebaseService()).getPost(this.$route.params.postId).subscribe(post => {
      this.post = post
      this.comments = post.comments.sort((comment1, comment2) => comment2.date - comment1.date).slice(0, 10)
      this.loading = false
    })
  },
  data: function () {
    return {
      post: {},
      loading: true,
      name: null,
      comment: null,
      comments: []
    }
  },
  methods: {
    postComment: function () {
      const comment = {
        name: this.name,
        comment: this.comment.replace(/\n/g, '<br>'),
        date: moment().unix(),
        isVerified: false
      };
      (new FirebaseService()).postComment(this.$route.params.postId, comment)
        .subscribe(res => {
          this.name = ''
          this.comment = ''
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/abstracts/mixins";
  @import "../sass/flex-mixins/flex-styles";
  .post {
    margin: 2em 0;
    min-height: 40vh;

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
      border-radius: 5px;
      object-fit: contain;
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

      .input-container {
        padding: 5px 10px 0 10px;
        border: 1px solid rgb(44, 62, 80);
        border-radius: 2px;

        &.name {
          padding-bottom: 5px;

          input {
            width: 100%;
            outline: none;
          }
        }

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

        &:disabled {
          cursor: not-allowed;
          background-color: #696969;
        }
      }
    }

    .comments-label {
      margin-bottom: 2em;
      font-size: 1.5em;
      font-weight: 600;
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
