<template>
    <!--<h2> Resume</h2>-->

    <section>

        <v-container fluid class="mt-5 resume-view">

            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card>
                        <!--<v-card-media-->
                                <!--src="/static/doc-images/cards/sunshine.jpg"-->
                                <!--height="200px"-->
                        <!--&gt;-->
                        <!--</v-card-media>-->
                        <v-card-title primary-title>
                            <div>
                                <div class="headline">Top western road trips</div>
                                <span class="grey--text">1,000 miles of wonder</span>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat>Share</v-btn>
                            <v-btn flat class="purple--text">Explore</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click.native="show = !show">
                                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-slide-y-transition>
                            <v-card-text v-show="show">
                                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                            </v-card-text>
                        </v-slide-y-transition>


                    </v-card>
                </v-flex>
            </v-layout>


            <v-layout row wrap>

            </v-layout>


        </v-container>

        <v-flex
                fixed
                bottom
                row xs12 class="resume-view__nav">


            <v-card class="resume-view__nav">
                <v-bottom-nav absolute value="true" class="transparent">


                    <v-btn
                            v-for="(item,i) in navItems"
                            flat light
                            :class="[`${themeColor}--text`, 'text--lighten-2']"
                            :key="item.name"
                            :id="`${item.name}`"
                            @click.native="(e)=>{toggleResumeNavItem(e.target.parentElement.id)}"
                            :value="currNavItem === item.name"
                    >
                        <span>{{item.name}}</span>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-btn>

                    <!--<v-btn flat light-->
                           <!--:class="[`${themeColor}&#45;&#45;text`, 'text&#45;&#45;lighten-2']"-->
                           <!--@click.native="e1 = 2" :value="e1 === 2">-->
                        <!--<span>Projects</span>-->
                        <!--<v-icon>build</v-icon>-->
                    <!--</v-btn>-->

                    <!--<v-btn flat light-->
                           <!--:class="[`${themeColor}&#45;&#45;text`, 'text&#45;&#45;lighten-2']"-->
                           <!--@click.native="e1 = 3" :value="e1 === 3">-->
                        <!--<span>References</span>-->
                        <!--<v-icon>group</v-icon>-->
                    <!--</v-btn>-->

                    <!--<v-btn flat light-->
                           <!--:class="[`${themeColor}&#45;&#45;text`, 'text&#45;&#45;lighten-2']"-->
                           <!--@click.native="e1 = 3" :value="e1 === 3">-->
                        <!--<span>References</span>-->
                        <!--<v-icon>group</v-icon>-->
                    <!--</v-btn>-->


                </v-bottom-nav>
            </v-card>
        </v-flex>

    </section>


</template>

<script>

	import axios from 'axios'
	import {profileData} from '../../config/joeInfo.json'

	export default {
		props: ['themeColor', 'toTop'],
		mounted() {
			this.profileData = profileData;



		},
		data() {
			return {
				navItems: [
					{
						name: 'Experience',
						icon: 'laptop_mac',
                    },
					{
						name: 'Projects',
						icon: 'build',
                    },
					{
						name: 'Skills',
						icon: 'check_box',
					},
					{
						name: 'References',
						icon: 'group',
                    },
					{
						name: 'Education',
						icon: 'school',
                    },
				],
				show: false,
				currNavItem: 'Experience',
			}
		},
		computed: {},
		methods: {
			toggleResumeNavItem(itemName){
				this.currNavItem = itemName;
            }
        }

	}

</script>

<style lang="scss">

    $resumeHeight: 88vh !important;
    $bw: 2px;

    .border {
        border: $bw solid green;
    }

    .resume-view {
        //border: $bw solid red;
        //min-height: $resumeHeight;

        &__nav {
            margin-top: -3vh;
            //border: $bw solid red;
        }

    }

    .resume-nav {

        color: black
    }


</style>
