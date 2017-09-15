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
        <v-toolbar class="transparent">
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
            <v-list-tile v-for="item in items" :key="item.label">
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
                        max-height="400"
                >
                    <template slot="item" scope="data">
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
                        @input="e => { emitEvent('updateConfigVal', {'animation': e}) }"
                        item-text="color"
                        item-value="color"
                        max-height="400"
                >
                    <template slot="item" scope="data">
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
                        label='Return To Top Button'
                        v-model="settingsObj.toTop"
                        @change="e => { emitEvent('updateConfigVal', {'toTop': e}) }"
                >

                </v-switch>
            </v-flex>

            <v-flex px-3 >
                <v-switch
                        class="controls"
                        :color="settingsObj.themeColor"
                        label='Remember Settings'
                        v-model="settingsObj.rememberSettings"
                        @change="e => { emitEvent('updateConfigVal', {'rememberSettings': e}) }"
                >
                </v-switch>
            </v-flex>

            <v-flex px-3 >
                <v-switch
                        class="controls"
                        :color="settingsObj.themeColor"
                        label='Remember Location'
                        v-model="settingsObj.rememberLocation"
                        @change="e => { emitEvent('updateConfigVal', {'rememberLocation': e}) }"
                >
                </v-switch>
            </v-flex>


        </v-list>
    </v-navigation-drawer>

</template>

<script>

	import {forEach, map, toArray} from 'lodash'
	import RouterLink from 'vue-router'
	import routes from '../config/routes'
	//
	//    console.log('items')
	//    console.log(routes)

	export default {
		props: ['drawer', 'colors', 'animations', 'settingsObj'],
		data() {
			return {
				items: routes
			}
		},
		created: function () {
			// `this` points to the vm instance
			//            console.log('thiz create ',this)
		},
		methods: {
			settingsChange(e){
				console.log('emizz', e)
            }
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
        margin-top: -25px !important;
    }

    .navigation-drawer {
        margin-top: 57px !important;
    }


    /*.application--light .switch:not(.input-group--dirty) .input-group--selection-controls__container{*/
        /*color: red !important;*/
    /*}*/


</style>
