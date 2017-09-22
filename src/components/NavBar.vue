<template>




        <v-toolbar
                fixed

                :class="[settingsObj.themeColor, 'darken-4', 'primary']" dark>
            <v-toolbar-side-icon @click.stop="()=>emitEvent('toggleDrawer')"></v-toolbar-side-icon>
            <v-toolbar-title>{{this.getRouteName()}}</v-toolbar-title>
            <v-spacer mr-3></v-spacer>

            <v-fab-transition>
                <v-btn
                        @click.stop="()=>emitEvent('toggleInfo', {showInfo: getPageInfo()})"
                        v-if="settingsObj.infoBtn"
                        :class="[settingsObj.themeColor, 'darken-4', 'elevation-0', 'info-btn']"
                        fab>
                    <v-icon>help_outline</v-icon>
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
		methods: {}
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
