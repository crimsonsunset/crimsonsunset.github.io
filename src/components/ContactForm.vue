<template>
    <v-layout row justify-center>
        <v-dialog v-model="isOpen" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Contact Form</span>
                </v-card-title>
                <v-card-text>

                    <!--<v-text-field-->
                            <!--autofocus-->
                            <!--name="email"-->
                            <!--key="email"-->
                            <!--id="email"-->
                            <!--:rules="emailRules"-->
                            <!--label="Email Address" required>-->
                    <!--</v-text-field>-->




                    <v-text-field
                            name="phone"
                            label="Phone Number"></v-text-field>
                    <v-text-field label="Subject" required></v-text-field>
                    <v-text-field label="Body" required></v-text-field>

                    <v-text-field
                            autofocus
                            label="E-mail"
                            v-model="email"
                            :rules="[rules.email]"
                    ></v-text-field>

                    <v-select
                            :items="this.contactReasons"
                            label="Reason for Contact"
                            autocomplete
                            bottom
                            required
                    ></v-select>

                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.stop="toggleForm">Close</v-btn>
                    <v-btn class="blue--text darken-1"
                           :disabled="(function(e){
                               return rules.email(email) == emailErrorText
                           }())"
                           flat @click.stop="sendForm">Send</v-btn>
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
                emailErrorText: 'Invalid e-mail.',
                contactReasons: sortBy(['Job Inquiry', 'Contract Inquiry', 'Side Project', 'After Hours Work', 'Tutoring/Teaching', 'RateThatTruck', 'Funzies!']),
                email: '',
                rules: {
                    required: (value) => !!value || 'Required.',
                    email: (value) => {
//                        console.log('zz', this.email)
                        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        const answer = pattern.test(value) || this.emailErrorText
//                        console.log('answer', answer)
                        return answer
                    }
                }
            }
        },
        methods: {
            toggleForm(){
                this.$emit('toggleForm')
            },
            sendForm(){
                console.log('send a formzz')
//                this.$emit('sendForm')
            }
        }
    }
</script>
