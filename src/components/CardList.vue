<template>


    <v-layout row wrap>

        <v-flex xs10 offset-xs1 sm8 offset-sm2 pb-5 class="card-list">

            <!--:leave-active-class="`animated ${animation}`"-->
            <transition-group
                    name="custom-classes-transition"
                    :enter-active-class="`animated ${settingsObj.animation}`"
            >

                <v-card
                        transition="slide-x-transition"
                        v-for="(item,i) in this[this.name]"
                        flat light
                        :class="['mb-3',`${settingsObj.themeColor}--text`, `${settingsObj.themeColor} lighten-4`, 'text--darken-3', 'elevation-2']"
                        :key="item[item.key]"
                        :value="name === item.name"
                        :data-key="item[item.key]"
                        @click="(e)=>{
                            	toggleResumeCard(item.title);
                                   }"
                >
                    <v-card-title primary-title>


                        <v-layout fluid class="full-width black--text">
                            <v-flex
                                    mb-2
                                    xs2
                                    md1
                            >
                                <v-avatar
                                        :tile="true"
                                        size="50px"
                                        ref="joe"

                                >
                                    <img :src="item.img" alt="avatar">
                                </v-avatar>
                            </v-flex>

                            <v-flex
                                    md11
                                    pl-2
                                    xs10>
                                <div class="headline">

                                    <div
                                            class="headline__text"
                                            v-if="isURL(item.title)">
                                        <a :href="`http://${item.title}`" target="_blank"> {{item.title}}</a>
                                    </div>
                                    <div class="headline__text"
                                            v-else>
                                        {{item.title}}
                                    </div>
                                </div>
                            </v-flex>
                        </v-layout>


                        <v-layout fluid class="full-width black--text">
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
                                        :class="['mb-2',`${settingsObj.themeColor}--text`, 'text--darken-4']"
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

	import axios from 'axios'

	export default {
		props: ['settingsObj', 'name'],
		mounted() {
			console.log('this')
			console.log(this)
			this.getInfo();
		},
		beforeUpdate(e) {
			const {name} = this;
			if (!this[name]) {
				this.getInfo();
			}
		},
		data() {
			return {
				expandedItem: '',
				experience: '',
				projects: ''
			}
		},
		computed: {},
		methods: {
			toggleResumeCard(itemName) {
				//				console.log('toggz', itemName, this)
				if (itemName == this.expandedItem) {
					this.expandedItem = '';
				} else {
					this.expandedItem = itemName;
				}
			},
			getInfo() {

				const {name} = this;
				axios.get(`${this.$endpoints.info}${name}`)
					.then(({data}) => {
						let currExp = data;
						const splitNameArr = ['experience', 'projects'];

						splitNameArr.forEach((e, i) => {
							currExp.map((e2, i2) => {

								const splitDescription = (description) => {
									let descArr = description.split('•').slice(1);
									return descArr
								};

								e2.descArr = splitDescription(e2.description);
								e2.key = 'title';
								e2.img = `../src/assets/logos/${e2.logo.toLowerCase()}.png`;
								return e2;
							});
							this[name] = currExp;

							//remove loader
							this.settingsObj.isLoaded = true;
							this.settingsObj.loaderRef.classList.remove('is-active');
						});
						this.$forceUpdate();
					});


			}
		}

	}

</script>

<style lang="scss">

    .card-list {
        cursor: pointer;
        .headline {
            margin-bottom: 5px;
            &__text{
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        .card__title--primary {
            padding-top: 10px;

        }
        .card__actions {
            padding: 0;
            padding-bottom: 5px;
        }
    }

    .description-text {
        margin-top: -20px;
    }

    @media only screen and (max-width: 400px) {

        .headline__text {
            padding-left: 20px;
            font-size: 18px;
        }
    }



</style>
