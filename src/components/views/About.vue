<template>
    <v-container
            class="no-pad"
            mt-1
    >

        <div
                ref="loader"
                :class="['loader', `loader--${settingsObj.themeColor}`, 'loader-bar-ping-pong', `${getActiveStatus()}`]"
        >
        </div>

        <v-layout row wrap>

            <step-list
                    :settingsObj="settingsObj"
                    endpoint="bio"
            >

            </step-list>

        </v-layout>
    </v-container>

</template>

<script>

	import StepList from '../StepList.vue'
	import {routeExporter} from '../../helpers'

	export default routeExporter({
		components: {StepList},
		props: ['settingsObj'],
		mounted() {
			this.settingsObj.loaderRef = this.$refs.loader
		},
        data() {
			return {}
		}
	})


</script>

<style lang="scss">

</style>
