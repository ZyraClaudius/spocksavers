<script lang="ts">
import { defineComponent } from 'vue';

export type Store = {
    "id": string;
    "storeName": string;
    "postcode": string;
    "phoneNumber": string;
}

export type SearchFunction =  (stores: Store[]) => Store[];

export default defineComponent({
    data(): { stores: Store[], storesDisplay: Store[] } {
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
                }
            ],
            storesDisplay: [],
        };
    },
    
    methods: {
        search(searcher: SearchFunction) {
            this.storesDisplay = searcher(this.stores);
        }
    }

})

</script>

<template>
    <div>
        <SearchBar :callback="search"/>
        <p>{{ storesDisplay }}</p>
        <!-- <StoreList stores={{ storesDummy }} /> -->
    </div>
</template>
