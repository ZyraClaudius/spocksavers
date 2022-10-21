<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
import type { Store } from './App.vue';
import type { PropType } from 'vue';
import { validate } from '@babel/types';
type DataType = {
            bookedID: string
            userName: string,
            userEmail: string,
            dateTime: string,
            formErrors: string[]
        }

import LinkComponent from '../components/LinkComponent.vue';


export default defineComponent({
    props: {
        loc: { type: Object as PropType<Store>, required: true },
        goHome: { type: Function as PropType<() => void>, required: true },
    },

    data():DataType {
        return {
            bookedID: "",
            userName: "",
            userEmail: "",
            dateTime: "",
            formErrors: []
        };
    },

    methods: {

        validateBooking() {
            this.formErrors = [];
            if(this.userName=="") {
                this.formErrors.push("Please fill in name");
            }
            
            if(this.userName.length > 256) {
                this.formErrors.push("Name cannot be more than 256 characters");
            }

            if(this.userEmail=="") {
                this.formErrors.push("Please fill in email");

            }

            if(this.userEmail.length>256) {
                this.formErrors.push("Email cannot be more than 256 characters");
            }

            if(!this.dateTime.match(/^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/)) {
                this.formErrors.push("Please enter a date and time in the accepted format");
            }

            if(this.formErrors.length==0) {
                this.confirmBooking();
            }
        },

        async confirmBooking() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "customerName": this.userName,
                "customerEmail": this.userEmail,
                "dateAndTime": this.dateTime,
                "storeId": this.$props.loc.id
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
            };

            let response = await fetch("https://postbooking.azurewebsites.net/api/HttpTrigger1", requestOptions);
            let id = await response.text()
            this.bookedID = id;
        }
    },

    components: {LinkComponent}

})

</script>

<template>
    <div>
        <Header />
        <div v-if="bookedID" class="booking">
            <p>Your booking is confirmed</p>
            <p>Your booking ID is {{ bookedID }}</p>
            <p>Please make a note of this for future reference</p>
            <p>Click below or refresh the page to return to home</p>
            <LinkComponent :select-store="goHome" label="Home"/>
        </div>
        <div v-else class="booking">
            <p>Please complete the below to confirm your booking at {{ $props.loc.storeName }}</p>
        <label for="name">Your Name</label>
        <input v-model="userName" type="text" id="name" />
        <label for="email">Your Email</label>
        <input v-model="userEmail" type="datetime" id="email" />
        <label for="time">Date & Time. Please use format YYYY-MM-DD HH:MM:SS</label>
        <input v-model="dateTime" type="datetime" id="time" />
        <p v-for="error of formErrors" class="errorMessage">{{ error }}</p>
        <LinkComponent :select-store="validateBooking" label="Confirm Booking" />
        </div>
    </div>
</template>

<style scoped src="../assets/css/book.css">

</style>
