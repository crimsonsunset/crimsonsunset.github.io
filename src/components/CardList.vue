<template>


    <v-layout row wrap>

        <v-flex xs10 offset-xs1 sm8 offset-sm2 pb-5 class="card-list">

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
                            	toggleResumeCard(item.title);
                                   }"
                >
                    <v-card-title primary-title>


                        <div class="headline full-width">

                            <div v-if="isURL(item.title)">
                                <a :href="`http://${item.title}`" target="_blank"> {{item.title}}</a>
                            </div>
                            <div v-else>
                                {{item.title}}
                            </div>
                        </div>

                        <v-layout fluid class="full-width grey--text">
                            <v-flex
                                    v-if="item.company"
                                    xs7>
                                <div
                                >{{item.company}}
                                </div>
                            </v-flex>

                            <v-flex
                                    v-if="item.timeFrame"
                                    xs5>
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
                        >
                            <v-icon>
                                {{ (expandedItem == item[item.key]) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                                }}
                            </v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-slide-y-transition>
                        <v-card-text v-show="expandedItem == item[item.key]" class="description-text">

                            <ul>
                                <li
                                        v-for="(descItem,i2) in item.descArr"
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
				console.log('toggz', itemName, this)
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

    .card-list{
        .headline{
            margin-bottom: 5px;
        }

        .card__title--primary {
            padding-top: 10px;

        }
        .card__actions{
            padding: 0;
            padding-bottom: 5px;
        }
    }

    .description-text {
        margin-top: -20px;
    }

</style>
