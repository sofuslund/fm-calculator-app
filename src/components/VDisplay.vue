<script setup>
const props = defineProps(['value']);
</script>
<template>
    <div class="bg-background-dark rounded-xl">
        <h1 class="mx-6 text-text text-right text-4xl leading-[2.5em]">{{value}}</h1>
    </div>
</template>