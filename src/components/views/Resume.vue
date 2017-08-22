<template>
    <!--<h2> Resume</h2>-->

    <section>

        <v-container fluid class="mt-5 resume-view">

            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card
                            v-for="(item,i) in profileData.experience"
                            flat light
                            :class="['mb-3',`${themeColor}--text`, `${themeColor} lighten-4`, 'text--darken-3', 'elevation-2']"
                            :key="item.company"
                            :value="currNavItem === item.name"
                    >
                        <!--<v-card-media-->
                        <!--src="/static/doc-images/cards/sunshine.jpg"-->
                        <!--height="200px"-->
                        <!--&gt;-->
                        <!--</v-card-media>-->

                        <v-card-title primary-title>
                            <div>
                                <div class="headline">{{item.title}}</div>
                                <span
                                        class="grey--text">{{item.company}}</span>
                            </div>
                        </v-card-title>
                        <v-card-actions>

                            <v-spacer></v-spacer>
                            <v-btn
                                    icon
                                    :id="`${item.company}`"
                                    @click.native="(e)=>{
                                   	toggleResumeCard(e.target.parentElement.id);
                                   }"
                            >
                                <v-icon>{{ (expandedItem == item.company) ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
                                    }}
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-slide-y-transition>
                            <v-card-text v-show="expandedItem == item.company">

                                <ul>
                                    <li
                                            v-for="(descItem,i2) in item.descArr"
                                            flat
                                            light
                                            :class="['mb-2',`${themeColor}--text`, 'text--darken-4']"
                                            :key="descItem"
                                    >
                                        {{descItem}}
                                    </li>
                                </ul>
                            </v-card-text>
                        </v-slide-y-transition>

                    </v-card>

                </v-flex>
            </v-layout>


        </v-container>

        <v-flex
                fixed
                bottom
                row xs12 class="resume-view__nav">


            <v-card class="resume-view__nav">
                <v-bottom-nav
                        value="true" class="white">
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
			let {experience} = profileData;
			experience = experience.map((e, i) => {

				const splitDescription = (description) => {
					let descArr = description.split('•').slice(1)
//					descArr = descArr.map((e) => `•${e}`).slice(1);
					return descArr
				};

				e.descArr = splitDescription(e.description);
				return e;
			});
			profileData.experience = experience;
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
				profileData: {},
				expandedItem: '',
				currNavItem: 'Experience',
			}
		},
		computed: {},
		methods: {
			toggleResumeNavItem(itemName) {
				this.currNavItem = itemName;
			},
			toggleResumeCard(itemName) {

				if (itemName == this.expandedItem) {
					this.expandedItem = '';
				} else {
					this.expandedItem = itemName;
				}
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
