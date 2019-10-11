<template>
  <div class="post" itemscope itemtype="http://schema.org/ShortStory">
    <div class="post-header">
      <h1 class="heading" @click="openPost" itemprop="name">{{post.title}}</h1>
      <AudioComponent v-if="post.audioUrl" @audioStateChange="$emit('audioStateChange', $event)"
                      :post="post"></AudioComponent>
    </div>
    <img class="image" v-if="post.img" :src="post.img" alt="Post Image" itemprop="image">
    <p v-html="post.content" class="content" itemprop="poem"></p>
    <span class="views-count" v-if="post.views > 0"><v-icon>fa-eye</v-icon>
      {{post.views | viewCount(1)}} {{post.views > 1 ? 'Views' : 'View'}}
    </span>
    <div class="meta">
      <span class="link" @click="navigateToAbout" itemprop="author"><v-icon>fa-user</v-icon>{{post.author}}</span>
      <time itemprop="time" :datetime="getDate(post.date)">
        <v-icon>fa-clock</v-icon>
        {{getDate(post.date)}}
      </time>
      <br>
      <span itemprop="tags"><v-icon>fa-tags</v-icon>{{post.tags}}</span>
      <span class="link" v-if="showComment" @click="navigateToComment"><v-icon>fa-comment</v-icon>Comment</span>
    </div>
    <div class="share">
      <p>
        <v-icon>fa-share</v-icon>&nbsp;Share
      </p>
      <a :href="getFacebookUrl()" target="_blank" itemprop="url">
        <v-icon style="color: #3b5998">fab fa-facebook</v-icon>
      </a>
      <a :href="getTwitterUrl()" target="_blank" itemprop="url">
        <v-icon style="color: #1DA1F2">fab fa-twitter</v-icon>
      </a>
      <a :href="getWhatsappUrl()" data-action="share/whatsapp/share" target="_blank" itemprop="url">
        <v-icon style="color: #25D366">fab fa-whatsapp</v-icon>
      </a>
      <a :href="getMailUrl()" target="_blank" itemprop="url">
        <v-icon style="color: #333333">fa-envelope</v-icon>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import {Component, Prop, Vue} from "~/node_modules/nuxt-property-decorator";
import {MobileDetectionMixin} from "~/mixins/mobile-detection.mixin";
import AudioComponent from "~/components/AudioComponent.vue";
import {Post} from "~/models/post";

@Component({
  components: {AudioComponent},
  mixins: [MobileDetectionMixin],
  filters: {
    viewCount: function (value: any, decimals: number) {
      let exp;
      const suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];

      value = parseInt(value, 10);

      if (isNaN(value)) {
        return null;
      }

      if (value < 1000) {
        return value;
      }

      exp = Math.floor(Math.log(value) / Math.log(1000));

      return (value / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    }
  }
})
export default class PostComponent extends Vue {
  @Prop() post!: Post;
  @Prop() showComment!: boolean;

  openPost() {
    this.$router.push(`/posts/${this.post.slug}`);
  }

  getDate(timestamp: number) {
    return moment(timestamp).format('MMMM DD, YYYY');
  }

  getFacebookUrl() {
    return `https://www.facebook.com/sharer/sharer.php?u=${process.env.baseUrl}/posts/${this.post.slug}&t=${encodeURI(this.post.title)}`
  }

  getTwitterUrl() {
    return `https://twitter.com/intent/tweet?url=${process.env.baseUrl}/posts/${this.post.slug}&text=${encodeURI(this.post.title)}`
  }

  getWhatsappUrl() {
    const text = `%2AThe%20Rhyming%20Reasons%2A%0A%0A${encodeURI(this.post.title)}%0A%0A${process.env.baseUrl}/posts/${this.post.slug}`;
    // @ts-ignore
    if (this.isDesktop()) {
      return `https://wa.me?text=${text}`;
    }
    return `whatsapp://send?text=${text}`
  }

  getMailUrl() {
    return `mailto:?subject=${encodeURI(this.post.title + ' by The Rhyming Reasons')}&body=${encodeURI('Read ' + this.post.title + ' at ' + process.env.baseUrl + '/posts/' + this.post.slug)}`
  }

  navigateToComment() {
    this.$router.push({name: 'posts', params: {postId: this.post.slug}, hash: 'comment-box'})
  }

  navigateToAbout() {
    this.$router.push({name: 'about'})
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/sass/mixins/_flex.scss";
@import "~/assets/sass/mixins/_responsive.scss";

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
    margin-top: 1.5em;
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
    @include fx-layout-alignment(flex-start, flex-start);

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
