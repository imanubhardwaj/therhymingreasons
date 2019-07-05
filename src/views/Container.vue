<template>
  <div class="main-container">
    <img class="bg-img" src="../assets/bg.png" alt="Nature">
    <header class="nav">
      <div>
        <h1>
          <router-link class="link" to="/">The Rhyming Reasons</router-link>
        </h1>
        <p class="tagline">Rhymes for a Reason</p>
      </div>
      <div class="extras">
        <SearchComponent :animate="true" v-if="showSearch()" class="desktop-search-bar"></SearchComponent>
        <v-icon class="menu" @click="isPagesListOpen = !isPagesListOpen">{{isPagesListOpen ? 'fa-times' :
          'fa-bars'}}
        </v-icon>
      </div>
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

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import Home from "@/views/Home.vue";
    import SearchComponent from "@/components/Search.vue";

    @Component({
  components: {
    Home,
    SearchComponent
  }
})
export default class Container extends Vue {
  isPagesListOpen = false;

  showSearch() {
    return this.$route.path === '/'
  }
}
</script>

<style lang="scss" scoped>
  @import "../sass/abstracts/mixins";
  @import "../sass/flex-mixins/flex-styles";

  .main-container {
    padding: 1em;

    .nav {
      padding-bottom: 2em;
      @include fx-layout(row);
      @include fx-layout-alignment(space-between, baseline);

      h1 {
        margin: 0 0.5em 0.5em 0;

        a {
          font-weight: 400 !important;
          font-size: 1em !important;
        }

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

      .extras {
        @include fx-layout-with-gap(row, 20px);
        @include fx-layout-alignment(flex-start, center);

        .v-icon {
          cursor: pointer;
        }

        .menu {
          width: 21px;
        }
      }

      .desktop-search-bar {
        display: none;
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
  }

  @include respond(tab) {
    .main-container {
      margin: 0 calc(10% + 60px);
      padding: 3rem 0;

      .divider {
        width: 10%;
      }
    }

    .tagline {
      font-size: 16px !important;
    }

    .desktop-search-bar {
      display: flex !important;
    }
  }
</style>
