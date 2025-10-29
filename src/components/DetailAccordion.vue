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
                                        v-if="!imageErrors[i]"
                                        :src="item.img"
                                        alt="avatar"
                                        @error="handleImageError(i)">
                                <colored-avatar 
                                        v-else
                                        :text="item.name" 
                                        mode="initials"
                                />

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
	import ColoredAvatar from './ColoredAvatar.vue'

	export default {
		components: { ColoredAvatar },
		props: ['endpoint', 'settingsObj'],
		mounted() {
			const {endpoint} = this;
			axios.get(`${this.$endpoints.info}${endpoint}`)
				.then(({data}) => {
					this[endpoint] = data;
					// Initialize error tracking for each item
					this.imageErrors = new Array(data.length).fill(false);
					//remove loader
					this.settingsObj.isLoaded = true;
					this.settingsObj.loaderRef.classList.remove('is-active');
					this.$forceUpdate();
				});
		},


		data() {
			return {
				currRef: '',
				references: [],
				imageErrors: []
			}
		},
		computed: {},
		methods: {
			handleImageError(index) {
				this.$set(this.imageErrors, index, true);
			}
		}
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
