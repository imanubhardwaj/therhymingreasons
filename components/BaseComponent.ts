import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import {FirebaseService} from "~/services/firebase.service";

@Component({})
export default class BaseComponent extends Vue {
	firebaseService!: FirebaseService;

	created() {
		this.firebaseService = FirebaseService.getInstance();
  }
}
