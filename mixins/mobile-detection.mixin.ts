import {Component, Vue} from "~/node_modules/nuxt-property-decorator";

@Component
export class MobileDetectionMixin extends Vue {
	isDesktop() {
		if (!process.browser) {
			return false;
		}
		if (navigator.userAgent.match(/Android/i)) {
			return false;
		} else return !((navigator.userAgent.match(/iPhone/i)) || navigator.userAgent.match(/iPad/i));
	}
}
