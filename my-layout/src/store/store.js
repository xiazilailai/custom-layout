import Vue from 'vue'

// 引入VUEX
import Vuex from 'vuex';
Vue.use(Vuex);
let Component_ID = 1;
class Component {
    /**
     * 
     * @param {*} options 
     * 模块的名字 name  也是唯一标识符
     * 模块的id 自动生成
     * 模块的位置 
     * 
     */
    constructor(module_name){
        this.name = module_name;
        this.id = Component_ID;
        this.rectInfo = {
            dropPosition: 0,
            isDropIn: false,
            width: 0,
            height: 0,
            el: null
        };
        Component_ID ++;
    }    
}
const mlist = [
    "mheader",
    "title1",
    "title2",
    "title3",
    "text1",
    "progress1",
    "timeline",
    "pagination",
];


const store = new Vuex.Store({
    state: {
        dragInfo: {
            isDarging: false,
            startX: 0,
            startY: 0,
            offsetX: 0,
            offsetY: 0,
            mouseX: 0,
            mouseY: 0,
            item: null,
            index1: 0,
            index2: 0,
        },
        mlist,
        layoutArray: [
            [
                new Component("mheader"),
            ]
        ]
    },
    mutations: {
        addM(state, opt){   
            if(opt.isDraged && opt.index1*1000 + opt.index2 >= opt.overItemPosition[0]*1000 + opt.overItemPosition[1]){                
                state.layoutArray[opt.index1].splice(opt.index2, 1);
                opt.isDraged = false;
            }
            switch (opt.dropPosition) {
                case 0: // 在前面插入
                    state.layoutArray[opt.overItemPosition[0]].splice(opt.overItemPosition[1], 0, new Component(opt.name));
                    break;
                case 1: // 在上面插入
                    state.layoutArray.splice(opt.overItemPosition[0], 0, [new Component(opt.name)]);
                    break;
                case 2: // 在后面插入
                    state.layoutArray[opt.overItemPosition[0]].splice(opt.overItemPosition[1]+1, 0, new Component(opt.name));
                    break;
                case 3: // 在下面插入
                    state.layoutArray.splice(opt.overItemPosition[0]+1, 0, [new Component(opt.name)]);
                    break;
            }              
            if(opt.isDraged){
                state.layoutArray[opt.index1].splice(opt.index2, 1);
            }
            // console.log(state.layoutArray.length, "------");       
        },
        deleteM(state, p){
            state.layoutArray[p[0]].splice(p[1], 1);
        }
        
    },
    actions: {
        addM(context, opt){
            context.commit("addM", opt);
        },
        deleteM(context, p){
            context.commit("deleteM", p);
        }
    }
});

export default store; 
