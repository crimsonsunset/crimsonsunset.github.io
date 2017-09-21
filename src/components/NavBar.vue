<template>

    <!--<div> {{message}}</div>-->

    <v-toolbar
            fixed

            :class="[settingsObj.themeColor, 'darken-4', 'primary']" dark>
        <v-toolbar-side-icon @click.stop="()=>emitEvent('toggleDrawer')"></v-toolbar-side-icon>
        <v-toolbar-title>{{this.getRouteName()}}</v-toolbar-title>
        <v-spacer mr-3></v-spacer>

        <v-fab-transition>
            <v-btn
                    v-if="settingsObj.showInfo"
                    :class="[settingsObj.themeColor, 'darken-4', 'elevation-0', 'info-btn']"
                    fab>
                <v-icon>info</v-icon>
            </v-btn>
        </v-fab-transition>


    </v-toolbar>


</template>

<script>

	export default {
		props: ['settingsObj'],
		data() {
			return {}
		},
		methods: {
			getRouteName(e) {
				const routeName = this.$route.fullPath.substring(1);
				return (routeName != '') ? routeName : 'Welcome!';
			}
		}
	}
</script>


<style lang="scss">

    nav {
        z-index: 100 !important;
        .info-btn {
            margin-right: 0px !important;
        }
    }

</style>
