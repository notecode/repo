<template>
    <div id="tetris">
        <div class="pane">
            <div v-for="row in pane" class="row">
                <div v-for="cell in row" class="cell" v-bind:class="{light: cell}">
                    {{cell}}
                </div> 
            </div>
        </div>
        <div class="op-area">
            <div class="pre-pane">
                <div v-for="row in prePane" class="row">
                    <div v-for="cell in row" class="cell" v-bind:class="{light: cell}">
                        {{cell}}
                    </div> 
                </div>
            </div>
            <button v-on:click="start">start</button>
        </div>
    </div>
</template>

<script src="./main.js"></script>
<style src="./main.scss" lang="scss" scoped></style>
