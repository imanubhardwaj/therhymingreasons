<template>
  <div class="post">
    <PostComponent :post="post" :showComment="false"></PostComponent>
    <div id="comment-box" class="comment-box">
      <label for="comment">Leave a comment</label>
      <div class="input-container name">
        <input v-model="commentObj.name" placeholder="Type your name here" type="text" required>
      </div>
      <div class="input-container">
        <textarea id="comment" v-model="commentObj.comment" placeholder="Type your comment here" required></textarea>
      </div>
      <button class="post-btn" :disabled="!commentObj.name || !commentObj.comment" @click="postComment">Post Comment</button>
    </div>
    <div class="comments-list" v-if="post.comments.length">
      <p class="comments-label">Comments</p>
      <CommentComponent v-for="comment in post.comments" :key="comment.date" :comment="comment"></CommentComponent>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import {Component} from "vue-property-decorator";
import SpinnerComponent from "../../components/Spinner.vue";
import PostComponent from "../../components/Post.vue";
import CommentComponent from "../../components/Comment.vue";
import BaseComponent from "../../components/BaseComponent";
import {Post} from "~/models/post";
import {Comment} from "~/models/comment";
import {FirebaseService} from "~/services/firebase.service";

@Component({
	components: {
		SpinnerComponent,
		CommentComponent,
		PostComponent
	}
})
export default class PostPage extends BaseComponent {
	post!: Post;
	commentObj = this.emptyComment;

	get emptyComment() {
		return {
			name: '',
      comment: ''
    };
  }

	async asyncData(context: any) {
		const slug = context.route.params['slug'];
		const post = await FirebaseService.getInstance().getPost(slug);
		post.comments.sort((comment1: Comment, comment2: Comment) => comment2.date - comment1.date).slice(0, 10);
		return {post};
	}

	head() {
		const title = this.post.title;
		return {
			title: title,
			meta: [
				{ hid: 'description', name: 'description', content: this.post.content },
			]
		};
	}

	created() {
		this.updatePostViewCount();
	}

	updatePostViewCount() {
		const views = this.post.views || 0;
		this.firebaseService.updatePostViewCount(this.post.slug, views + 1).subscribe();
	}

	postComment() {
		const comment = {
  		name: this.commentObj.name,
	  	comment: this.commentObj.comment.replace(/\n/g, '<br>'),
		  date: moment().unix(),
		  isVerified: false
		};
		this.firebaseService.postComment(this.$route.params.slug, comment).subscribe(() => {
			this.commentObj = this.emptyComment;
		});
	}
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/mixins/_flex.scss";
@import "~/assets/sass/mixins/_responsive.scss";
@import "~/assets/sass/mixins/_layout.scss";

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
