<template>



        <v-layout row wrap >

            <v-flex xs12 sm8 offset-sm2>

                <!--:leave-active-class="`animated ${animation}`"-->
                <transition-group
                        name="custom-classes-transition"
                        :enter-active-class="`animated ${animation}`"
                >


                    <v-card
                            transition="slide-x-transition"
                            v-for="(item,i) in profileData[this.name]"
                            flat light
                            :class="['mb-3',`${themeColor}--text`, `${themeColor} lighten-4`, 'text--darken-3', 'elevation-2']"
                            :key="item[item.key]"
                            :value="name === item.name"
                            :data-key="item[item.key]"
                            @click="(e)=>{
                                   	//toggleResumeCard(e.target.parentElement.dataset.company);
                                   }"
                    >

                        <v-card-title primary-title>

                            <div class="headline full-width">{{item.title}}</div>

                            <v-layout fluid class="full-width grey--text">
                                <v-flex
                                        v-if="item.company"
                                        xs8>
                                    <div
                                    >{{item.company}}
                                    </div>
                                </v-flex>

                                <v-flex
                                        v-if="item.timeFrame"
                                        xs4>
                                    <div
                                            class="text-align--right">{{item.timeFrame}}
                                    </div>
                                </v-flex>
                            </v-layout>

                        </v-card-title>
                        <v-card-actions>

                            <v-spacer></v-spacer>
                            <v-btn
                                    icon
                                    :id="`${item[item.key]}`"
                                    @click.native="(e)=>{
                                   	toggleResumeCard(e.target.parentElement.id);
                                   }"
                            >
                                <v-icon>
                                    {{ (expandedItem == item[item.key]) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                                    }}
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-slide-y-transition>
                            <v-card-text v-show="expandedItem == item[item.key]">

                                <ul>
                                    <li
                                            v-for="(descItem,i2) in item.descArr"
                                            flat
                                            light
                                            :class="['mb-2',`${themeColor}--text`, 'text--darken-4']"
                                            :key="descItem"
                                    >
                                        {{descItem}}
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-slide-y-transition>

                    </v-card>

            </transition-group>

            </v-flex>


        </v-layout>

</template>

<script>

	export default {
		props: ['themeColor', 'name', 'profileData', 'animation'],
		data() {
			return {
				expandedItem: ''
			}
		},
		computed: {},
		methods: {
			toggleResumeCard(itemName) {
				console.log('toggz', itemName)
				if (itemName == this.expandedItem) {
					this.expandedItem = '';
				} else {
					this.expandedItem = itemName;
				}
			}
		}

	}

</script>

<style lang="scss">


</style>
