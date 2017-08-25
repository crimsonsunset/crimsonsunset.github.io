<template>
    <v-container fluid>



        <v-flex xs12 md6 offset-md3>
            <h1 class="hello"> Hi, I'm Joe.</h1>
        </v-flex>


<!--{{this.items}}-->

            <v-carousel
                    cycle
                    dark
                    :interval='6000000'
                    :leftControlIcon='false'
                    ref="home-carousel"
                    id="home-carousel"
                    style="{height: 200px}"
                    >


                <v-carousel-item
                        src="NOT_AN_IMAGE"
                        v-for="(item,i) in $data"
                        :key="i"
                >
                    <h2> I {{i}}

                        <vue-typer
                                :text='$data[i]'
                                :shuffle='false'
                                initial-action='typing'
                                :pre-type-delay='70'
                                :type-delay='60'
                                :pre-erase-delay='750'
                                :erase-delay='200'
                                erase-style='select-all'
                                caret-animation='blink'
                                @erased='(e)=>{
                                	onErased(e,i);
                                }'
                        ></vue-typer>

                    </h2>


                </v-carousel-item>

            </v-carousel>


        <!--<v-layout row wrap>-->
            <!--<v-flex xs12 md6 offset-md3>-->
                <!--<v-card-->
                        <!--:class="['white', 'lighten-1', '', 'elevation-12']"-->
                <!--&gt;-->
                    <!--<v-card-title primary-title>-->
                        <!--<h1> Hi, I'm Joe.</h1>-->
                    <!--</v-card-title>-->
                <!--</v-card>-->
            <!--</v-flex>-->

        <!--</v-layout>-->






        <button
        @click="clickNext"
        >clizkz</button>


        <!--<v-expansion-panel class="info-accordion">-->
            <!--<v-expansion-panel-content v-for="(item,i) in 50" :key="i">-->
                <!--<div slot="header">Item</div>-->
                <!--<v-card>-->
                    <!--<v-card-text :class="[themeColor, 'lighten-2']">-->
                        <!--Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.-->
                    <!--</v-card-text>-->
                <!--</v-card>-->
            <!--</v-expansion-panel-content>-->
        <!--</v-expansion-panel>-->


    </v-container>
</template>

<script>

	import {VueTyper} from 'vue-typer'
	import {find, keys} from 'lodash'

	export default {
		components: {VueTyper},
		props: ['themeColor', 'toTop'],
		data() {
			return {
//				items: ['hyezzz'],
				build: ["Websites","Web Apps"],
				teach: ["Front End Development","Full Stack Development","","Servers","Smart Homes", "", "SmartHomes", "SmartHomes"],
				know: ["Javascript [ES6/7]", "HTML5", "Sass", "CSS3", "JSON", "Python", "React","Redux/Flux","Vue", "Bootstrap", "Material UI", "Lodash", "Webpack", "Gulp", "Grunt"],
				like: ["Coding","Teaching","Racquetball","Snowboarding","Tinkering", "Learning", "Live Music", "Food Trucks"]
            }
		},
		computed: {
			items() {
				const elemData = this.$data;
				const typeArr = keys(this.$data);
				let items = {};
				typeArr.forEach((e, i) => {
					items[e] = elemData[e]
				});
				return items;
			},
            currSlider:{
//	            get() {
//	            	console.log('this')
//	            	console.log(this)
//		            return 'build';
//	            },
	            set(inVal) {
		            this.currSlider = inVal;
	            }
            }
		},
        methods:{
	        onErased: function(string, currKey) {
		        let {$data, currSlider} = this;
		        const currArr = $data[currKey];


		        //other typers that are already going, ignore.
		        if (currSlider != currKey) {
		        	return
		        } else {
			        const {length} = currArr;
			        if (currArr[length-1] == string) {
//				        const sliderArr = ['build', 'teach', 'know', 'like'];
//				        this.currSlider = 'teach'
				        debugger;
				        this.clickNext();
			        }
		        }



	        },
			test(){
				console.log('hey compelzzz', this)
            },
			clickNext(){
				const children = this.$refs['home-carousel'].$el.children;
				let nextBtn = find(children, (e)=> e.className.includes('right'));
				nextBtn = nextBtn.children[0];
				nextBtn.click();
            }
        }

	}
</script>


<!--@keyframes rocking {-->
<!--0%,100% {transform: rotateZ(-10deg);},-->
<!--50%     {transform: rotateZ(10deg);}-->
<!--}-->

<!--.vue-typer {-->
<!--font-family: Roboto, 'Helvetica Neue', Helvetica, sans-serif;-->
<!--}-->
<!--.vue-typer .custom.char.typed {-->
<!--color: #009688;-->
<!--}-->
<!--.vue-typer .custom.char.selected {-->
<!--color: #E91E63;-->
<!--}-->

<!--.vue-typer .custom.caret {-->
<!--animation: rocking 1s ease-in-out 0s infinite;-->
<!--}-->
<!--.vue-typer .custom.caret.typing {-->
<!--background-color: #009688;-->
<!--}-->
<!--.vue-typer .custom.caret.selecting {-->
<!--display: inline-block;-->
<!--background-color: #E91E63;-->
<!--}-->

<style lang="scss">


    .hello{
        text-align: center;
    }

    #home-carousel{
        height: 200px;

        .carousel__controls {
            display: none;

        }
    }


    .vue-typer {
        font-family: monospace;
        font-size: 24px
    }

    .vue-typer .custom.char {
        color: #D4D4BD;
        background-color: #1E1E1E;
    }
    .vue-typer .custom.char.selected {
        background-color: #264F78;
    }

    .vue-typer .custom.caret {
        width: 10px;
        background-color: #3F51B5;
    }


</style>
