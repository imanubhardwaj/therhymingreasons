<template>
  <div class="search-bar">
    <v-icon>fa-search</v-icon>
    <input type="text" placeholder="Search" @input="searchQuery">
  </div>
</template>

<script>
import FirebaseService from '../services/firebase.service'

export default {
  name: 'Search',
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
  border: 1px solid;
  width: 200px;
  @include fx-layout-with-gap(row, 10px);
  @include fx-layout-alignment(flex-start, center)

  .v-icon {
    color: #2c3e50;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }
}
</style>
