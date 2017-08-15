<template>
    <v-layout row justify-center>
        <v-dialog v-model="isOpen" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Contact Form</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Email" required></v-text-field>
                    <v-text-field label="Subject" required></v-text-field>
                    <v-text-field label="Body" required></v-text-field>

                    <v-select
                            :items="this.contactReasons"
                            label="Reason for Contact"
                            single-line
                            autocomplete
                            bottom
                            required
                    ></v-select>

                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.stop="toggleForm">Close</v-btn>
                    <v-btn class="blue--text darken-1" flat @click.stop="toggleForm">Send</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>

    import {sortBy} from 'lodash'

    export default {
        props: ['isOpen'],
        data() {
            return {
                contactReasons: sortBy(['Job Inquiry', 'Contract Inquiry', 'Side Project', 'After Hours Work', 'Tutoring/Teaching', 'RateThatTruck', 'Funzies!'])
            }
        },
        methods: {
            toggleForm(){
                this.$emit('toggleForm')
            }
        }
    }
</script>
