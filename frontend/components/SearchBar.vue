<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { SearchFunction,Store } from './App.vue';

type Callback = (searcher: SearchFunction) => void;

export default defineComponent({
  props: {
    callback: { type: Function as PropType<Callback>, required: true},
  },

  data() {
    return {
      searchTerm: "",
      counter: 0,
    }
  },

  methods: {
    onChange(payload: Event) {
      this.$props.callback(this.searcher);
    },
    searcher(stores: Store[]) {
      return stores.filter(this.storeFilter);
    },
    storeFilter(store: Store) {
      
    }
  }
})
</script>

<template>
  <div id="searchRow">
    <input v-model="searchTerm" @input="onChange" type="text" maxlength="18" />
    <p>{{ searchTerm }}</p>
    <p>{{ counter }}</p>
  </div>
</template>

<style scoped src="../assets/css/searchBar.css">

</style>