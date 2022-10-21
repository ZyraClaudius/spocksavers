<script lang="ts">
import { defineComponent } from 'vue';
import Header from './Header.vue';
import type { Store } from './App.vue';
import type { PropType } from 'vue';

export default defineComponent({
    props: {
        loc: { type: Object as PropType<Store>, required: true },
        goHome: {type: Function as PropType<()=>void>, required:true},
    },

    data() {
        return {
            bookedID: "",
            userName: "",
            userEmail: "",
            dateTime: "",
        };
    },

    methods: {
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

})

</script>

<template>
    <div v-if="bookedID">
        <p>Your booking is confirmed</p>
        <p>Your booking ID is {{ bookedID }}</p>
        <p>Please make a note of this for future reference</p>
        <p>Click below or refresh the page to return to home</p>
        <button @click="$props.goHome">Home</button>
    </div>
    <div v-else>
        <Header />
        <p>Please complete the below to confirm your booking at {{ $props.loc.storeName }}</p>
        <label for="name">Your Name</label>
        <input v-model="userName" type="text" id="name" />
        <label for="email">Your Email</label>
        <input v-model="userEmail" type="datetime" id="email" />
        <label for="time">Date & Time. Please use format YYYY-MM-DD HH:MM:SS</label>
        <input v-model="dateTime" type="datetime" id="time" />
        <p>{{ dateTime }}</p>
        <button @click="confirmBooking">Confirm Booking</button>
    </div>
</template>

<style src="../assets/css/reset.css">

</style>

<style scoped src="../assets/css/app.css">

</style>
