<template>

    <v-layout row wrap>
        <v-flex xs12 md8 offset-md2 lg6 offset-lg3>

            <v-expansion-panel popout>
                <v-expansion-panel-content
                        ripple
                        v-for="(item,i) in this[endpoint]"
                        :key="i"
                        :class="[`${themeColor}`, 'lighten-1', `white--text`]"
                >
                    <div slot="header" class="mt-2 mb-2">
                        <!--<v-avatar-->
                                <!--class="grey lighten-4"-->
                        <!--&gt;-->
                            <!--<img-->
                                    <!--:src="item.img"-->
                                    <!--alt="avatar">-->
                        <!--</v-avatar>-->

                        <!--{{item.name}}-->

                        <v-list-tile>
                            <v-list-tile-avatar>

                                <!--<v-avatar-->
                                        <!--class="grey lighten-4"-->
                                <!--&gt;-->
                                    <!--<img-->
                                            <!--:src="item.img"-->
                                            <!--alt="avatar">-->
                                <!--</v-avatar>-->
                                <img
                                        :src="item.img"
                                        alt="avatar">

                            </v-list-tile-avatar>


                            <v-list-tile-content class="ml-2 ">
                                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ item.date }}</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <!--<v-btn icon>-->
                                    <!--<v-icon class="grey&#45;&#45;text text&#45;&#45;lighten-1">info</v-icon>-->
                                <!--</v-btn>-->

                                <small>{{item.relationship}}</small>

                            </v-list-tile-action>
                        </v-list-tile>




                    </div>
                    <v-card>
                        <v-card-text class="grey lighten-3">{{item.body}}</v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-flex>
    </v-layout>


</template>

<script>

	import axios from 'axios'

	export default {
		props: ['themeColor', 'endpoint'],
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
		}
	}

</script>

<style lang="scss">

</style>
