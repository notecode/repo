<template>
    <div id="tetris">
        <div class="pane">
            <div v-for="row in pane" class="row">
                <div v-for="cell in row" class="cell" v-bind:class="'cell' + cell">
                    {{cell}}
                </div> 
            </div>
        </div>
        <button v-on:click="start">start</button>
    </div>
</template>

<script src="./main.js"></script>
<style src="./main.scss" lang="scss" scoped></style>
