<template>

    <section>
        <div
                v-if="!isLoaded"
                ref="loader"
                :class="['loader', `loader--${settingsObj.themeColor}`, 'loader-bar-ping-pong', `is-active`]"
        >
        </div>

        <iframe
                class="docs"
                :src="this.$endpoints.base">
        </iframe>
    </section>
</template>

<script>

	import axios from 'axios';
	import {routeExporter} from '../../helpers'

	export default routeExporter({
		props: ['settingsObj'],
		beforeCreate() {
			axios.get(`${this.$endpoints.base}`).then((e, i) => {
				console.log('done loading', this.$endpoints.base)
				this.isLoaded = true;
			});
		},
		data() {
			return {
				isLoaded: false,
            }
		},
		methods: {
		}

	})


</script>

<style lang="scss">

    .docs {
        height: 90vh;
        width: 100%;
    }

</style>
