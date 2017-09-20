<template>
    <v-layout row justify-center>

        <a
                ref="mailLink"
                hidden
                target="_blank" href="mailto:joe@joesangiorgio.com?"></a>

        <v-dialog v-model="isOpen" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Contact Form</span>
                </v-card-title>
                <v-card-text>


                    <v-text-field
                            autofocus
                            label="Name"
                            :rules="[rules.required]"
                            v-model="contactInfo.name"
                    ></v-text-field>
                    <v-text-field
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
                            label="Body [leave blank for templated]"
                            v-model.trim="contactInfo.body"
                    ></v-text-field>

                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.stop="()=>emitEvent('toggleForm')">Close</v-btn>
                    <v-btn class="blue--text darken-1"
                           :disabled="(!isFormValid())"
                           flat @click.stop="sendForm()">Send (In a New Tab)
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>

	import {sortBy, every, values, omit} from 'lodash'

	export default {
		props: ['isOpen'],
		data() {
			return {
				contactInfo: {
					email: '',
					contactReasons: '',
					subject: '',
					body: '',
					name: '',
				},
				emailErrorText: 'Invalid e-mail.',
				optionalFields: ['phone', 'body'],
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
				return validEmail && validFields;
				//				return true;
			},
			sendForm() {
				let {body, email, contactReasons, subject, phone, name} = this.contactInfo;

				const bodyTemplate =
					`Hello, Joe! My name is ${name} [${email}] and I am interested in reaching out to you.
				Specifically, I would like to ask about ${contactReasons.join(',')}.
				${(phone)? 'You can reach me at: ' + phone: ''}
				I look forward to hearing from you soon.

				Regards,
				-${name}`;

				body = (body) ? body : bodyTemplate;

				const fullStr = `&body=${encodeURIComponent(body)}&subject=${subject}`;

				let {mailLink} = this.$refs;
				mailLink.href += fullStr;
				mailLink.click();
				mailLink.href = 'mailto:joe@joesangiorgio.com?';
			}
		}
	}
</script>
