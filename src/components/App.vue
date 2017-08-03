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
                            label="Choose a theme"
                            v-bind:items="colors"
                            v-model="themeColor"
                            item-text="color"
                            item-value="color"
                            max-height="auto"
                            autocomplete
                            class="theme-select">

                        <template v-for="colorItem in colors" >
                            <v-list-tile-content >test</v-list-tile-content>
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
            </v-container>
        </main>
    </v-app>
</template>

<script>

        import {forEach,map} from 'lodash'

    export default {
        data() {
            //            console.log('sss', this)
            //            console.log(colorTest)
            return {
                drawer: true,
                items: [
                    {title: 'Home', icon: 'dashboard'},
                    {title: 'About', icon: 'question_answer'},
                    {title: 'Test', icon: 'question_answer'},
                    {title: 'Joe', icon: 'question_answer'}
                ],
                mini: false,
                right: null,
                themeColor: 'pink',
                colors: [
                    'red',
                    'pink',
                    'purple',
                    'indigo',
                    'blue',
                    'cyan',
                    'teal',
                    'green',
                    'light',
                    'lime',
                    'yellow',
                    'amber',
                    'orange',
                    'deep',
                    'brown',
                    'grey',
                    'black',
                ]

            }
        },
        computed: {
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

</style>
