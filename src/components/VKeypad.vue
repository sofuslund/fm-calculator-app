<script setup>
const emit = defineEmits(['keyEnter']);

const delAndResStyle = "text-key-text-light bg-key-bg-secondary shadow-secondary text-xl";
const equalsStyle = "text-key-text-dark col-span-2 bg-key-bg-tertiary shadow-tertiary text-xl";
const keys = [
    7,   8,   9,   {text: 'DEL', styleClass: delAndResStyle},
    4,   5,   6,   '+',
    1,   2,   3,   '-',
    '.', 0,  '/',  'x',
    {text: 'RESET', styleClass: delAndResStyle + " col-span-2"}, {text: '=', styleClass: equalsStyle}
];

function keyText(key){
    return key.hasOwnProperty('text') ? key.text : key;
}
function keyStyle(key) {
    return key.hasOwnProperty('styleClass') ? key.styleClass : 'text-3xl text-key-text bg-key-bg-primary shadow-key-bg-primary-dark shadow-primary';
}
</script>

<template>
<div class="w-full h-[26rem] lg:h-[23.5rem] bg-background grid grid-cols-4 grid-rows-5 gap-3.5 lg:gap-[1.1rem] p-6 rounded-md">
    <button class="rounded-md w-full h-full" @click="$emit('keyEnter', keyText(key))" :class="keyStyle(key)" v-for="key in keys">
    <!-- translate to compensate for emptu space in font making it difficult to center text -->
        <h1 class="translate-y-[.02em]">{{keyText(key)}}</h1>
    </button>
</div>
</template>