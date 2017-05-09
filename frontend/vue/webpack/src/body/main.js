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
    },
    methods: {
        start: function(event) {
            this.preShape = this._genAShape();
            this._drawPreShape();

            this.curShape = this._genAShape();
            this._drawShape();

            this.mainTimer = setInterval(this._mainLoop, 700);
        },

        _mainLoop: function() {
            console.log(this.curShape);

            clearInterval(this.mainTimer);
        },

        _genAShape: function() {
            var shape = [];

            // todo: random
            Object.assign(shape, this.shapeSchema[0][0]);
            shape.push([0,3]);

            return shape;
        },
        _drawShape: function(draw) {
            var sp = this.curShape;
            if (0 == sp.length) {
                return;
            }

            var v = draw || 1;
            var rowOff = sp[4][0] + sp[5][0];
            var colOff = sp[4][1] + sp[5][1];
            for (var i = 0; i < 4; i++) {
                var the = sp[i];
                var row = the[0] + rowOff;
                var col = the[1] + colOff;
                Vue.set(this.pane[row], col, v);
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

            var v = draw || 1;
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
