<script lang="ts" setup>
import {ref, computed, onMounted, onBeforeUnmount, reactive} from 'vue';

import VKeypad from './components/VKeypad.vue';
import VDisplay from './components/VDisplay.vue';
import VToggle from './components/VToggle.vue';

const OPERATORS = ['+', '-', 'x', '/']
const VALID_KEY_REGEX = /^[+\-x/\d\.]$/;
const NUM_REGEX = /^-?[\d\.]+$/;
const OPERATOR_REGEX = /^[+\-x/]$/;
const EVENT_TO_CALC_KEY = {
    'Backspace': 'DEL',
    'Escape': 'RESET',
    'Delete': 'RESET',
    'Enter': '=',
    '*': 'x',
    'X': 'x',
}

const theme = ref(0);

let keysHighlight = reactive({});

let display = ref('0'); // Number currently shown on screen

type operator = '+' | '-' | 'x' | '/';
type expression = (operator|number)[];
let infix: expression = []; // Whole calculation

const displayFormatted = computed(() => {
    // Check if there should be any commas in long numbers
    // (?!\.)
    return display.value.replace(/(\d+)(\.?\d*)/g, (match, g1, g2, ...args) => {
        let commaIdx = g1.length % 3 === 0 ? 3 : g1.length % 3
        let s = g1.substring(0, commaIdx);
        for(let i = commaIdx; i <= g1.length - 3; i += 3) {
            s += ',';
            s += g1.substring(i, i + 3);
        }
        s += g2;
        return s || '0';
    });
});
const themeClass = computed(() => {
    return {'theme-light': theme.value === 1, 'theme-neon': theme.value === 2};
});
onMounted(() => {
    document.addEventListener('keydown', onKeyEvent);
});
onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeyEvent);
});

function operatorPrecedence(operator) {
    switch(operator) {
        case '+': case '-': return 0;
        case 'x': case '/': return 1;
    }
    return -1;
}
function result(): string {
    // STEP 1: convert infix to postfix
    console.log('THE INFIX STRING: ', infix);
    let postfix: expression = [];
    let stack: expression = [];
    console.log('STARTING INFIX TO POSTFIX CONVERSION');
    for(let elm of infix) {
        // Rule 1: If the incoming symbol is an operand, print it
        if (NUM_REGEX.test(String(elm))) {
            console.log('IS A NUMBER ');
            postfix.push(elm);
        }
        else if (OPERATOR_REGEX.test(String(elm))) {
            const opPrecedence = operatorPrecedence(elm);
            let stackOperatorPrecedence = operatorPrecedence(stack[stack.length - 1]);
            // Rule 2: If the incoming symbol is an operator and the stack is empty or contains a left parenthesis on top, push the incoming operator onto the stack. 
            if (stack.length === 0) {
                stack.push(elm);
            }
            // Rule 3: If the incoming symbol is an operator and has either higher precedence than the operator on the top of the stack, or has the same precedence as the operator on the top of the stack and is right associative -- push it on the stack.
            else if (opPrecedence > stackOperatorPrecedence) {
                stack.push(elm);
            }
            // Rule 4: If the incoming symbol is an operator and has either lower precedence than the operator on the top of the stack, or has the same precedence as the operator on the top of the stack and is left associative -- continue to pop the stack until this is not true. Then, push the incoming operator.
            else if (opPrecedence <= stackOperatorPrecedence) {
                while(opPrecedence <= stackOperatorPrecedence) {
                    postfix.push(stack[stack.length - 1]);
                    stack = stack.slice(0, stack.length - 1);
                    if(stack.length === 0) break;
                    stackOperatorPrecedence = operatorPrecedence(stack[stack.length - 1]);
                }
                stack.push(elm);
            }
        }
        console.log(elm, postfix, stack);
    }
    // Rule 5: At the end of the expression, pop and print all operators on the stack. (No parentheses should remain.)
    for(let i = stack.length - 1; i >= 0; i--){
        postfix.push(stack[i]);
    }
    console.log('INFIX TO POSTFIX CONVERSION SUCCESFUL, POSTFIX: ', postfix);
    console.log('STARTING POSTFIX EVALUATION');
    // STEP 2: evaluate postfix string
    let postfixStack: expression = [];
    for(let i = 0; i < postfix.length; i++) {
        if(NUM_REGEX.test(String(postfix[i]))) {
            postfixStack.push(parseFloat(String(postfix[i])));
        }
        if (OPERATOR_REGEX.test(String(postfix[i]))) {
            let operand2 = postfixStack.pop();
            let operand1 = postfixStack.pop();
            if(!operand1 || !operand2 || typeof operand1 !== 'number' || typeof operand2 !== 'number') return 'Error';
            switch(postfix[i]) {
                case '+': postfixStack.push(operand1 + operand2); break;
                case '-': postfixStack.push(operand1 - operand2); break;
                case 'x': postfixStack.push(operand1 * operand2); break;
                case '/': postfixStack.push(operand1 / operand2); break;
            }
        }
    }
    console.log('DONE EVALUATING POSTFIX, RESULT:', postfixStack);
    return String(postfixStack[0]);
}
function onKeyEvent(e) {
    if(e.key in EVENT_TO_CALC_KEY) {
        onCalcKeyEnter(EVENT_TO_CALC_KEY[e.key])
    }
    else if (VALID_KEY_REGEX.test(e.key)) {
        onCalcKeyEnter(e.key);
    }
}
function onCalcKeyEnter(key) {
    if(key === 'DEL') { // Delete current typed number
        display.value = '0';
    } else if (key === 'RESET') {
        infix = [];
        display.value = '0';
        for(let keyHighlighted in keysHighlight) {
            keysHighlight[keyHighlighted] = false;
        }
    } else if (OPERATOR_REGEX.test(key)) {
        // Toggle highlight of that operator key
        for(const keyHighlighted in keysHighlight) {
            if(keysHighlight[keyHighlighted]) {
                infix = infix.slice(0, infix.length - 2);
            }
            keysHighlight[keyHighlighted] = false;
        }
        keysHighlight[key] = true;
        infix.push(parseFloat(display.value));
        infix.push(key);
    } else if (NUM_REGEX.test(key)) {
        // If operator is just pressed clear display to make room for the new number
        // and stop highlighting the operator
        for(let operator of OPERATORS) {
            if(keysHighlight[operator]) {
                keysHighlight[operator] = false;
                display.value = '0';
            }
        }

        if(display.value === '0')
            display.value = '';
        
        display.value += key;
    } else if (key === '=') {
        // Calculate the result and show it
        infix.push(parseFloat(display.value));
        display.value = result();
        infix = [];
    }
}
</script>

<template>
    <div :class="themeClass" class="font-serif w-screen h-full bg-background-light flex justify-center items-center">
        <div class="w-full relative max-w-[29rem] lg:max-w-[38rem] p-5">
            <h1 class="text-text text-3xl font-bold">calc</h1>  
            <VToggle class="absolute top-8 right-5" v-model="theme" :options="[1, 2, 3]" caption="THEME"></VToggle>

            <VDisplay class="my-8 lg:my-[1.2rem] w-full h-20 lg:h-28" :value="displayFormatted"></VDisplay>
            <VKeypad class="h-[26rem] lg:h-[30rem]" :keys-highlight="keysHighlight" @keyEnter="onCalcKeyEnter"></VKeypad>
        </div>

        <div class="absolute bottom-4 w-100 text-xs mx-auto">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
            Coded by <a href="#">Sofus</a>.
        </div>
    </div>
</template>

<style>
</style>
