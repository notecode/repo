<template>
  <div id="tetris">
      <div v-for="row in ground" class="row">
          <div v-for="cell in row" class="cell" v-bind:class="'cell' + cell">
              {{cell}}
          </div> 
      </div>
  </div>
</template>

<script>
export default {
    name: 'VBody',
    data: function() {
        return {
            ground: [
                [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],
        };
    }
}
</script>

<style lang="scss" scoped>
#tetris {
    display: inline-block;
    border: 1px solid black;

    .row {
        .cell {
            display: inline-block;
            width: 30px;
            height: 30px;
            background-color: green;
            color: green;
            border: 1px solid black;
            visibility: hidden; 

            &.cell1 {
                visibility: visible; 
            }
        }
    }
}
</style>
