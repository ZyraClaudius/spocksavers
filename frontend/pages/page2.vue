<template>
  <div>
    <App message="Page 2 Now!" />
    <NuxtLink to="/">Page 1</NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default {
  head: {
    title: 'SpockSavers 2'
  },
  name: 'Page 2',
}
</script>
