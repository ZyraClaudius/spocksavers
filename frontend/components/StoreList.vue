<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { Store } from './App.vue';
import StoreTile from './StoreTile.vue';

export default defineComponent({
    props: {
        stores: { type: Array as PropType<Store[]>, required: true }
    },
    data() {
        return {};
    },
    components: { StoreTile }
})
</script>

<template>
    <div class="storeListContainer">
        <div v-if="stores.length > 0" class="storeList">
            <StoreTile v-for="store of $props.stores" :store="store" :key="store.id" />
            <!-- <p>{{ $props.stores }}</p> -->
        </div>
        <p v-else>Sorry, no results</p>
    </div>
</template>

<style scoped src="../assets/css/storeList.css">
</style>