<script setup>
import {ref, computed, nextTick} from 'vue';

import VKeypad from './components/VKeypad.vue';
import VDisplay from './components/VDisplay.vue';
import VToggle from './components/VToggle.vue';

const OPERANDS = ['+', '-', 'x', '/'];

const theme = ref(0);
const display = ref('');

const themeClass = computed(() => {
    return {'theme-light': theme.value == 1, 'theme-neon': theme.value == 2};
})

function onKeyEnter(key) {
    if(OPERANDS.includes(key)) {

    }
}
</script>

<template>
    <div :class="themeClass" class="font-serif h-screen bg-background-light flex wrap justify-center items-center">
        <div class="w-full max-w-md p-5">
            <div class="">
                <h1 class="text-text text-3xl float-left font-bold">calc</h1>
                <VToggle v-model="theme" :options="[1, 2, 3]" caption="THEME" class="float-right"></VToggle>
            </div>

            <VDisplay class="" v-model="display"></VDisplay>
            <VKeypad class="" @keyEnter="onKeyEnter"></VKeypad>
        </div>

        <div class="absolute bottom-4 w-100 text-xs mx-auto">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
            Coded by <a href="#">Sofus</a>.
        </div>
    </div>
</template>

<style>
</style>
