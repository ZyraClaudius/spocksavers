<template>
    <div class="storeTile">
        <p class="storeName">{{ store.storeName }}</p>
        <div class="storeInfo">
            <p>{{ store.postcode }}</p>
            <p>{{ store.phoneNumber }}</p>
            <LinkComponent :selectStore="selectStore"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Store } from './App.vue';
import LinkComponent from './LinkComponent.vue';

export default defineComponent({
    props: {
        store: { type: Object as PropType<Store>, required: true },
        selectStore: {type: Function as PropType<()=>void>, required: true}
    },
    data() {
        return {
        }
    },
    components: { LinkComponent }
})
</script>

<style scoped src="../assets/css/storeTile.css">

</style>