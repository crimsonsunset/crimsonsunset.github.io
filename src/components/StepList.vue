<template>

    <!--<v-flex class="stepper">-->
    <!--<v-stepper-->
    <!--:steps="this[endpoint]"-->
    <!--v-model="e6"-->
    <!--vertical>-->

    <!--<v-flex-->
    <!--v-for="(item,i) in this[endpoint]"-->
    <!--:key="i"-->
    <!--&gt;-->

    <!--<v-stepper-step-->
    <!--editable-->
    <!--:key="i"-->
    <!--:step="i"-->
    <!--:complete="e6 > 1"-->
    <!--&gt;-->
    <!--{{item.name}}-->
    <!--<small>-->
    <!--{{item.date}}-->
    <!--</small>-->

    <!--</v-stepper-step>-->

    <!--<v-stepper-content-->
    <!--:step="i"-->
    <!--&gt;-->
    <!--<v-card class="grey lighten-1 mb-5" height="200px"></v-card>-->
    <!--<v-btn primary @click.native="e6 = 2">Continue</v-btn>-->
    <!--</v-stepper-content>-->
    <!--</v-flex>-->


    <!--</v-stepper>-->

    <!--</v-flex>-->



    <!--<v-stepper-header>-->
    <!--<template v-for="(item,n) in this[endpoint]">-->
    <!--<v-stepper-step-->
    <!--:key="n"-->
    <!--:step="n"-->
    <!--:complete="currStep > n"-->
    <!--editable-->
    <!--&gt;-->
    <!--Step {{ n + 1 }}-->
    <!--</v-stepper-step>-->
    <!--<v-divider v-if="n !== steps"></v-divider>-->
    <!--</template>-->
    <!--</v-stepper-header>-->



    <v-flex>
        <v-stepper
                vertical
                v-model="currStep">





            <template
                    v-for="(item, n) in bio">
                <v-stepper-step
                        :step="n"
                        :complete="currStep > n-1"
                        editable
                >

                    {{`${item.name}: ${item.location}`}}

                    <small>{{`${item.date}`}}</small>
                </v-stepper-step>


                <v-stepper-content
                        :step="n"
                        :key="n"
                >
                    <v-card class="grey lighten-1 mb-5" height="200px">

                        {{item.descriptionArr}}

                    </v-card>
                    <v-btn primary @click="nextStep(n)">Continue</v-btn>
                </v-stepper-content>
            </template>


        </v-stepper>


    </v-flex>

</template>

<script type="text/jsx">

	import axios from 'axios'
	import {map, times} from 'lodash'

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
			const {endpoint} = this;
						axios.get(`http://localhost:3000/api/${endpoint}`)
							.then(({data}) => {
								this[endpoint] = data;
								this.totalSlideNumber = data.length;
								console.log(this)
								this.$forceUpdate();
							});


		},
		beforeDestroy() {

		},
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
			}
		},
	}

</script>

<style lang="scss">

</style>
