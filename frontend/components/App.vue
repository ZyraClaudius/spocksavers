<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from './SearchBar.vue';
import StoreList from './StoreList.vue';
import Header from './Header.vue';
import Book from './Book.vue';

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
    selectedStore: Store | undefined
};

export default defineComponent({
    components: { SearchBar, StoreList, Header, Book },

    data(): DataType {
        return {
            stores: [],
            storesDisplay: [],
            hasSearched: false,
            selectedStore: undefined
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
        },

        callbackSelectStore(store: Store) {
            return () => {
                this.selectedStore = store;
            };
        },

        goHome() {
            this.selectedStore = undefined;
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

    <Book v-if="selectedStore" :loc="selectedStore" :goHome="goHome"/>

    <div v-else>
        <Header />
        <div v-if="storesLoaded" class="loadedContent">
            <div>
                <SearchBar :callback="updateStoresDisplay" :stores="stores" />
                <div v-if="hasSearched">
                    <StoreList :stores="storesDisplay" :callbackSelectStore="callbackSelectStore" />
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
