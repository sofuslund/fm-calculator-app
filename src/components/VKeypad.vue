<script setup>
const emit = defineEmits(['keyEnter']);
const props = defineProps(['keysHighlight']);

const primaryStyle = 'text-3xl lg:text-5xl text-key-text bg-key-bg-primary shadow-key-bg-primary-dark shadow-primary';
const secondaryStyle = "text-key-text-light bg-key-bg-secondary shadow-secondary text-xl lg:text-[2rem]";
const tertiaryStyle = "text-key-text-dark col-span-2 bg-key-bg-tertiary shadow-tertiary text-xl lg:text-[2rem]";
const keys = [
    7,   8,   9,   {text: 'DEL', styleClass: secondaryStyle},
    4,   5,   6,   '+',
    1,   2,   3,   '-',
    '.', 0,  '/',  'x',
    {text: 'RESET', styleClass: secondaryStyle + " col-span-2"}, {text: '=', styleClass: tertiaryStyle}
];

function keyText(key){
    return key.hasOwnProperty('text') ? key.text : key;
}
function keyStyle(key) {
    return key.hasOwnProperty('styleClass') ? key.styleClass : primaryStyle;
}

</script>

<template>
<div class="w-full bg-background grid grid-cols-4 grid-rows-5 gap-3.5 lg:gap-[1.25rem] p-6 rounded-xl">
    <button class="rounded-md w-full h-full hover:brightness-[1.3]" @click="$emit('keyEnter', keyText(key))" :class="[keyStyle(key), {'brightness-[1.3]': keysHighlight[key]}]" v-for="key in keys">
        <!-- translate to compensate for empty space in font making it difficult to center text -->
        <h1 class="translate-y-[.02em]">{{keyText(key)}}</h1>
    </button>
</div>
</template>