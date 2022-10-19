<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { SearchFunction,Store } from './App.vue';

type Callback = (stores: Store[]) => void;

export default defineComponent({
  props: {
    callback: { type: Function as PropType<Callback>, required: true},
    stores: { type: Array as PropType<Store[]>, required: true},
  },

  data() {
    return {
      searchTerm: "",
      counter: 0,
    }
  },

  methods: {
    onChange(payload: Event) {
      this.$props.callback(this.searcher(this.$props.stores));
    },
    searcher(stores: Store[]) {
      let storesFiltered = stores.filter(this.storeFilter);
      return storesFiltered.length <= 5 ? storesFiltered : storesFiltered.slice(0,5);
    },
    storeFilter(store: Store) {
      for(let key in store){
        if(key=="id" || key=="storeName" || key=="postcode" || key=="phoneNumber"){
          if(store[key].includes(this.searchTerm)){
            return true;
          }
        }
      }
      return false;
    }
  }
})
</script>

<template>
  <div id="searchRow">
    <input v-model="searchTerm" @input="onChange" type="text" maxlength="18" />
  </div>
</template>

<style scoped src="../assets/css/searchBar.css">

</style>