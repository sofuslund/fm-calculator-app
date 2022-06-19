<script lang="ts" setup>
const props = defineProps(['value']);
</script>
<template>
    <div class="bg-background-dark rounded-xl flex items-center">
        <h1 class="mx-6 text-text text-right text-4xl lg:text-6xl lg:translate-y-[.4rem] w-full">{{value}}</h1>
    </div>
</template>