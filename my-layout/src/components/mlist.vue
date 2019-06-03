
<template>
    <div id="mlist-container">
        <div class="drag-item" v-for="item in mlist" 
        :key="item"
        @mousedown="handMousedown(item, $event)" 
        @mouseup="handMouseup" 
        @mouseleave="handMouseleave"
        @mousemove="handMousemove">{{item}}</div>
    </div>
</template>

<script>
export default {
    name: "mlist",
    data(){
        return {
            canDrag: false,
        };
    },
    computed: {
        dragInfo (){
            return this.$store.state.dragInfo;
        },
        mlist (){
            return this.$store.state.mlist;
        }
    },
    methods: {
        handMousedown (item, ev){
            // console.log(ev);
            this.canDrag = true;
            // 鼠标按下开始进入拖拽
            this.$store.state.dragInfo.isDarging = true;
            this.$store.state.dragInfo.item = item;
            this.$store.state.dragInfo.offsetX = ev.offsetX;
            this.$store.state.dragInfo.offsetY = ev.offsetY;
            // console.log(this.$store.state.layoutArray);
        },
        handMouseup (ev){
            this.canDrag = false;
            // 鼠标放开结束拖拽
            this.$store.state.dragInfo.isDarging = false;
        },
        handMouseleave (ev){
            this.canDrag = false;
        },
        handMousemove (ev){
            if(this.canDrag){
                // this.$store.state.dragInfo.isDarging = true;
                // this.$store.state.dragInfo.item = null;
                this.$store.state.dragInfo.startX = ev.clientX;
                this.$store.state.dragInfo.startY = ev.clientY;
                this.$store.state.dragInfo.mouseX = ev.clientY;
                this.$store.state.dragInfo.mouseY = ev.clientY;
            }            
        },
    }
}
</script>

<style lang="less" scoped>
    #mlist-container{
        background: #FFF;
        min-height: 100%;
        padding: 15px;
        box-sizing: border-box;
        .drag-item{
            width: 100px;
            padding: 5px;
            text-align: center;
            border: 1px solid #37F;
            user-select: none;
            display: inline-block; 
            margin: 5px;
        }
    }
</style>


