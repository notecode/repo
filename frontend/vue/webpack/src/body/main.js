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
        this.shapeSchema = [
            // z型
            [
                [ [0,0], [0,1], [1,1], [1,2] ],
                [ [0,2], [1,2], [1,1], [2,1] ],
            ],

            // 田
            [
                [ [0,0], [0,1], [1,0], [1,1] ],
            ],
        ];
        this.curShape = [];
        this.preShape = [];
    },
    methods: {
        start: function(event) {
            Object.assign(this.preShape, this.shapeSchema[0][0]);
            Object.assign(this.curShape, this.preShape);
            this._showPreShape();
            this._showShape();

//            var cnt = 0;
//            var timer = setInterval(function() {
//                Vue.set(_this.pane[cnt], cnt, 1);
//
//                if (++cnt > 5) {
//                    clearInterval(timer);
//                }
//            }, 500);
        },

        _showShape: function() {
            for (var i = 0; i < 4; i++) {
                var the = this.curShape[i];
                Vue.set(this.pane[the[0]], the[1], 1);
            }
        },

        _showPreShape: function(show) {
            if (0 == this.preShape.length) {
                return;
            }

            var v = show || 1;
            for (var i = 0; i < 4; i++) {
                var the = this.preShape[i];
                Vue.set(this.prePane[the[0]], the[1], v);
            }
        },
        _clearPreShape: function() {
            this._showPreShape(0);
        }
    },
}
