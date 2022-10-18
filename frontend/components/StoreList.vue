<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue';


type StoreType = {
    name: string,
    postcode: string,
    phone: number
};

export default defineComponent({
    props: {
        stores: Object as PropType<StoreType[]>
    },
    data() {
        return {
        }
    }
})
</script>

<template>
    <div class="storeList">
        <StoreTile v-for="store in stores" :key="store.name" :store="store" />
    </div>
</template>

<style scoped src="../assets/css/storeTile.css">

</style>