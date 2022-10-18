<template>
  <div>
    <SearchBar stores="Blabla" />
    <StoreList stores={{ storesDummy }} />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const storesDummy = [
  {
    name: "Store 1",
    postcode: "AB11",
    phone: 11111111111
  },
  {
    name: "Store 2",
    postcode: "BB22",
    phone: 22222222222
  }
];

export default {
  head: {
    title: 'SpockSavers'
  },
  name: 'IndexPage',
}
</script>
