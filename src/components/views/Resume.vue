<template>
    <v-app id="app" standalone>

        <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
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
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>

                    <v-select
                            label="Select A Theme"
                            v-bind:items="colors"
                            v-model="themeColor"
                            class="theme-select"
                            item-text="color"
                            item-value="color"
                            max-height="auto"
                    >
                        <template slot="item" scope="data">
                            <template>
                                <v-list-tile-content>
                                    <v-btn fab
                                           class="dropdown-fob"
                                           v-bind:style="{'background-color': data.item.hexValue}">
                                    </v-btn>
                                </v-list-tile-content>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="data.item.color"></v-list-tile-title>
                                </v-list-tile-content>
                            </template>
                        </template>
                    </v-select>

                </v-list-tile>

            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed :class="[themeColor, 'darken-4']" dark>
            <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>Joseph Sangiorgio</v-toolbar-title>
        </v-toolbar>
        <main>
            <v-container fluid>
                <!--v-router-->

                <template>
                    <v-expansion-panel>
                        <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
                            <div slot="header">Item</div>
                            <v-card>
                                <v-card-text :class="[themeColor, 'lighten-2']">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </template>


            </v-container>
            <template>
                <v-footer class="pa-3">
                    <v-spacer></v-spacer>
                    <div>Joe Sangiorgio © {{ new Date().getFullYear() }}</div>
                </v-footer>
            </template>

        </main>
    </v-app>
</template>

<script>

    import {forEach, map, toArray} from 'lodash'

    export default {
        data() {

            return {
                drawer: false,
                items: [
                    {title: 'Home', icon: 'dashboard'},
                    {title: 'About', icon: 'question_answer'},
                    {title: 'Test', icon: 'question_answer'},
                    {title: 'Joe', icon: 'question_answer'}
                ],
                mini: false,
                right: null,
                themeColor: 'green',

            }
        },
        //        render(){
        //            console.log('rendering')
        //        },
        //        mounted(){
        //            console.log('mounted')
        //        },
        computed: {
            colors() {
                return this.getSassConfig('colors')
            },


            //            colors: ()=>{
            //                const colorObj = {
            //                    red: '#F44336',
            //                    pink: '#e91e63',
            //                    purple: '#9c27b0',
            //                    indigo: '#3f51b5',
            //                    blue: '#2196F3',
            //                    cyan: '#00bcd4',
            //                    teal: '#009688',
            //                    green: '#4CAF50',
            //                    light: '#8bc34a',
            //                    lime: '#cddc39',
            //                    yellow: '#ffeb3b',
            //                    amber: '#ffc107',
            //                    orange: '#ff9800',
            //                    deep: '#ff5722',
            //                    brown: '#795548',
            //                    grey: '#9e9e9e',
            //                    black: '#000000',
            //                };
            //                let a = map(colorObj, (e,i)=> {return {color: i, hexCode: e}})
            //                console.log(a)
            //                return a
            //            }
        }

    }
</script>


<style lang="scss">


    .theme-select {
        margin-top: 60px !important;
    }

    .dropdown-fob {
        width: 36px;
    }


</style>
