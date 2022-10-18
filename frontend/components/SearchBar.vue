<script lang="ts">
import PropType from 'vue';

type Store = {
  id: string;
  storeName: string;
  postcode: string;
  phoneNumber: string;
}
type SearchFunction = (stores: Store[]) => Store[];

let searcher: SearchFunction;

searcher = (stores) => {
  
  return stores
}

export default {
  props: {
    callback: PropType<(searcher: SearchFunction) => Store[]>,
  },
  data() {
    return {
    }
  }
}
</script>

<template>
  <div id="searchRow">
    <input type="text" maxlength="18"/>
  </div>
</template>

<style scoped src="../assets/css/searchBar.css">

</style>