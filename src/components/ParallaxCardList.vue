<template>

  <transition
      name="custom-classes-transition"
      :enter-active-class="`animated ${settingsObj.animation}`"
  >

    <div class="container">

      <section
          v-for="(item,i) in this[endpoint]"
          :key="i"
          :data-key="`${i}`"
          :ref="`bkg-${i}`"
          :class="['background',`${settingsObj.themeColor}`, 'lighten-1', `white--text`, 'mb-1']"
      >

        <v-container
        >

          <v-layout row wrap class="content-wrapper">


            <v-flex

                xs12 md8 lg6 mt-5>

              <v-flex
                  grid-list-md
                  class="content-inner">

                <v-layout row wrap>
                  <v-flex md2 mt-2 pl-2>
                    <v-avatar
                        :tile="false"
                        size="100px"
                        class="elevation-15"
                        @click="(e)=>{nextImg(i)}"
                    >
                      <img :src="item.img" alt="avatar">
                    </v-avatar>

                  </v-flex>

                  <v-flex md10
                          class="content-title">
                    {{ item.name }}
                  </v-flex>


                </v-layout>

                <v-flex xs12>
                  <v-list class="content-inner__list">

                    <v-list-tile>

                      <!--<v-list-tile-action>-->
                      <!--<v-icon class="indigo&#45;&#45;text">phone</v-icon>-->
                      <!--</v-list-tile-action>-->


                      <v-list-tile-content>
                        <v-list-tile-title v-html="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title class="white--text">{{ item.date }}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>


                    <v-list-tile
                        v-for="(activity,j) in item.descArr"
                        :key="j"
                    >


                      <v-icon class="white--text icon">check_box</v-icon>


                      <v-list-tile-content>
                        <v-list-tile-title>{{ activity }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>


                  </v-list>

                </v-flex>


              </v-flex>

            </v-flex>
          </v-layout>

        </v-container>
      </section>

    </div>

  </transition>

</template>

<script>

import axios from 'axios'
import {map, throttle} from 'lodash'

let ticking = false;
let isFirefox = (/Firefox/i.test(navigator.userAgent));
let isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
let scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
let slideDurationSetting = 600; //Amount of time for which slide is "locked"
let currentSlideNumber = 0;
let totalSlideNumber = 2;
let delta;
let lastTouch;
const mousewheelEvent = isFirefox ? "DOMMouseScroll" : "mousewheel";

export default {
  props: ['settingsObj', 'endpoint'],
  mounted() {
    window.addEventListener(mousewheelEvent, this.parallaxScroll, false);
    window.addEventListener('touchstart', (e) => {
      lastTouch = e.changedTouches[0].clientY
    }, false);
    window.addEventListener('touchend', this.parallaxScroll, false);


    //			window.addEventListener('touchstart', (e)=>{console.log('touch is starting', e.changedTouches[0].clientY)}, false);
    //			window.addEventListener('touchend', (e)=>{console.log('touch is ending', e.changedTouches[0].clientY)}, false);
    //

    const {endpoint} = this;
    axios.get(`${this.$endpoints.info}${endpoint}`)
        .then(({data}) => {
          this[endpoint] = data;
          totalSlideNumber = data.length;
          this[endpoint] = map(this[endpoint], (e, i) => {
            return {
              ...e,
              descArr: e.description.split('•').slice(1),
              imgInd: 0
            };
          });
          //remove loader
          this.settingsObj.isLoaded = true;
          this.settingsObj.loaderRef.classList.remove('is-active');
          this.$forceUpdate();
          //					console.log(this[endpoint])
        });
    //			console.log('mounted', mousewheelEvent)
  },
  beforeDestroy() {
    window.removeEventListener(mousewheelEvent, this.parallaxScroll);
    window.removeEventListener('touchend', this.parallaxScroll);
    ticking = false;
    currentSlideNumber = 0;
    totalSlideNumber = 2;
    delta = undefined;
    lastTouch = undefined;

  },
  data() {
    return {
      education: ''
    }
  },
  computed: {},
  methods: {
    //			test(){
    //				console.log('test sszz')
    //            },

    nextImg(cardInd) {
      const {endpoint, $refs} = this;
      const currObj = this[endpoint][cardInd];
      const currBkg = $refs[`bkg-${cardInd}`][0];

      //if we're at the end of the array, reset imgInd to zero
      let nextImgInd = (currObj.imgInd == currObj.imgArr.length - 1) ? 0 : currObj.imgInd + 1;
      this[endpoint][cardInd].imgInd = nextImgInd;
      currBkg.style.backgroundImage = `url(${currObj.imgArr[nextImgInd]})`;
    },

    //parallax methods [https://codepen.io/country_runner/full/mWXMgX/]
    parallaxScroll: throttle(function (evt) {

      let isMobile;
      // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
      if (isFirefox) {
        delta = evt.detail * (-120);
      } else if (isIe) {
        delta = -evt.deltaY;
      } else if (evt.changedTouches) {
        delta = lastTouch - evt.changedTouches[0].clientY;
        lastTouch = evt.changedTouches[0].clientY;
        if (Math.sign(delta) == -1) {
          this.previousItem();
          return
        } else {
          this.nextItem();
          return
        }
      } else {
        delta = evt.wheelDelta;
      }

      if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
          this.nextItem();
        }
        if (delta >= scrollSensitivitySetting) {
          this.previousItem();
        }
      }


    }, 60),
    slideDurationTimeout(slideDuration) {
      // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
      setTimeout(function () {
        ticking = false;
      }, slideDuration);
    },
    nextItem() {
      //				console.log('next item')
      // ------------- SLIDE MOTION ------------- //

      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;

      }

      let previousSlide = document.querySelectorAll(".background")[currentSlideNumber - 1];

      if (previousSlide) {
        previousSlide.classList.remove('up-scroll');
        previousSlide.classList.add("down-scroll");
      }
      this.slideDurationTimeout(slideDurationSetting);
    },
    previousItem() {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }

      let currentSlide = document.querySelectorAll(".background")[currentSlideNumber];
      if (currentSlide) {
        currentSlide.classList.remove('down-scroll');
        currentSlide.classList.add("up-scroll");
      }

      this.slideDurationTimeout(slideDurationSetting);

    }

  },
}

</script>

<style lang="scss">
@use "sass:math";

.resume-view .container {
  padding: 0px;
  max-width: 100%;
  //margin-top: -16px;
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

/*html, body {*/
/*overflow: hidden;*/
/*}*/

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

    background-image: url(/assets/locations/binghamton.jpg);
    transform: translateY(math.div(-$parallax-offset, 2));

    .content-wrapper {
      transform: translateY(math.div($parallax-offset, 2));
    }
  }

  &:nth-child(2) {
    background-image: url(/assets/locations/si-tech.jpg);
  }

  &:nth-child(3) {
    /*background-image: url("https://i.redd.it/4vqygabli4mx.jpg");*/
  }

  .avatar {
    cursor: pointer;
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
    font-family: Roboto;
    height: 100vh;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-flow: column nowrap;
    color: white;
    transform: translateY($content-offset);
    will-change: transform;
    backface-visibility: hidden;
    @include transition($transition-speed + .5, all, cubic-bezier(0.22, 0.44, 0, 1));
  }

  &-box {

    /*border: 2px solid blue;*/
    flex-direction: column;
    justify-content: center;
    display: flex;
  }

  &-inner {
    margin-top: 25vh;
    background-color: rgba(0, 0, 0, .3);
    /*border: 2px solid red;*/
    flex: 0 0 auto;

    &__list {
      background-color: transparent !important;

      .icon {
        width: 40px;
      }

      .list__tile__content {
        color: white !important;
      }
    }
  }

  &-title {
    font-size: 5vh;
    line-height: 1.4;
  }
}



// ------------- SET TRANSFORM VALUES ------------- //

.background.up-scroll {
  transform: translate3d(0, math.div(-$parallax-offset, 2), 0);

  .content-wrapper {
    transform: translateY(math.div($parallax-offset, 2));
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
    transform: translate3d(0, math.div(-$parallax-offset, 2), 0);

    .content-wrapper {
      transform: translateY(math.div($parallax-offset, 2));
    }
  }
}


</style>
