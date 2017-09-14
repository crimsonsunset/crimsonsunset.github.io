<template>

    <v-layout row wrap>

        <v-flex xs10 offset-xs1 sm8 offset-sm2 pb-5 class="card-list">
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
                            :class="[`${themeColor} lighten-2`, 'white--text', 'mb-3']"
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
                            :class="[`${themeColor} darken-2`, 'white--text']"
                            @click="nextStep(n+1)">Continue
                    </v-btn>
                </v-stepper-content>
            </template>


        </v-stepper>


        </v-flex>


    </v-layout>

</template>

<script type="text/jsx">

	import axios from 'axios'
	import {map, times, delay, forEach} from 'lodash'

	export default {
		props: ['themeColor', 'endpoint', 'animation'],

		//todo: this is a hack because the stepper component is very picky about data it recieves and gets crippled when its incomplete
		beforeCreate() {
			console.log("beforeCreate!", this);
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
			const {endpoint, themeColor} = this;
//			axios.get(`http://localhost:3000/api/${endpoint}`)
			axios.get(`https://crimsonsunset-portfolio.herokuapp.com/api/${endpoint}`)
				.then(({data}) => {
					this[endpoint] = data;
					this.totalSlideNumber = data.length;
					//adjust icons
					const stepRefs = this.$refs['stepper'].$el.getElementsByTagName('span');
					forEach(stepRefs, (e, i) => {
						const newSpan = `<span class="stepper__step__step ${themeColor}"><i class="material-icons icon">${this[endpoint][i].icon}</i></span>`
						e.outerHTML = newSpan;
					});
//					delay(()=>{this.$forceUpdate()}, 200);
					this.$forceUpdate()
				});


		},
		//		mounted() {
		//		},
		data() {
			return {
				e6: 0,
				n: 0,
				i: 0,
				currStep: 0,
				steps: [{
					name: 'ggg'
				}, {}, {}, {}],
				item: '',
				totalSlideNumber: 4
			}
		},
		//				render(h) {
		//					const {endpoint} = this;
		//					const currArr = this[endpoint];
		//
		//		//			console.log('currArr');
		//		//			console.log(currArr);
		//					let steps;
		//					if (currArr.length > 0) {
		//		//				console.log('doing')
		//
		//		                steps = map(currArr, (item, i) => {
		//							//				console.log('eee')
		//							//				console.log(e)
		//		//					console.log(i)
		//
		//			                const stepNum = i + 1;
		//							return (
		//                                            <template>
		//                                                <v-stepper-step
		//                                                step={i}
		//                                                complete={this.currStep > i-1}
		//                                                    editable
		//                                            >
		//
		//												{`${item.name}: ${item.location}`}
		//
		//                                                <small>{`${item.date}`}</small>
		//                                            </v-stepper-step>
		//
		//
		//                                            <v-stepper-content
		//                                                    step={i}
		//                                                    key={i}
		//                                        >
		//                                            <v-card class="grey lighten-1 mb-5" height="200px">
		//
		//												{item.descriptionArr}
		//
		//                                            </v-card>
		//                                            <v-btn primary on-click-native={()=>{}}>Continue</v-btn>
		//                                    </v-stepper-content>
		//		                </template>)
		//						})
		//
		//						console.log('steps')
		//						console.log(steps)
		//					}
		//
		//					return (
		//
		//                            <v-flex>
		//                                <v-stepper
		//                                        vertical
		//                                        v-model={this.currStep}>
		//								{steps}
		//                                </v-stepper>
		//                            </v-flex>
		//
		//					)
		//				},
		computed: {},
		methods: {
			nextStep(n) {
				if (n === this.steps) {
					this.currStep = 0
				} else {
					this.currStep = n + 1
				}
			},

			addStepRef(e) {
				console.log('sss')
				console.log(e)
				return `step-${e}`
			},
		},
	}

</script>

<style lang="scss">

    .stepper {

        .description-text{
            font-size: 16px;
            line-height: 30px;
        }

        &__step__step {

            height: 50px;
            width: 50px;
            i {
                font-size: 35px !important;
            }
        }
    }

</style>
