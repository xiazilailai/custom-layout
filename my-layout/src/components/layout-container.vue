
<template>
    <div class="lc-container">
        <component v-bind:is="m.name"></component>        
        <div class="cover"
            @mousedown="handMousedown"
            @mousemove="handMousemove"
            @mouseup="handMouseup"
            @mouseleave="handMouseup">
            <div class="cover-left" :class="{active: m.rectInfo.isDropIn && m.rectInfo.dropPosition == 0}"></div>
            <div class="cover-top" :class="{active: m.rectInfo.isDropIn && m.rectInfo.dropPosition == 1}"></div>
            <div class="cover-right" :class="{active: m.rectInfo.isDropIn && m.rectInfo.dropPosition == 2}"></div>
            <div class="cover-bottom" :class="{active: m.rectInfo.isDropIn && m.rectInfo.dropPosition == 3}"></div>
            <div class="delete-top" @click="deleteLayout"><i class="el-icon-close"></i></div>
            <div class="add-left"><i class="el-icon-circle-plus"></i></div>
            <div class="add-top"><i class="el-icon-circle-plus"></i></div>
            <div class="add-right"><i class="el-icon-circle-plus"></i></div>
            <div class="add-bottom"><i class="el-icon-circle-plus"></i></div>
        </div>
        <!-- <lc v-if="!!m"></lc> -->
    </div>
</template>

<script>
export default {
    name: "lc",
    props:[
        "m",
        "index1",
        "index2"
    ],
    data (){
        return {
            canDrag: false,
        };
    },
    mounted (){
        let el = $(this.$el);
        this.m.rectInfo.width = el.innerWidth();
        this.m.rectInfo.height = el.innerHeight();
        this.m.rectInfo.el = el;        
        // console.log(this.m, this.m.rectInfo.el.clone());
    },
    methods: {
        handMousedown (ev){
            // console.log(ev);
            this.canDrag = true;
            // 鼠标按下开始进入拖拽
            this.$store.state.dragInfo.isDarging = true;
            this.$store.state.dragInfo.item = this.m;
            this.$store.state.dragInfo.offsetX = ev.offsetX;
            this.$store.state.dragInfo.offsetY = ev.offsetY;
            
            this.$store.state.dragInfo.index1 = this.index1;
            this.$store.state.dragInfo.index2 = this.index2;
            // console.log(this.$store.state.layoutArray);
        },
        handMousemove (){
            if(this.canDrag){
                // 当拖动已经布局好的模块时
                $("#drag-box").empty();
                this.m.rectInfo.el.clone().css({
                    width: this.m.rectInfo.width,
                    height: this.m.rectInfo.height,
                    overflow: "hidden"
                }).appendTo($("#drag-box"));
                this.m.rectInfo.el.children(".cover").addClass("whitebg");
            }
            this.canDrag = false;             
        },
        handMouseup (){
            this.canDrag = false;   
        },
        deleteLayout (){
             this.$store.dispatch("deleteM", [this.index1, this.index2]);
        },

    },
}
</script>

<style lang="less" scoped>
    .lc-container{
        background: #FFF;
        min-height: 50px;
        // overflow: hidden;
        position: relative;
        padding: 15px;
        box-sizing: border-box;
        flex: 1;
        user-select: none;
        box-shadow: inset 0 0 1px 1px #dddddd;
        .cover{
            cursor: pointer;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            .cover-left{
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 4px;
                // background: #39F;
            }
            .cover-top{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
            }            
            .cover-right{     
                position: absolute;
                top: 0;
                right: 0;           
                height: 100%;
                width: 4px;
            }
            .cover-bottom{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
            }
            .cover-left.active,
            .cover-top.active,
            .cover-right.active,
            .cover-bottom.active{
                background: #39F;
            }
            .add-left{
                position: absolute;
                top: ~"calc(50% - 8px)";
                left: -8px;
                display: none;
            }
            .add-top{
                position: absolute;
                top: -8px;
                left: ~"calc(50% - 8px)";
                display: none;
            }
            .add-right{
                position: absolute;
                top: ~"calc(50% - 8px)";
                right: -8px;
                display: none;
            }
            .add-bottom{
                position: absolute;
                left: ~"calc(50% - 8px)";
                bottom: -9px;
                display: none;
            }
            .delete-top{
                position: absolute;
                top: 0;
                left: 0;
                padding: 5px;
                background: #39F;
                color: #FFF;
                display: none;
                cursor: pointer;
                opacity: 0.8;
            }
            .delete-top:hover{
                opacity: 1;
            }
        }
        .cover:hover,
        .cover.hover{
            box-shadow: inset 0 0 2px #39F;
            .add-left,
            .add-top,
            .add-right,
            .add-bottom,
            .delete-top{                
                display: block;
                z-index: 1;
            }
        }
        .cover.whitebg{
            background: #FFF;
        }
    }
</style>