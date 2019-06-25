<template>
  <div class="search-bar" :class="{ animate: animate }">
    <v-icon>fa-search</v-icon>
    <input type="text" placeholder="Search" @input="searchQuery">
  </div>
</template>

<script>
import FirebaseService from '../services/firebase.service'

export default {
  name: 'Search',
  props: {
    animate: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    searchQuery: function (event) {
      FirebaseService.searchQuery.next(event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/abstracts/_mixins.scss";
@import "../sass/flex-mixins/flex-styles.scss";

.search-bar {
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid #2c3e50;
  @include fx-layout(row);
  @include fx-layout-alignment(flex-start, center);

  &.animate {
    input {
      width: 0;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
    }

    &:hover {
      outline: none;

      input {
        width: 150px;
        margin-left: 10px;
      }
    }
  }

  &:not(.animate) {
    input {
      margin-left: 10px;
    }
  }

  .v-icon {
    color: #2c3e50;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }
}
</style>
