// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-03-07 15:56:17

function solution(A) {
  var n = A.length;
  var result = 0;
  var i;
  for (i = 0; i < n - 1; i++) {
    if (A[i] == A[i + 1])
      result = result + 1;
  }

  var r = 0;
  for (i = 0; i < n; i++) {
    var count = 0;
    
    if (i > 0) {
      if (A[i - 1] != A[i])
        count = count + 1;
      else
        count = count - 1;
    }
    if (i < n - 1) {
      if (A[i + 1] != A[i])
        count = count + 1;
      else
        count = count - 1;
    }

    r = Math.max(r, result + count);
  }

  return r;
}

//var arr = [1, 1, 0, 1, 0, 0];
var arr = [1, 1];
var res = solution(arr);
console.log(res);
