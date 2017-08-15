<template>
    <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
    >

        <contact-form
                :isOpen="openForm"
                v-on:toggleForm="toggleForm"
        >

        </contact-form>

        <v-layout row wrap>
            <v-flex xs6  offset-xs3>
                <v-card
                        :class="[themeColor, 'lighten-1', 'white--text', 'elevation-8']"
                >
                    <v-card-title primary-title>
                        <div class="headline">Thank you for Visiting</div>
                    </v-card-title>
                    <v-card-text>
                        <div class="contact--subheadline">
                            Want to get in touch? Just click below to send me a message. I'll get back to you as soon as possible.
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn flat dark ripple
                               @click="toggleForm"
                        >Contact Me
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>


    </v-container>

</template>

<script>

    import ContactForm from '../ContactForm.vue'

    export default {
        components: {ContactForm},
        props: ['themeColor'],
        data() {
            return {
                openForm: false
            }
        },
        methods: {
            toggleForm() {
                this.openForm = !this.openForm;
            }
        },

    }
</script>

<style lang="scss">
    .contact {
        &--subheadline {
            margin-top: 10px;
        }
    }
</style>
