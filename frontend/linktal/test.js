// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-03-07 11:52:04
 

function solution(A) {
  var max = function(A, start, end) {
    var X = {val: A[start], idx: start};
    for (var i = start + 1; i < end; i++) {
      if (A[i] > X.val) {
        X.val = A[i];
        X.idx = i;
      }
    }
    return X;
  }

  var lMax = {val: A[0], idx: 0};
  var rMax = max(A, 1, A.length);
  var maxDif = Math.abs(lMax.val - rMax.val);
  for (var i = 1; i < A.length - 1; i++) {
    if (A[i] > lMax.val) {
      lMax = {val: A[i], idx: i};
    }

    // 若右边的max被挪到左边，则另选举最大的
    if (rMax.idx <= i) {
      rMax = max(A, i + 1, A.length);
    }

    var dif = Math.abs(lMax.val - rMax.val);
    console.log(lMax.val, rMax.val, dif);
    if (dif > maxDif) {
      maxDif = dif;
    }
  }

  return maxDif;
}

var case1 = [1,3,-3];
var case2 = [1, 3, 5, 2, 2, -1];
var res = solution(case2);
console.log(res);
