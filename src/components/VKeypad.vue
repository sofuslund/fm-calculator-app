<script setup>
const delAndResStyle = "text-key-text-light bg-key-bg-secondary shadow-key-bg-secondary-dark text-xl";
const equalsStyle = "text-key-text-dark col-span-2 bg-key-bg-tertiary shadow-key-bg-tertiary-dark text-xl";
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
    return key.hasOwnProperty('styleClass') ? key.styleClass : 'text-3xl text-key-text bg-key-bg-primary shadow-key-bg-primary-dark';
}
</script>

<template>
<div class="w-full h-[26rem] bg-background grid grid-cols-4 grid-rows-5 gap-3.5 p-6 rounded-md">
    <button class="rounded-md w-full h-full shadow-[0_-.25rem_inset]" :class="keyStyle(key)" v-for="key in keys">
    <!-- translate to compensate for emptu space in font making it difficult to center text -->
        <h1 class="translate-y-[.02em]">{{keyText(key)}}</h1>
    </button>
</div>
</template>