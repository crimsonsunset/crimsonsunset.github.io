<template>

    <v-navigation-drawer
            class="pb-0"
            persistent
            height="100%"
            clipped
            temporary
            light
            overflow

            v-model="localDrawer"
    >
        <div
                ref="animator"
                :class="['loader', `loader--${settingsObj.themeColor}`, 'animation-example', 'loader-ball']"
        >
            <!--<v-flex-->
            <!--:class="['animation-example__body', `animated infinite ${settingsObj.animation}`, `${settingsObj.themeColor}`]"-->
            <!--&gt; </v-flex>-->

            <v-icon
                    :class="['animation-example__body', `${settingsObj.themeColor}--text`, `animated ${settingsObj.animation} infinite`]"
            >{{`${getFunIcon()}`}}
            </v-icon>


        </div>

        <v-toolbar


                class="transparent">
            <v-list class="pa-0">
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>
                        <img src="https://s.gravatar.com/avatar/edebe1c8b202a4ffb065b200c8d12d57?s=80"/>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>Settings</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-list class="pt-0">
            <v-divider></v-divider>
            <v-list-tile
                    v-for="item in items"
                    :key="item.label"
                    :id="snakeCase(item.label.toLowerCase())"
                    @click="()=>{
                    	openLink(item.path, true);
                    }"
            >
                <v-list-tile-action>
                    <v-icon
                            :class="[`${settingsObj.themeColor}--text`, 'text--lighten-1']"
                    >{{ item.icon }}
                    </v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        <router-link :to="item.path">{{item.label}}</router-link>
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <v-subheader class="grey--text text--darken-1">Customize this App</v-subheader>
            <v-list class="px-3">

                <v-select
                        class="controls"
                        label="Select A Theme"
                        v-bind:items="colors"
                        @input="e => { emitEvent('updateConfigVal', {'themeColor': e}) }"
                        item-text="color"
                        item-value="color"
                        :hint="`Currently: ${settingsObj.themeColor}`"
                        single-line
                        persistent-hint
                        hide-details

                >
                    <template slot="item" slot-scope="data">
                        <template>
                            <v-list-tile-content>
                                <v-btn fab
                                       class="dropdown-btn"
                                       v-bind:style="{'background-color': data.item.hexValue}">
                                </v-btn>
                            </v-list-tile-content>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="data.item.color"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>

            </v-list>

            <v-list class="px-3">

                <v-select
                        class="controls"
                        label="Select An Animation"
                        v-bind:items="animations"
                        @input="e => {
                        	showAnimation();
                        	emitEvent('updateConfigVal', {'animation': e}); }"
                        :hint="`Currently: ${settingsObj.animation}`"

                        single-line
                        persistent-hint
                        hide-details

                >
                    <template slot="item" slot-scope="data">
                        <template>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="data.item"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-select>

            </v-list>

            <v-flex px-3 class="">
                <v-switch
                        class="controls"
                        :color="settingsObj.themeColor"
                        id='to-top'
                        label='Return To Top Button'
                        v-model="settingsObj.toTop"
                        @change="e => { emitEvent('updateConfigVal', {'toTop': e}) }"
                >

                </v-switch>
            </v-flex>

            <v-flex px-3>
                <v-switch
                        class="controls"
                        :color="settingsObj.themeColor"
                        label='Remember Settings'
                        v-model="settingsObj.rememberSettings"
                        @change="e => { emitEvent('updateConfigVal', {'rememberSettings': e}) }"
                >
                </v-switch>
            </v-flex>

            <v-flex px-3>
                <v-switch
                        class="controls"
                        :color="settingsObj.themeColor"
                        label='Remember Location'
                        v-model="settingsObj.rememberLocation"
                        @change="e => { emitEvent('updateConfigVal', {'rememberLocation': e}) }"
                >
                </v-switch>
            </v-flex>

            <v-flex px-3>
                <v-switch
                        class="controls"
                        :color="settingsObj.themeColor"
                        label='Show Info Button'
                        v-model="settingsObj.infoBtn"
                        @change="e => { emitEvent('updateConfigVal', {'infoBtn': e}) }"
                >
                </v-switch>
            </v-flex>

            <v-flex
                    class="tour-container"
            >
                <v-btn
                        :class="[settingsObj.themeColor, 'darken-2', 'white--text']"
                        @click="e => { emitEvent('startTour', true) }"
                > Start the Tour!
                </v-btn>
            </v-flex>


        </v-list>
    </v-navigation-drawer>

</template>

<script>

	import {forEach, map, toArray, delay, snakeCase} from 'lodash'
	import RouterLink from 'vue-router'
	import routes from '../config/routes'
	//
	//    console.log('items')
	//    console.log(routes)

	export default {
		props: ['drawer', 'colors', 'animations', 'settingsObj'],
		data() {
			return {
				items: routes,
				snakeCase
			}
		},
		methods: {
			showAnimation(e) {
				this.$refs.animator.classList.add('is-active');
				delay(() => {
					this.$refs.animator.classList.remove('is-active');
				}, 3000)
			},
		},
		computed: {
			localDrawer: {
				get() {
					return this.drawer;
				},
				set(inVal) {
					this.$emit('toggleDrawer', inVal);
				}
			}
		}
	}
</script>


<style lang="scss">

    .theme-select {
        margin-top: 60px !important;
    }

    .dropdown-btn {
        width: 36px;
    }

    .controls {
        margin-top: -10px !important;
    }

    .navigation-drawer {
        margin-top: 57px !important;
    }

    .tour-container {
        justify-content: center;
        display: flex !important;
        padding-right: 20px;
    }

    .animation-example {
        display: flex;
        align-items: center;
        width: 300px !important;
        &:after {
            content: none;
        }
        &:after, &:before {
            content: none;
            /*animation: none ;*/
            animation-name: flipInX;
            -webkit-animation-name: flipInX;
            animation-iteration-count: infinite;
        }
        &__body {
            margin: 0 auto;
            margin-top: -50px;
            font-size: 80px !important;
        }
    }


</style>
