<template>
  <div id="app">
    <Container></Container>
  </div>
</template>

<script lang="ts">
	import {Component, Provide, Vue} from "vue-property-decorator";
	import Container from "@/views/Container.vue";
	import {FirebaseService} from "@/services/firebase.service";

	@Component({
		components: {Container}
	})
	export default class App extends Vue {
		@Provide('firebase_service') private firebaseService: FirebaseService = new FirebaseService();
	}
</script>

<style lang="scss">
  @import "main";
</style>
