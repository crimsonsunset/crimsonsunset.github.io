<template>

    <div class="container">

        <v-carousel
                v-for="(item,i) in this[endpoint]"
                :key="i"
                :class="['background',`${themeColor}`, 'lighten-1', `white--text`, 'mb-1']"
        >
            <!--:style="`background-image: url('${img}')`"-->


            <!--<div-->
            <!--v-for="(img,j) in item.imgArr"-->
            <!--:key="j"-->
            <!--class="carousel__item"-->
            <!--:src="item.src"-->
            <!--&gt;-->
            <!--</div>-->


            <v-carousel-item
                    v-for="(img,j) in item.imgArr"
                    :key="j"
                    :src="img"
            >

                <div
                        class="content-wrapper">


                    <v-layout row wrap>
                        <v-flex xs12 md8 offset-md2 lg6 offset-lg3 mt-5>


                            <v-avatar
                                    :tile="false"
                                    size="5"
                            >
                                <img :src="item.img" alt="avatar">
                            </v-avatar>

                            <v-container mt-5 class="content-title">
                                {{item.name}}
                            </v-container>

                        </v-flex>
                    </v-layout>

                </div>


            </v-carousel-item>
        </v-carousel>

        <!--src="https://i.redd.it/4vqygabli4mx.jpg">-->
        <!--<div class="content-wrapper">-->


        <!--</div>-->


        <!--<section-->
        <!--v-for="(item,i) in this[endpoint]"-->
        <!--:key="i"-->
        <!--:class="['background',`${themeColor}`, 'lighten-1', `white&#45;&#45;text`, 'mb-1']"-->
        <!--&gt;-->
        <!--<div class="content-wrapper">-->


        <!--<v-layout row wrap>-->
        <!--<v-flex xs12 md8 offset-md2 lg6 offset-lg3 mt-5>-->


        <!--<v-avatar-->
        <!--:tile="false"-->
        <!--size="5"-->
        <!--&gt;-->
        <!--<img :src="item.img" alt="avatar">-->
        <!--</v-avatar>-->

        <!--<v-container mt-5 class="content-title">-->
        <!--Title goes here-->
        <!--</v-container>-->

        <!--&lt;!&ndash;<v-card&ndash;&gt;-->
        <!--&lt;!&ndash;transparent&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->

        <!--&lt;!&ndash;<v-card-title primary-title>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="content-title">SI TECH</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<br/>&ndash;&gt;-->
        <!--&lt;!&ndash;<div>its a cool school where people go</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-card-title>&ndash;&gt;-->

        <!--&lt;!&ndash;<v-card-text class="grey lighten-3">&ndash;&gt;-->

        <!--&lt;!&ndash;<div> heres the descriptionszzz</div>&ndash;&gt;-->

        <!--&lt;!&ndash;</v-card-text>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-card>&ndash;&gt;-->

        <!--</v-flex>-->
        <!--</v-layout>-->


        <!--</div>-->
        <!--</section>-->


        <!--<section class="background">-->
        <!--<div class="content-wrapper">-->
        <!--<p class="content-title">Be All There</p>-->
        <!--<p class="content-subtitle">The world is a great big place and if you give it a chance it can make you feel like a part of it despite how small it can make you feel.</p>-->
        <!--</div>-->
        <!--</section>-->
    </div>

</template>

<script>

	import axios from 'axios'
	import {throttle} from 'lodash'

	let ticking = false;
	let isFirefox = (/Firefox/i.test(navigator.userAgent));
	let isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
	let scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
	let slideDurationSetting = 600; //Amount of time for which slide is "locked"
	let currentSlideNumber = 0;
	let totalSlideNumber = 2;
	let delta;

	export default {
		props: ['themeColor', 'endpoint', 'animation'],
		mounted() {

			const mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
			window.addEventListener(mousewheelEvent, throttle(this.parallaxScroll, 60), false);
			const {endpoint} = this;
			axios.get(`http://localhost:3000/api/${endpoint}`)
				.then(({data}) => {
					console.log(data);
					this[endpoint] = data;
					console.log(this[endpoint])
					totalSlideNumber = data.length;
				});
		},
		data() {
			return {
				education: ''
			}
		},
		computed: {},
		methods: {

			//parallax methods [https://codepen.io/country_runner/full/mWXMgX/]
			parallaxScroll(evt) {
				// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
				if (isFirefox) {
					delta = evt.detail * (-120);
				} else if (isIe) {
					delta = -evt.deltaY;
				} else {
					delta = evt.wheelDelta;
				}

				if (ticking != true) {
					if (delta <= -scrollSensitivitySetting) {
						//Down scroll
						ticking = true;
						if (currentSlideNumber !== totalSlideNumber - 1) {
							currentSlideNumber++;
							this.nextItem();
						}
						this.slideDurationTimeout(slideDurationSetting);
					}
					if (delta >= scrollSensitivitySetting) {
						//Up scroll
						ticking = true;
						if (currentSlideNumber !== 0) {
							currentSlideNumber--;
						}
						this.previousItem();
						this.slideDurationTimeout(slideDurationSetting);
					}
				}
			},
			slideDurationTimeout(slideDuration) {
				// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
				setTimeout(function () {
					ticking = false;
				}, slideDuration);
			},
			nextItem() {
				// ------------- SLIDE MOTION ------------- //
				let previousSlide = document.querySelectorAll(".background")[currentSlideNumber - 1];
				previousSlide.classList.remove('up-scroll');
				previousSlide.classList.add("down-scroll");
			},
			previousItem() {
				let currentSlide = document.querySelectorAll(".background")[currentSlideNumber];
				currentSlide.classList.remove('down-scroll');
				currentSlide.classList.add("up-scroll");
			}

		},
	}

</script>

<style lang="scss">

    .resume-view .container {
        padding: 0px;
        max-width: 100%;
        margin-top: -16px;
        overflow: hidden;
    }

    .container.fluid {
        padding: 0px;
        /*border: 1px solid red;*/
        overflow: hidden;
    }

    // ------------- MIXINS ------------- //
    @mixin transition($time, $property: all, $easing: ease-in) {
        transition: $property $time $easing;
    }

    // ------------- VARIABLES ------------- //
    $parallax-offset: 30vh;
    $content-offset: 40vh;
    $transition-speed: 1.5s;
    $slide-number: 3;

    html, body {
        overflow: hidden;
    }

    .background {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        overflow: hidden;
        will-change: transform;
        backface-visibility: hidden;
        height: 100vh + $parallax-offset;
        position: fixed;
        width: 100%;
        transform: translateY($parallax-offset);
        @include transition($transition-speed, all, cubic-bezier(0.22, 0.44, 0, 1));
        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, .3);
        }
        &:first-child {
            background-image: url(http://az616578.vo.msecnd.net/files/2017/02/26/6362373673602705401797046446_1280_profile.jpg);
            transform: translateY(-$parallax-offset / 2);
            .content-wrapper {
                transform: translateY($parallax-offset /2);
            }
        }
        &:nth-child(2) {
            background-image: url("http://img.thedailybeast.com/image/upload/v1492197231/galleries/2014/08/27/25-best-high-schools-in-the-northeast/3_Staten_Island_bfx9va.bmp");
        }
        &:nth-child(3) {
            /*background-image: url("https://i.redd.it/4vqygabli4mx.jpg");*/
        }
    }

    /* Set stacking context of slides */
    @for $i from 1 to ($slide-number + 1) {
        .background:nth-child(#{$i}) {
            z-index: ($slide-number + 1) - $i;
        }
    }

    .content {
        &-wrapper {
            height: 100vh;
            display: flex;
            justify-content: center;
            text-align: center;
            flex-flow: column nowrap;
            color: #fff;
            text-transform: uppercase;
            transform: translateY($content-offset);
            will-change: transform;
            backface-visibility: hidden;
            @include transition($transition-speed + .5, all, cubic-bezier(0.22, 0.44, 0, 1));
        }
        &-title {
            font-size: 5vh;
            line-height: 1.4;
        }
    }

    // ------------- SET TRANSFORM VALUES ------------- //

    .background.up-scroll {
        transform: translate3d(0, -$parallax-offset / 2, 0);
        .content-wrapper {
            transform: translateY($parallax-offset / 2);
        }
        + .background {
            transform: translate3d(0, $parallax-offset, 0);
            .content-wrapper {
                transform: translateY($parallax-offset);
            }
        }
    }

    .background.down-scroll {
        transform: translate3d(0, -(100vh + $parallax-offset), 0);
        .content-wrapper {
            transform: translateY($content-offset);
        }
        + .background:not(.down-scroll) {
            transform: translate3d(0, -$parallax-offset / 2, 0);
            .content-wrapper {
                transform: translateY($parallax-offset / 2);
            }
        }
    }


</style>
