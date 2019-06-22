<template>
  <div id="app">
    <img class="bg-img" src="./assets/bg.png" alt="Nature">
    <header class="nav">
      <div>
        <h1><a class="link" href="https://therhymingreasons.com" rel="home">The Rhyming Reasons</a></h1>
        <p class="tagline">Rhymes for a Reason</p>
      </div>
      <v-icon @click="isPagesListOpen = !isPagesListOpen">{{isPagesListOpen ? 'fa-times' : 'fa-bars'}}</v-icon>
    </header>
    <transition name="slide">
      <div class="pages-list" v-if="isPagesListOpen" @click="isPagesListOpen = false">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/about">About</router-link>
      </div>
    </transition>
    <router-view/>
    <div class="footer">
      <p class="description">The Rhyming Reasons, A Poetry Blog.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      isPagesListOpen: false
    }
  }
}
</script>

<style lang="scss">
@import "sass/abstracts/mixins";
@import "sass/flex-mixins/flex-styles";
@font-face {
  font-family: appleFont;
  src: url('./assets/font/SF-Pro-Display-Regular.otf');
}
#app {
  font-family: appleFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  margin: 0;
  padding: 1em;
  font-size: 1em;
  line-height: 1.8;
}

.active {
  font-size: 18px;
  font-weight: bolder;
}

.slide-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter, .slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.bg-img {
  z-index: -1;
  position: fixed;
  bottom: 0;
  top: 0;
  opacity: 0.1;
  right: 0;
  height: 100vh;
}

.link {
  cursor: pointer;
  color: #2c3e50;
  text-decoration: none;
  transition: color .11s ease-in-out;
}

.router-link {
  padding: 10px;
  background-color: lightgray;
  border-radius: 5px;
  font-weight: 500;
}

.nav {
  padding-bottom: 2em;
  @include fx-layout(row);
  @include fx-layout-alignment(space-between, baseline);

  h1 {
    font-weight: 400;
    margin: 0 0.5em 0.5em 0;

    &::after {
      background: #767676;
      content: "\020";
      display: block;
      height: 2px;
      width: 2em;
      margin-top: 10px;
    }
  }
  .tagline {
    font-size: 18px;
    margin-top: 0;
  }
  .v-icon {
    cursor: pointer;
  }
}

.pages-list {
  @include fx-layout-with-gap(column, 10px);
}

.footer {
  padding: 5em 0 2em 0;
  @include fx-layout(row);
  @include fx-layout-alignment(space-between, center);

  p.description::before {
    background: #767676;
    content: "\020";
    display: block;
    height: 2px;
    width: 2em;
    margin-bottom: 10px;
  }
}

@include respond(tab) {
  #app {
    margin: 0 calc(10% + 60px);
    padding: 3rem 0;

    .divider {
      width: 10%;
    }
  }
  .tagline {
    font-size: 16px !important;
  }
}
</style>
