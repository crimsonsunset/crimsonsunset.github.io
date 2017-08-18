<template>
    <v-layout row justify-center>
        <v-dialog v-model="isOpen" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Contact Form</span>
                </v-card-title>
                <v-card-text>


                    <v-text-field
                            autofocus
                            label="E-mail"
                            v-model="contactInfo.email"
                            :rules="[rules.email]"
                    ></v-text-field>

                    <v-text-field
                            name="phone"
                            type="number"
                            v-model="contactInfo.phone"
                            label="Phone Number">
                    </v-text-field>

                    <v-select
                            :items="this.contactReasons"
                            v-model="contactInfo.contactReasons"
                            label="Reason for Contact"
                            autocomplete
                            multiple
                            bottom
                    ></v-select>

                    <v-text-field
                            label="Subject"
                            required
                            :rules="[rules.required]"
                            v-model.trim="contactInfo.subject"
                    ></v-text-field>

                    <v-text-field
                            label="Body"
                            required
                            :rules="[rules.required]"
                            v-model.trim="contactInfo.body"
                    ></v-text-field>

                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.stop="()=>emitEvent('toggleForm')">Close</v-btn>
                    <v-btn class="blue--text darken-1"
                           :disabled="(!isFormValid())"
                           flat @click.stop="sendForm()">Send
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>

	import {sortBy, every, values, omit} from 'lodash'
	import axios from 'axios';

	axios.defaults.headers.common['Authorization'] = 'a591d32795940eb0fb84c81c28490aac8c8215bd'

	export default {
		props: ['isOpen'],
		data() {
			return {
				contactInfo: {
					email: '',
					contactReasons: '',
					subject: '',
					body: '',
				},
				emailErrorText: 'Invalid e-mail.',
				optionalFields: ['phone'],
				contactReasons: sortBy(['Job Inquiry', 'Contract Inquiry', 'Side Project', 'After Hours Work', 'Tutoring/Teaching', 'RateThatTruck', 'Funzies!']),
				rules: {
					required: (value) => {
						return value != ''
					},
					email: (value) => {
						const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						const answer = pattern.test(value) || this.emailErrorText
						return answer
					}
				}
			}
		},
		methods: {
			isFormValid() {
				const {rules, contactInfo, emailErrorText, optionalFields} = this;
				const validEmail = (rules.email(contactInfo.email) != emailErrorText);

				//remove optionalFields, then check that every key has a value
				const validFields = every(values(omit(contactInfo, optionalFields)), (e) => e != '');
				//                return validEmail && validFields;
				return true;
			},
			sendForm() {
				const {body, email, contactReasons, subject} = this.contactInfo;


				const data = {
					"options": {
						"sandbox": true
					},
					recipients: [{"address": "jsangio1@gmail.com"}],
					content: {
						"from": "sandbox@sparkpostbox.com",
						subject,
						"text": body
					}
				}

				const headers = {
					"Access-Control-Allow-Credentials": true,
//					"Access-Control-Max-Age": 1728000,
					"Authorization": "a591d32795940eb0fb84c81c28490aac8c8215bd",
					"Content-Type": "application/json",
					"cache-control": "no-cache",
				};


				console.log(headers)
//				var instance = axios.create({
//					headers
//				});


				axios.get('https://api.sparkpost.com/api/v1/transmissions', {
					headers
				});


//				instance({
//					method: 'post',
//					url: 'https://api.sparkpost.com/api/v1/transmissions',
//					data,
//					//                    data2:{
//					//                        "options": {
//					//                            "sandbox": true
//					//                        },
//					//                        "content": {
//					//                            "from": "sandbox@sparkpostbox.com",
//					//                            "subject": "Thundercats arsdfdse GO!!!",
//					//                            "text": "Sword of Omens, give me dfdfdfsight BEYOND sight"
//					//                        },
//					//                        "recipients": [{ "address": "jsangio1@gmail.com" }]
//					//                    }
//					//                    headers: {
//					////                        "Access-Control-Allow-Credentials": true,
//					////                        "Access-Control-Max-Age": 1728000,
//					////                        "Authorization": "a591d32795940eb0fb84c81c28490aac8c8215bd",
//					////                        "Content-Type": "application/json",
//					////                        "cache-control": "no-cache",
//					//                    }
//				})
//					.then((response) => {
//						const values = response.data.data;
//						context.values = values;
//						dispatch(notification('', true))
//						dispatch(actions.valuesLoaded(objectType, response.data.data));
//						context.forceUpdate();
//					})
//					.catch((error) => {
//						context.values = [];
//						context.forceUpdate();
//						return errorHappened(error, objectType, dispatch, actions);
//					});
			}
		}
	}
</script>
