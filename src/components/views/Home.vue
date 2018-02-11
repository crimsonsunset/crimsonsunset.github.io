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
                    v-show='!drawer'
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
                    <div class="home-page__typer-container">
                        <h2>I {{i}} </h2>

                        <div>
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
                        </div>


                    </div>

                </v-carousel-item>

            </v-carousel>


            <div
                    v-show='!drawer'
                    class="home-page__btn-container">

                <v-btn
                        :class="[settingsObj.themeColor, 'darken-2', 'white--text', 'home-page__btn-next', 'text-lg-right']"
                        @click.native.stop="infoModal = true">Who?
                </v-btn>


                <v-spacer></v-spacer>
                <v-btn
                        :class="[settingsObj.themeColor, 'darken-2', 'white--text', 'home-page__btn-next', 'text-lg-right']"
                        ref="btn-next"
                        @click="clickNext"
                >Tell me more!
                </v-btn>
            </div>

            <v-dialog
                    class="home-page__dialog"
                    width="70%"
                    v-model="infoModal">
                <v-card
                        class="home-page__info-modal"
                >
                    <v-card-title
                            :class="[settingsObj.themeColor, 'lighten-1', 'headline', 'white--text', 'home-page__btn-next', 'text-lg-right']"
                            class="headline">About Me
                    </v-card-title>
                    <v-card-text>
                        <p>
                            Hello and welcome to my Portfolio site! My name is Joe Sangiorgio and I'm currently a Senior
                            Front End Engineer at Marvel Entertainment. I have a passion for all things Javascript, and
                            love creating meaningful data-driven web applications.</p>

                        <p>
                            I made this app in order to have an interesting space to showcase the type of work I love
                            doing. My goal was to create an environment that would present my professional products in a
                            unique and compelling way. I also just wanted to play with some flashy cutting-edge web
                            technologies! 🤓</p>

                        <p>
                            I hope you have as much fun exploring this app as I did building it. Thanks for
                            visiting!</p>

                        <p>-Joe</p>

                        <v-flex
                                class="home-page__profile-photo"
                        >
                            <div>
                                <img
                                        width="90%"
                                        src="../../assets/pics/joe.jpg" alt="joe">
                            </div>
                        </v-flex>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                :class="['darken-2', `${settingsObj.themeColor}--text`]"
                                flat="flat" @click.native="infoModal = false">Cool!
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

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
                infoModal: false,
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
                if (!this.drawer && !this.infoModal) {
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

    @import "../../styles/colors";

    .home-page {

        display: flex;
        align-items: center;

        &__content {
            margin-top: -5vh;
        }

        &__hello, &__cta .headline {
            text-align: center;
            margin: 0 auto;
        }
        &__btn-container {
            /*border: 2px solid red;*/
            display: flex;
            justify-content: space-between;
        }
        &__typer-container {
            display: flex;
            justify-content: center;
            align-items: center;
            h2 {
                margin-right: 10px;
            }
        }

        &__info-modal {
            margin-top: 50px;
            margin-bottom: 30px;
        }
        &__profile-photo {
            display: flex;
            justify-content: center;
            div {
                display: grid;
                align-self: center;
            }
            img {
                margin: 0 auto;
                max-width: 500px;
            }

        }
    }

    .dialog {
        box-shadow: none !important;
    }

    #home-carousel {
        height: 200px;

        .btn__content {
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
        color: $typer-gray;
        background-color: $typer-black;
    }

    .vue-typer .custom.char.selected {
        background-color: $typer-selected;
    }

    .vue-typer .custom.caret {
        width: 10px;
        background-color: $typer-carat;
    }


</style>



