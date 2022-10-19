<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: {type: String, default: "Book"},
        href: {type: String, default: "https://google.com"} 
    }
})
</script>

<template>
    <a :href="$props.href">{{ $props.label }}</a>
</template>

