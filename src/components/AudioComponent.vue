<template>
  <div :class="{margin: (post.audioState !== AudioStateEnum.READY)}">
    <v-icon v-if="post.audioState === AudioStateEnum.READY" @click="toggleAudioPlay">fa-volume-up</v-icon>
    <div class="track"
         :class="{playing: post.audioState === AudioStateEnum.PLAYING, hide: post.audioState === AudioStateEnum.READY}">
      <div class="cover">
        <button class="play" @click="toggleAudioPlay"></button>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 100 100">
          <path ref="path" id="circle" fill="none" stroke="#FFFFFF" stroke-miterlimit="10"
                :stroke-dasharray="totalLength" :stroke-dashoffset="currentOffset"
                d="M50,2.9L50,2.9C76,2.9,97.1,24,97.1,50v0C97.1,76,76,97.1,50,97.1h0C24,97.1,2.9,76,2.9,50v0C2.9,24,24,2.9,50,2.9z"/>
        </svg>
        <audio ref="audio" @timeupdate="onTimeUpdateListener" @ended="audioEnded"
               :src="post.audioUrl"></audio>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
	import {Component, Prop, Vue, Watch} from "vue-property-decorator";
	import {AudioState, Post} from "@/models/post";

	@Component({})
	export default class AudioComponent extends Vue {
		$refs!: any;
		totalLength: number = 0;
		currentOffset: number = 0;
		AudioStateEnum = AudioState;
		@Prop() post!: Post;

		@Watch('post')
		onPropertyChanged() {
			if (this.post.audioState !== AudioState.PLAYING) {
				this.$refs.audio.pause();
			}
		}

		mounted() {
			this.totalLength = this.$refs.path.getTotalLength();
		}

		toggleAudioPlay() {
			if (this.post.audioState !== AudioState.PLAYING) {
				this.$refs.audio.play();
				this.$emit('audioStateChange', AudioState.PLAYING);
			} else {
				this.$refs.audio.pause();
				this.$emit('audioStateChange', AudioState.PAUSED);
			}
		}

		onTimeUpdateListener(event: any) {
			const el = event.srcElement;
			const currentTime = el.currentTime, maxDuration = el.duration;
			this.currentOffset = this.totalLength - (currentTime / maxDuration * this.totalLength);
		}

		audioEnded() {
			this.currentOffset = 0;
			this.$emit('audioStateChange', AudioState.ENDED);
		}
	}
</script>

<style lang="scss" scoped>
  @import "../sass/abstracts/variables";

  audio {
    display: none;
  }

  .margin {
    margin: 0 0 1.8em 1em;
  }

  .v-icon {
    margin-bottom: 5px;
    font-size: 24px;
    color: $primary-color !important;
    cursor: pointer !important;
  }

  .hide {
    display: none;
  }

  *:focus {
    outline: 0;
  }

  .cover {
    position: relative;
  }

  .cover svg {
    position: absolute;
    top: 50%;
    left: 50%;
    stroke: #fff;
    width: 30px;
    height: 30px;
    background-color: black;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }

  .play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    width: 30px;
    height: 30px;
    background: transparent !important;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }

  .play::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    opacity: 0;
  }

  .play::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZdJREFUeNrs29FNQjEYBlAgDuAIuAFugBvgBrABTiBOgE4AGzgCbCAbwAayAbZJb0KMT77wt/ecpO/39qP9CqGDAQAAAAAAAAAAAAAA8A+Xy2WWxr2ZiBPILo1jGlOzESeQzmcaY7MSJ5DsO42lmYkTSOcrjYkZihNIZ630YwVyKaU/M1txAunsWir9UQPvkI/GuVtWPsoxVsjv0p9aIXHkE9iu5tIfNbrI8neWXPpzgcSRV8imttJvOZDr0j/WUvp9CKTzWsMPln0KJBuX0t9ELf2+BdKZl21sKZBYpb8upT8RSMBv+hG2MYFclX4JZioQBPKHtzQeh8Ph/pYPcSeHQQ7gJQVxsEJu61yCeIoSRp9XyLaEcY72YH0L5JTG4tY9YcsqpZ2CeIgcRl9WyL6sipNj7+1Le1FK+1TLQ7cayHsaeXva1vbgrW1Zh3J62tf6Aq0EkrenjxTEqvYXaSGQqkq75Q7JATzXVtpV8mfregJxHSFIIC7sBArElbYggbj0GSgQ16IBAAAAAAAAAAAAACCsHwEGACfr+SLf7BaJAAAAAElFTkSuQmCC');
    background-size: 80%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }

  #circle {
    visibility: hidden;
    stroke-width: 12;
  }

  .playing #circle {
    visibility: visible;
  }

  .playing .play::after {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAK9JREFUeNrs0sEJhDAQQFEjW4ilWYp2slYS7MROYgrQZQc8DPgeiBcZQ/4MAwAAAAAAAAAAAAAAZFcyHaa1NvfX9PfhS1lu5iyB3x59ztcqXF9kbQE/5kTUTHcwWoNcBBEEQQRBEEEQRBAEEQRBEEQQBBEEQQRBEEEQBEEEQRBBEEQQBBEEQRBEEAQRBEEEQZB3+iQ7z9af/YE5a+DbwxoAAAAAAAAAAAAAAEDEKcAA4xprM8PkP94AAAAASUVORK5CYII=');
  }

  .playing .play::before {
    opacity: 1;
  }
</style>
