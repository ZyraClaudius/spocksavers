<script lang="ts">
import { defineComponent } from 'vue';
import type {PropType} from 'vue';
export default defineComponent({
    props: {
        label: { type: String, default: "Book" },
        selectStore: {type: Function as PropType<()=>void>, required: true}
    }
})
</script>

<template>
    <button @click="selectStore">{{ $props.label }}</button>
</template>

<style scoped src="../assets/css/linkComponent.css">

</style>