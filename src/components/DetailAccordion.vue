<template>

    <transition

            name="custom-classes-transition"
            :enter-active-class="`animated ${settingsObj.animation}`"
    >
    <v-layout row wrap mb-5 class="detail-accordion">
        <v-flex xs12 md8 offset-md2 lg6 offset-lg3>


            <v-expansion-panel
                    :full-screen="$vuetify.breakpoint.xsOnly"
                    popout>

                <!--<transition-group-->
                <!--@click={test}-->
                <!--name="custom-classes-transition"-->
                <!--:enter-active-class="`animated ${animation}`"-->
                <!--&gt;-->

                <v-expansion-panel-content
                        transition="slide-x-transition"
                        ripple
                        v-for="(item,i) in this[endpoint]"
                        :key="i"

                        :class="[`${settingsObj.themeColor}`, 'lighten-1', `white--text`, 'mb-1']"
                >
                    <div
                            slot="header" class="mt-1 mb-1">

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

                <!--</transition-group>-->

            </v-expansion-panel>

        </v-flex>
    </v-layout>
    </transition>


</template>

<script>

	import axios from 'axios'

	export default {
		props: ['endpoint', 'settingsObj'],
		mounted() {
			const {endpoint} = this;
			axios.get(`${this.$endpoints.info}${endpoint}`)
				.then(({data}) => {
					this[endpoint] = data;
					this.$forceUpdate();
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

			test(e) {
				console.log('ss', e)
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

    .detail-accordion {
        .expansion-panel__container--active {
            margin-bottom: 15px !important;
        }
    }

    @media only screen and (max-width: 500px) {

        .detail-accordion {
            .list__tile__action {
                display: none;
            }

            .list__tile__avatar {

                margin-left: -20px;
            }

        }
    }


</style>
