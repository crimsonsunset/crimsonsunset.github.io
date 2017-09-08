<template>

    <v-layout row wrap>
        <v-flex xs12 md8 offset-md2 lg6 offset-lg3>

            <!--<transition-group-->
                    <!--name="custom-classes-transition"-->
                    <!--:enter-active-class="`animated ${animation}`"-->
            <!--&gt;-->

                <v-expansion-panel
                        :key="animation"
                        :enter-active-class="`animated ${animation}`"
                        transition="slide-x-transition"
                        popout>
                    <v-expansion-panel-content
                            ripple
                            v-for="(item,i) in this[endpoint]"
                            :key="i"
                            :class="[`${themeColor}`, 'lighten-1', `white--text`, 'mb-1']"
                    >
                        <div slot="header" class="mt-2 mb-2">

                            <v-list-tile>
                                <v-list-tile-avatar>
                                    <img
                                            :src="item.img"
                                            alt="avatar">

                                </v-list-tile-avatar>


                                <v-list-tile-content class="ml-2 ">
                                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                    <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>

                                    <small>{{item.relationship}}</small>

                                </v-list-tile-action>
                            </v-list-tile>

                        </div>
                        <v-card>
                            <v-card-text class="grey lighten-3">

                                <div v-html="item.body"></div>

                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>

            <!--</transition-group>-->

        </v-flex>
    </v-layout>


</template>

<script>

	import axios from 'axios'

	export default {
		props: ['themeColor', 'endpoint', 'animation'],
		mounted() {
			const {endpoint} = this;
			axios.get(`http://localhost:3000/api/${endpoint}`)
				.then(({data}) => {
					console.log(data)
					this[endpoint] = data;
				});
		},


		data() {
			return {
				currRef: '',
				references: [],
			}
		},
		computed: {},
		methods: {

			layout() {

			},
		},
		//		render(createElement) {
		//			return createElement(
		//				'div',
		//				{
		//					attrs: {
		//						'class': 'title'
		//					}
		//				},
		//				['helszz']
		//			);
		//        }
	}

</script>

<style lang="scss">

</style>
