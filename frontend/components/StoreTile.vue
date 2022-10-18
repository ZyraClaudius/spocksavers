<script>
import { stringLiteral } from '@babel/types';

export default {
    props: {
        store: {
            name: String,
            postcode: String,
            phone: Number,
        }
    },
    data() {
        return {
        }
    }
}
</script>

<template>
    <div class="storeTile">
        <p class="storeName">{{ store.name }}</p>
        <div class="storeInfo">
            <p>{{ store.postcode }}</p>
            <p>{{ store.phone }}</p>
        </div>
    </div>
</template>

<style scoped src="../assets/css/storeTile.css">

</style>