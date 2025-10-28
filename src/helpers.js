export function routeExporter(inObj) {
	return {
		...inObj,
		beforeRouteEnter(to, from, next) {
			next((vm) => {
				vm.settingsObj.pagePrompt = vm.getPageInfo();
				if (vm.settingsObj.rememberLocation) {
					vm.$store.set('location', vm.$route.path)
				}
			});
		},
	}
}

export function printBuildInfo() {
	const rainbow = (color, text) => console.log(`%c${text}`, `color:${color};`)
	rainbow('red', `${build.info.name} v${build.info.version} - ${build.info.environment}`)
	rainbow('blue', `Built at: ${build.info.date}`)
	rainbow('green', `Want a look under the hood? Visit https://github.com/crimsonsunset/crimsonsunset.github.io`)
}