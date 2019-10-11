<template>
  <div class="about">
    <h2 class="about-heading">About the Author</h2>
    <p v-html="about.author"></p>
    <h2>Why I started The Rhyming Reasons?</h2>
    <p v-html="about.blog"></p>
    <h2 class="contact-heading">Want to Connect? Feel free to drop in and Say Hi !</h2>
    <p>Phone: +91 97182-82486</p>
    <a class="link" href="mailto:immanubhardwaj@gmail.com">Email: immanubhardwaj@gmail.com</a>
    <router-link class="router-link link" to="/">Back to Home</router-link>
  </div>
</template>

<script lang="ts">
import {About} from "~/models/about";
import BaseComponent from "../../components/BaseComponent";
import SpinnerComponent from "../../components/Spinner.vue";
import {Component} from "nuxt-property-decorator";

@Component({
	components: {
		SpinnerComponent
	}
})
export default class AboutPage extends BaseComponent {
	about: About = {author: '', blog: ''};

	created() {
		this.firebaseService.getAboutPageContent().subscribe(about => this.about = about);
	}
}
</script>
<style lang="scss" scoped>
@import "~/assets/sass/mixins/_flex.scss";
@import "~/assets/sass/mixins/_responsive.scss";
@import "~/assets/sass/mixins/_layout.scss";

.about {
  @include fx-layout-with-gap(column, 20px);

  h2 {
    font-weight: 400;
    margin: 0 0.5em 0.5em 0;
  }

  .spinner {
    text-align: center;
    @include absCenter();
  }

  .tagline {
    margin-top: 0;
  }

  .about-heading {
    margin-top: 1em;

    &::before {
      background: #767676;
      content: "\020";
      display: block;
      height: 2px;
      margin: 1rem 0;
      width: 1em;
    }
  }

  .contact-heading {
    margin: 1em 0;
  }

  .router-link {
    width: fit-content;
    margin-top: 2em;
  }
}
</style>
