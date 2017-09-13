<template>
    <v-container
            fluid
            mt-1
    >

        <v-layout row wrap>


            <step-list
                    endpoint="bio"
            >

            </step-list>

        </v-layout>
    </v-container>

</template>

<script>

	import StepList from '../StepList.vue'

	export default {
		components: {StepList},
		data() {
			return {}
		},

	}
</script>

<style lang="scss">

</style>
