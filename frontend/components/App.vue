<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue';
import StoreList from './StoreList.vue';
import Header from './Header.vue';

export type Store = {
    "id": string;
    "storeName": string;
    "postcode": string;
    "phoneNumber": string;
}

export type SearchFunction = (stores: Store[]) => Store[];

type DataType = {
    stores: Store[],
    storesDisplay: Store[]
    hasSearched: boolean
};

export default defineComponent({
    components: { SearchBar, StoreList, Header },

    data(): DataType {
        return {
            stores: [],
            storesDisplay: [],
            hasSearched: false,
        };
    },

    computed: {
        storesLoaded(): boolean {
            return this.stores.length > 0;
        }
    },

    methods: {
        updateStoresDisplay(stores: Store[]) {
            this.storesDisplay = stores;
            this.hasSearched = true;
        }
    },

    async fetch(): Promise<any> {
      this.stores = await fetch(
        'https://getstoredata.azurewebsites.net/api/keyreturn'
      ).then(res => res.json())
    }

})

</script>

<template>
    <div>
        <Header />
        <div v-if="storesLoaded" class="loadedContent">
            <div>
                <SearchBar :callback="updateStoresDisplay" :stores="stores" />
                <div v-if="hasSearched">
                    <StoreList :stores="storesDisplay" />
                </div>
                <p v-else>Please type in the search bar to view results</p>
            </div>
            <!-- <p>{{ storesDisplay }}</p> -->
        </div>
        <p v-else>Please wait while we load our store data</p>
    </div>
</template>

<style src="../assets/css/reset.css">

</style>

<style scoped src="../assets/css/app.css">

</style>
