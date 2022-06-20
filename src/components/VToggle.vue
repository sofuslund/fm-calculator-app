<script lang="ts" setup>
const props = defineProps<{
    caption: string,
    options: number[],
    modelValue?: Number,
}>();
const emit = defineEmits<{(e: 'update:modelValue', value: number): void}>();

function updateValue(idx) {
    emit('update:modelValue', idx);
}
function circleColorClass(idx) {
    if(props.modelValue == idx) {
        return 'bg-key-bg-tertiary';
    }
    return 'bg-[#00000000]';
}
</script>

<template>
<div class="text-text flex items-end">
    <span class="text-xs mr-7 md-2">{{caption}}</span>
    <!-- Flexbox container for all the circles -->
    <div class="flex justify-evenly h-6 bg-background rounded-full float-right">
        <!-- Square / Container element for the individual circles.  -->
        <div class="p-[.3rem] h-full" @click="updateValue(idx)" v-for="(option, idx) in options" :key="idx">
            <!-- Circle -->
            <div class="h-full aspect-square overflow-visible rounded-full" :class="circleColorClass(idx)"></div>
            <!-- Text above circle -->
            <div class="relative bottom-9 w-full text-center text-xs">{{option}}</div>
        </div>
    </div>
</div>
</template>