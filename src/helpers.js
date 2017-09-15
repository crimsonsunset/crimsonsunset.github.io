export function routeExporter(inObj) {
	return {
		...inObj,
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				if (vm.settingsObj.rememberLocation) {
					vm.$store.set('location', vm.$route.path)
				}
			});
		},
	}
}