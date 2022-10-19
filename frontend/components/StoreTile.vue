<template>
    <div class="storeTile">
        <p class="storeName">{{ store.storeName }}</p>
        <div class="storeInfo">
            <p>{{ store.postcode }}</p>
            <p>{{ store.phoneNumber }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Store } from './App.vue';

export default defineComponent({
    props: {
        store: {type: Object as PropType<Store>, required: true}
    },
    data() {
        return {
        }
    }
})
</script>

<style scoped src="../assets/css/storeTile.css">

</style>