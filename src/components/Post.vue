<template>
  <div class="post">
    <h1 class="heading" @click="openPost">{{post.title}}</h1>
    <img class="image" v-if="post.img" :src="post.img" alt="Post Image">
    <p v-html="post.content" class="content"></p>
    <div class="meta">
      <span class="link" @click="navigateToAbout"><v-icon>fa-user</v-icon>{{post.author}}</span>
      <span><v-icon>fa-clock</v-icon>{{post.date}}</span>
<!--      <span><v-icon>fa-folder</v-icon>{{post.category}}</span>-->
      <br>
      <span><v-icon>fa-tags</v-icon>{{post.tags}}</span>
      <span class="link" v-if="showComment" @click="navigateToComment"><v-icon>fa-comment</v-icon>Comment</span>
    </div>
    <div class="share">
      <p><v-icon>fa-share</v-icon>&nbsp;Share</p>
      <a :href="getFacebookUrl()" target="_blank"><v-icon style="color: #3b5998">fab fa-facebook</v-icon></a>
      <a :href="getTwitterUrl()" target="_blank"><v-icon style="color: #1DA1F2">fab fa-twitter</v-icon></a>
      <a :href="getWhatsappUrl()" target="_blank"><v-icon style="color: #25D366">fab fa-whatsapp</v-icon></a>
      <a :href="getMailUrl()" target="_blank"><v-icon style="color: #333333">fa-envelope</v-icon></a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'post',
  methods: {
    openPost: function () {
      this.$router.push({ name: 'posts', params: { postId: this.post.slug } })
    },
    getFacebookUrl: function () {
      return `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/posts/${this.post.slug}&t=${encodeURI(this.post.title)}`
    },
    getTwitterUrl: function () {
      return `https://twitter.com/intent/tweet?url=${window.location.origin}/posts/${this.post.slug}&text=${encodeURI(this.post.title)}`
    },
    getWhatsappUrl: function () {
      return `https://wa.me/?text=%2AThe%20Rhyming%20Reasons%2A%0A%0A${encodeURI(this.post.title)}%0A%0A${window.location.origin}/posts/${this.post.slug}`
    },
    getMailUrl: function () {
      return `mailto:?subject=${encodeURI(this.post.title + ' by The Rhyming Reasons')}&body=${encodeURI('Read ' + this.post.title + ' at ' + window.location.origin + '/posts/' + this.post.slug)}`
    },
    navigateToComment: function () {
      this.$router.push({ name: 'posts', params: { postId: this.post.slug }, hash: 'comment-box' })
    },
    navigateToAbout: function () {
      this.$router.push({ name: 'about' })
    }
  },
  props: {
    post: {
      required: true
    },
    showComment: {
      required: true,
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/abstracts/mixins";
@import "../sass/flex-mixins/flex-styles";
.post {
  margin: 2em 0;

  .heading {
    cursor: pointer;
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

    .comment {
      cursor: pointer;
    }
  }

  .v-icon {
    font-size: 18px;
    margin-right: 5px;
  }

  .share {
    margin-top: 1em;
    @include fx-layout-with-gap(row, 1.25em);
    @include fx-layout-alignment(flex-start, center);

    p {
      margin-bottom: 0;
    }

    a {
      height: 21px;
      outline: none;
      cursor: pointer;

      .v-icon {
        font-size: 1.5em;
      }
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
  }
}
</style>
