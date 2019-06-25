<template>
  <div class="post">
    <h1 class="heading" @click="openPost">{{post.title}}</h1>
    <img class="image" v-if="post.img" :src="post.img" alt="Post Image">
    <p v-html="post.content" class="content"></p>
    <div class="meta">
      <span><v-icon>fa-user</v-icon>{{post.author}}</span>
      <span><v-icon>fa-clock</v-icon>{{post.date}}</span>
      <span><v-icon>fa-folder</v-icon>{{post.category}}</span>
      <br>
      <span><v-icon>fa-tags</v-icon>{{post.tags}}</span>
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
    }
  },
  props: {
    post: {
      required: true
    },
    preview: {
      type: Boolean,
      required: true
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
  }

  .v-icon {
    font-size: 18px;
    margin-right: 5px;
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
