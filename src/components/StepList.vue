<template>


    <v-flex xs12 md8 offset-md2 pb-5 mt-3 class="card-list">
        <v-stepper
                vertical
                ref="stepper"
                v-model="currStep">

            <template
                    v-for="(item, n) in bio">
                <v-stepper-step
                        :step="n+1"
                        :complete="currStep > n"
                        editable

                        ref="steps"
                >

                    {{`${item.name}: ${item.location}`}}

                    <small>{{`${item.date}`}}</small>
                </v-stepper-step>


                <v-stepper-content
                        :step="n+1"
                        :key="n"
                >
                    <v-card
                            :class="[`${settingsObj.themeColor} lighten-2`, 'white--text', 'mb-3', 'elevation-3']"
                    >

                        <v-card-text class="description-text">

                            <ul>
                                <li
                                        v-for="(descItem,i2) in item.descriptionArr"
                                        light
                                        :key="descItem"
                                >
                                    {{descItem}}
                                </li>
                            </ul>
                        </v-card-text>


                    </v-card>
                    <v-btn
                            :class="[`${settingsObj.themeColor} darken-2`, 'white--text']"
                            @click="currStep=n+2">Continue
                    </v-btn>
                </v-stepper-content>
            </template>

        </v-stepper>

    </v-flex>


</template>

<script type="text/jsx">

	import axios from 'axios'
	import {map, times, delay, forEach} from 'lodash'

	export default {
		props: ['settingsObj', 'endpoint'],

		//todo: this is a hack because the stepper component is very picky about data it recieves and gets crippled when its incomplete
		beforeCreate() {
			this.bio = times(4, () => {
					return {
						"name": "",
						"location": "",
						"date": "",
						"icon": "",
						"descriptionArr": []
					}
				}
			);
			//            			debugger;
		},
		created() {
			const {endpoint} = this;
			const {themeColor} = this.settingsObj;
			axios.get(`${this.$endpoints.info}${endpoint}`)
				.then(({data}) => {
					this[endpoint] = data;
					this.totalSlideNumber = data.length;
					//adjust icons
					const stepRefs = this.$refs['stepper'].$el.getElementsByTagName('span');
					forEach(stepRefs, (e, i) => {
						const newSpan = `<span class="stepper__step__step ${themeColor}"><i class="material-icons icon">${this[endpoint][i].icon}</i></span>`
						e.outerHTML = newSpan;
					});
					delay(() => {
						this.currStep = 1;
						this.settingsObj.isLoaded = true;
						this.settingsObj.loaderRef.classList.remove('is-active');
						this.$forceUpdate()
					}, 400)

				});


		},
		data() {
			return {
				currStep: -1,
				item: '',
				totalSlideNumber: 4
			}
		},
		computed: {},
		methods: {
			nextStep(n) {
				console.log('nextstep', this.currStep, n);
				this.currStep = n + 1

			},
		},
	}

</script>

<style lang="scss">

    .stepper {

        &__step {

            padding: 24px 24px 26px !important;
        }

        &__step--active div {
            font-size: 18px;
        }

        &__label {
            font-size: 16px;
            small {
                font-size: 13px;
            }
        }

        &__content {
            padding: 0px 22px 0px 8px !important;
            margin-bottom: 8px !important;
        }

        .description-text {
            font-size: 16px;
            line-height: 30px;
            margin-top: 0px;
        }

        &__step__step {

            height: 50px;
            width: 50px;
            i {
                font-size: 35px !important;
            }
        }
    }

    @media only screen and (max-width: 500px) {

        .stepper {
            &__step {
                padding: 24px 0px 6px 6px !important;
            }
            &__content {
                /*margin: 4px 0 4px 36px !important;*/

                padding: 0px !important;
                margin: 10px !important;
            }
        }
    }


</style>
