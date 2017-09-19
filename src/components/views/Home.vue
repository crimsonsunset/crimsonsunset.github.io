<template>
    <v-container
            class="home-page"
            fluid>
        <v-flex
                class="home-page__content"
                xs12 md6 offset-md3>
            <h1 class="home-page__hello"> Hi, I'm Joe.</h1>

            <v-carousel
                    cycle
                    dark
                    class="elevation-0"
                    :interval='6000000'
                    :leftControlIcon='false'
                    ref="home-carousel"
                    id="home-carousel"
            >

                <v-carousel-item
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                        v-for="(item,i) in sliderData"
                        :key="i"
                >
                    <h2> I {{i}}


                        <vue-typer
                                :text='sliderData[i]'
                                :shuffle='false'
                                initial-action='typing'
                                :pre-type-delay='70'
                                :type-delay='60'
                                :pre-erase-delay='750'
                                :erase-delay='200'
                                erase-style='select-all'
                                caret-animation='blink'
                                ref="home-typer"
                                @erased='(e)=>{
                                	onErased(e,i);
                                }'
                        ></vue-typer>

                    </h2>

                </v-carousel-item>

            </v-carousel>


            <div class="home-page__btn-container">
                <v-btn
                        :class="[settingsObj.themeColor, 'darken-2', 'white--text', 'home-page__btn-next', 'text-lg-right']"
                        ref="btn-next"
                        @click="clickNext"
                >Tell me more!
                </v-btn>
            </div>

        </v-flex>

    </v-container>
</template>

<script>

	import {VueTyper} from 'vue-typer'
	import {find, keys, delay} from 'lodash'
	import {routeExporter} from '../../helpers'
	let currSliderIndex = 0;

	export default routeExporter({
		components: {VueTyper},
		props: ['settingsObj', 'toTop', 'drawer'],
		data() {
			return {
				sliderData: {
					build: ["Websites", "Web Apps", "Native Apps", "Servers", "Layouts", "Wireframes", "Raspberry Pi Hacks", "Home Automation Systems"],
					teach: ["Front End Development", "Full Stack Development", "Servers", "Comp Sci Concepts"],
					know: ["Javascript [ES6/7]", "HTML5", "Sass", "CSS3", "JSON", "Python", "React", "Redux/Flux", "Vue", "Bootstrap", "Material UI", "Lodash", "Webpack", "Gulp", "Grunt"],
					like: ["Coding", "Teaching", "Racquetball", "Snowboarding", "Smart Homes", "Tinkering", "Learning", "Live Music", "Food Trucks"]

					//					build: ["Websites", "Web Apps"],
					//					teach: ["Front End Development", 'joe things'],
					//					know: ["Javascript [ES6/7]", "HTML5"],
					//					like: ["Coding", "Teaching"]
				}
			}
		},
		computed: {
			sliderKeys() {
				return keys(this.sliderData)
			}
		},
		methods: {
			onErased: function (string, currKey) {

				let {sliderData, sliderKeys} = this;
				const currArr = sliderData[currKey];
				//other typers that are already going, ignore.
				if (sliderKeys[currSliderIndex] != currKey) {
					return
				} else {
					const {length} = currArr;
					if (currArr[length - 1] == string) {
						this.clickNext();
					}
				}
			},
			test() {
				//                console.log('hey compelzzz', this)
			},
			clickNext() {
				currSliderIndex++;
				const children = this.$refs['home-carousel'].$el.children;
				let nextBtn = find(children, (e) => e.className.includes('right'));
				nextBtn = nextBtn.children[0];

				//clicking button will close the drawer, so block it here
				if (!this.drawer) {
					nextBtn.click();
					delay(this.restartTyper, 100)
				}
			},
			restartTyper() {
				//have past the bounds of the array
				if (!this.$refs['home-typer'][currSliderIndex]) {
					currSliderIndex = 0;
					this.$refs['home-typer'][currSliderIndex].reset();
				} else {
					this.$refs['home-typer'][currSliderIndex].reset();
				}
			}
		}

	})
</script>


<style lang="scss">


    .home-page {

        display: flex;
        align-items: center;

        &__content{
            margin-top: -5vh;
        }

        &__hello, &__cta .headline {
            text-align: center;
            margin: 0 auto;
        }
        &__btn-container {
            display: flex;
            justify-content: flex-end;
        }
    }

    #home-carousel {
        height: 200px;

        .btn__content{
            visibility: hidden;
        }

        .carousel__item {
            text-align: center;
        }
        .carousel__controls {
            display: none;
        }
    }

    //typer styles
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
