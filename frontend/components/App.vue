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
            stores: [
                {
                    id: "1",
                    storeName: "Store 1",
                    postcode: "PC 1",
                    phoneNumber: "01326016695"
                },
                {
                    id: "2",
                    storeName: "Store 2",
                    postcode: "PC 2",
                    phoneNumber: "07428016695"
                },
                {
                    id: "3",
                    storeName: "Store 3",
                    postcode: "PC 2",
                    phoneNumber: "07428016695"
                },
                {
                    id: "4",
                    storeName: "Store 4",
                    postcode: "PC 1",
                    phoneNumber: "01326016695"
                },
                {
                    id: "5",
                    storeName: "Store 5",
                    postcode: "PC 5",
                    phoneNumber: "01326016695"
                },
                {
                    id: "6",
                    storeName: "Store 6",
                    postcode: "PC 6",
                    phoneNumber: "01326016695"
                }

            ],
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
