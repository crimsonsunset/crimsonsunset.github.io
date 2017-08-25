<template>
    <!--<h2> Resume</h2>-->

    <section>



        <v-container fluid class="mt-5 resume-view">

            <card-list
                    v-if="(currNavItem == 'Experience' || currNavItem == 'Projects') "
                    :profileData='this.profileData'
                    :themeColor='themeColor'
                    :animation='animation'
                    :name="currNavItem.toLowerCase()"
            >

            </card-list>


            <lazy-grid

            :nameArr='this.profileData.skills.slice(0, 10)'
                    v-if="(currNavItem == 'Skills') "
            >

            </lazy-grid>

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

                </v-bottom-nav>
            </v-card>
        </v-flex>

    </section>

</template>

<script>

	import axios from 'axios'
	import {profileData} from '../../config/joeInfo.json'
	import CardList from '../CardList.vue';
	import LazyGrid from '../LazyGrid.vue';

	export default {
		props: ['themeColor', 'animation'],
		components: {CardList, LazyGrid},
		mounted() {
			const splitNameArr = ['experience', 'projects'];

			splitNameArr.forEach((e, i) => {
				let currExp = profileData[e];
				currExp.map((e2, i2) => {

					const splitDescription = (description) => {
						let descArr = description.split('•').slice(1)
						//					descArr = descArr.map((e) => `•${e}`).slice(1);
						return descArr
					};

					e2.descArr = splitDescription(e2.description);
					e2.key = (e == 'experience') ? 'company' : 'title'
					return e2;
				});
//				profileData[currExp] = currExp;
				this.profileData = profileData;
			});
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
				currNavItem: 'Skills',
			}
		},
		computed: {},
		methods: {
			toggleResumeNavItem(itemName) {
				this.currNavItem = itemName;
			},
//			test(itemName) {
//				GoogleImageSearch.searchImage('javascript').then((e) => {
//					console.log('d', e)
//				})
//			}
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
