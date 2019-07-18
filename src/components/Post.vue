<template>
  <div class="post">
    <div class="post-header">
      <h1 class="heading" @click="openPost">{{post.title}}</h1>
      <v-icon v-if="!isPlaying" @click="isPlaying = true">fa-volume-up</v-icon>
      <AudioComponent v-if="isPlaying"></AudioComponent>
    </div>
    <img class="image" v-if="post.img" :src="post.img" alt="Post Image">
    <p v-html="post.content" class="content"></p>
    <div class="meta">
      <span class="link" @click="navigateToAbout"><v-icon>fa-user</v-icon>{{post.author}}</span>
      <span><v-icon>fa-clock</v-icon>{{getDate(post.date)}}</span>
      <br>
      <span><v-icon>fa-tags</v-icon>{{post.tags}}</span>
      <span class="link" v-if="showComment" @click="navigateToComment"><v-icon>fa-comment</v-icon>Comment</span>
    </div>
    <div class="share">
      <p><v-icon>fa-share</v-icon>&nbsp;Share</p>
      <a :href="getFacebookUrl()" target="_blank"><v-icon style="color: #3b5998">fab fa-facebook</v-icon></a>
      <a :href="getTwitterUrl()" target="_blank"><v-icon style="color: #1DA1F2">fab fa-twitter</v-icon></a>
      <a :href="getWhatsappUrl()" data-action="share/whatsapp/share" target="_blank"><v-icon style="color: #25D366">fab fa-whatsapp</v-icon></a>
      <a :href="getMailUrl()" target="_blank"><v-icon style="color: #333333">fa-envelope</v-icon></a>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
    import {Post} from "@/models/post";
    import {MobileDetectionMixin} from "@/mixins/mobile-detection.mixin";
    import moment from 'moment';
import AudioComponent from "@/components/AudioComponent.vue";

@Component({
    components: {AudioComponent},
    mixins: [MobileDetectionMixin]
})
export default class PostComponent extends Vue {
   isPlaying = false;
   @Prop() post!: Post;
   @Prop() showComment!: boolean;

   openPost() {
      this.$router.push({ name: 'posts', params: { postId: this.post.slug } })
   }

   getDate(timestamp: number) {
      return moment(timestamp).format('MMMM DD, YYYY');
   }

   getFacebookUrl() {
     return `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/posts/${this.post.slug}&t=${encodeURI(this.post.title)}`
   }

   getTwitterUrl() {
     return `https://twitter.com/intent/tweet?url=${window.location.origin}/posts/${this.post.slug}&text=${encodeURI(this.post.title)}`
   }

   getWhatsappUrl() {
     const text = `%2AThe%20Rhyming%20Reasons%2A%0A%0A${encodeURI(this.post.title)}%0A%0A${window.location.origin}/posts/${this.post.slug}`;
       // @ts-ignore
       if (this.isDesktop()) {
       return `https://wa.me?text=${text}`;
     }
     return `whatsapp://send?text=${text}`
   }

   getMailUrl() {
     return `mailto:?subject=${encodeURI(this.post.title + ' by The Rhyming Reasons')}&body=${encodeURI('Read ' + this.post.title + ' at ' + window.location.origin + '/posts/' + this.post.slug)}`
   }

   navigateToComment() {
     this.$router.push({ name: 'posts', params: { postId: this.post.slug }, hash: 'comment-box' })
   }

   navigateToAbout() {
     this.$router.push({ name: 'about' })
   }
}
</script>

<style lang="scss" scoped>
@import "../sass/abstracts/mixins";
@import "../sass/abstracts/variables";
@import "../sass/flex-mixins/flex-styles";
.post {
  margin: 2em 0;

  .post-header {
    @include fx-layout-with-gap(row, 2rem);
    @include fx-layout-alignment(flex-start, flex-end);

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

    .v-icon {
      margin-bottom: 10px;
      font-size: 24px;
      color: $primary-color;
      cursor: pointer;
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
