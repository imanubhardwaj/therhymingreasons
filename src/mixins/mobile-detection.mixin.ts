import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class MobileDetectionMixin extends Vue {
	isDesktop() {
		if (navigator.userAgent.match(/Android/i)) {
			return false;
		} else return !((navigator.userAgent.match(/iPhone/i)) || navigator.userAgent.match(/iPad/i));
	}
}
