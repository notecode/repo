import Vue from 'vue';

export default {
    name: 'VBody',
    data: function() {
        return {
            pane: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            prePane: [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ]
        };
    },
    created: function() {
        // 坐标对儿[0, 3]: cube坐标；
        // 坐标对儿4: 在4x4区域的偏移
        // 实际中还有一个5: 是以pane区的[0,3]为初始值的偏移（即4x4区域在pane中的偏移）
        //
        // 请恒记住：坐标对儿中[0]为行数，[1]为列数(和一般的习惯掉个儿了)
        this.shapeSchema = [
            // z型
            [
                [ [0,0], [0,1], [1,1], [1,2], [0,0] ],
                [ [0,2], [1,2], [1,1], [2,1], [0,0] ],
            ],

            // 田
            [
                [ [0,0], [0,1], [1,0], [1,1], [0,1] ],
            ],
        ];
        this.curShape = [];
        this.preShape = [];
        this.mainTimer = null;

        window.addEventListener('keyup', this.onKey);
    },
    methods: {
        start: function(event) {
            console.log('started');

            this.preShape = this._genAShape();
            this._drawPreShape();
            this.curShape = this._genAShape();
            this._drawShape();

            this.mainTimer = setInterval(this._mainLoop, 700);
        },

        onKey: function(evt) {
            switch (evt.key) {
                case 'L':
                case 'l':
                    this._tryMoveRight();
                    break;
                case 'J':
                case 'j':
                    this._tryMoveLeft();
                    break;
                case 'K':
                case 'k':
                    this._tryDrop();
                default:
                    break;
            }
        },

        _mainLoop: function() {
            if (this._tryDrop()) {
                ;
            } else {
                console.log('Bingo!');
                clearInterval(this.mainTimer);
            }
        },

        _tryDrop: function() {
            var succ = this._tryNext('v', 1); 
            if (!succ) {
                this._drawShape(1);

                // todo: 消行
                //

                // 出下一块
                this.curShape = this.preShape;
                this._drawShape();

                this._clearPreShape();
                this.preShape = this._genAShape();
                this._drawPreShape();
            }

            return true;
        },
        _tryMoveLeft: function() {
            return this._tryNext('h', -1);
        },
        _tryMoveRight: function() {
            return this._tryNext('h', 1);
        },
        _tryNext: function(hv, step) {
            var next = this._nextMaybe(hv, step);
            if (this._canPut(next)) {
                this._clearShape();
                this.curShape = next;
                this._drawShape();
                return true;
            } else {
                return false;
            }
        },
        _nextMaybe: function(hv, step) {
            // todo: 不能深度clone，故先这么凑合着弄
            var next = JSON.parse(JSON.stringify(this.curShape));

            if ('h' == hv) {
                next[5][1] += step;
            } else {
                next[5][0] += step;
            }

            return next;
        },

        _canPut: function(tee) {
            var max_row = this.pane.length - 1;
            var max_col = 9;
            var rc = this._getThe4RowCol(tee);
            for (var i = 0; i < 4; i++) {
                var r = rc[i][0];
                var c = rc[i][1];
                if (r < 0 || r > max_row) {
                    return false;
                } else if (c < 0 || c > max_col) {
                    return false;
                } else if (1 == this.pane[r][c]) {
                    return false;
                }
            }

            return true;
        },

        _genAShape: function() {
            var shape = [];

            // todo: random
            Object.assign(shape, this.shapeSchema[0][0]);
            shape.push([0,3]);

            return shape;
        },

        _getThe4RowCol: function(sp) {
            if (null == sp) {
                return null;
            }

            var res = [];
            var rowOff = sp[4][0] + sp[5][0];
            var colOff = sp[4][1] + sp[5][1];
            for (var i = 0; i < 4; i++) {
                var the = sp[i];
                var row = the[0] + rowOff;
                var col = the[1] + colOff;
                res.push([row, col]);
            }

            return res;
        },
        _drawShape: function(draw) {
            var sp = this.curShape;
            if (0 == sp.length) {
                return;
            }

            var v = (draw != null) ? draw : 100;
            var rc = this._getThe4RowCol(sp);
            for (var i = 0; i < 4; i++) {
                Vue.set(this.pane[rc[i][0]], rc[i][1], v);
            }
        },

        _clearShape: function() {
            this._drawShape(0);
        },

        _drawPreShape: function(draw) {
            var pre = this.preShape;
            if (0 == pre.length) {
                return;
            }

            var v = (draw != null) ? draw : 1;
            var rowOff = pre[4][0];
            var colOff = pre[4][1];
            for (var i = 0; i < 4; i++) {
                var the = pre[i];
                var row = the[0] + rowOff;
                var col = the[1] + colOff;
                Vue.set(this.prePane[row], col, v);
            }
        },
        _clearPreShape: function() {
            this._drawPreShape(0);
        }
    },
}
