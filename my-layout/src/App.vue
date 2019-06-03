<template>
  <div id="app" @mousemove="handMousemove" @mouseup="handMouseup" @mouseleave="handMouseleave">
    <div class="main">
      <layout ></layout>   
    </div>
    <div class="side">
      <mlist></mlist>
    </div>
    <div class="drag-item" :style="styleObj" v-if="isString">{{dragInfo.item}}</div>
    <div id="drag-box" :style="styleObj" v-if="!isString"></div>
  </div>
</template>

<script>

import layout from "@/components/layout";
import mlist from "@/components/mlist";

export default {
  name: 'app',
  data (){
    return {
      styleObj: {
          left: 0,
          top: 0,
          display: 'none'
      },
      overItem: null,
      overItemPosition: [0,0],
      isNoModule: false
    }
  },
  components: {
    layout,
    mlist
  },
  computed: {
    dragInfo(){
      return this.$store.state.dragInfo;
    },
    layoutArray (){
      return this.$store.state.layoutArray;
    },
    isString(){
      return typeof this.dragInfo.item === 'string';
    }
  },
  methods: {
    handMousemove(e){
      // console.log(e);
      // 在拖动状态下，改变拖动的坐标
      this.dragInfo.mouseX = e.clientX;
      this.dragInfo.mouseY = e.clientY;
      // console.log(this.dragInfo.startX);
      // TODO 防抖
      // if(){}
      this.styleObj.display = this.dragInfo.isDarging ? 'block' : 'none';
      this.styleObj.left = this.dragInfo.mouseX - this.dragInfo.offsetX + 'px';
      this.styleObj.top = this.dragInfo.mouseY - this.dragInfo.offsetY + 'px';
       // / 当拖动已经布局好的模块时
      // if(!this.isString){
      //   this.styleObj.left = this.dragInfo.mouseX - this.dragInfo.offsetX + this.dragInfo.item.rectInfo.width/2 + 'px';
      //   this.styleObj.top = this.dragInfo.mouseY - this.dragInfo.offsetY + this.dragInfo.item.rectInfo.height/2 + 'px';
      // }

      // TODO：当一个模块也没有的时候的特殊判断 

      // TODO 函数节流 
      if(this.dragInfo.isDarging){
        // 遍历节点判断拖放位置 以中心点为准
        let x = this.dragInfo.mouseX - this.dragInfo.offsetX + 56;
        let y = this.dragInfo.mouseY - this.dragInfo.offsetY + 15;
        // / 当拖动已经布局好的模块时
        if(!this.isString){
          x = this.dragInfo.mouseX - this.dragInfo.offsetX + this.dragInfo.item.rectInfo.width/2;
          y = this.dragInfo.mouseY - this.dragInfo.offsetY + this.dragInfo.item.rectInfo.height/2;
        }
        
        // 首先判断在哪个内部 
        // for(let index1 = 0; index1 < )
        let count = 0;
        this.layoutArray.forEach((arr, index1) => {
          arr.forEach((item, index2) => {
            count ++;
            if(jugeInWitch(x, y, item)){
              this.overItem = jugeInWitch(x, y, item);
              this.overItemPosition[0] = index1;
              this.overItemPosition[1] = index2;
            }            
          });        
        });
        if(count === 0){ // 一个模块也没有的时候
            this.isNoModule = true;
        }else{
          this.isNoModule = false;
        }
      }
      
    },
    handMouseup (ev){
      // console.log(this.dragInfo.isDarging , this.overItem)
      if(this.dragInfo.isDarging && this.overItem){
        // this.layoutArray[this.overItem.parent_index];
        // 根据位置不同前后插入，并排插入
        let opt = {
          name: this.dragInfo.item,
          dropPosition: this.overItem.rectInfo.dropPosition,
          overItemPosition: [this.overItemPosition[0], this.overItemPosition[1]]
        };
        // / 当拖动已经布局好的模块时
        if(!this.isString){
          opt.name = this.dragInfo.item.name;
          opt.index1 = this.dragInfo.index1;
          opt.index2 = this.dragInfo.index2;
          opt.isDraged = true;
        }
        // console.log('dispatch("addM"')
        this.$store.dispatch("addM", opt);
        this.overItem.rectInfo.isDropIn = false;
        this.overItem.rectInfo.dropPosition = 0;
      }else if(this.isNoModule){ // 没有的话 粗暴的加一个^_^
        let opt = {
          name: this.dragInfo.item,
          dropPosition: 0,
          overItemPosition: [0, 0]
        };
        this.$store.dispatch("addM", opt);
      }
      this.overItem = null;
      this.dragInfo.isDarging = false;
      this.styleObj.display = this.dragInfo.isDarging ? 'block' : 'none';
      $("#drag-box").empty();
      if(this.dragInfo.item && this.dragInfo.item.rectInfo) this.dragInfo.item.rectInfo.el.children(".cover").removeClass("whitebg");
    },
    handMouseleave (ev){
      if(this.overItem){
        this.overItem.rectInfo.isDropIn = false;
        this.overItem.rectInfo.dropPosition = 0;
      }
      this.overItem = null;
      this.dragInfo.isDarging = false;
      this.styleObj.display = this.dragInfo.isDarging ? 'block' : 'none';
      $("#drag-box").empty();
      if(this.dragInfo.item && this.dragInfo.item.rectInfo) this.dragInfo.item.rectInfo.el.children(".cover").removeClass("whitebg");
    }
    // TODO 还有离开窗口等几种情况。。。
  }
}
function jugeInWitch(x, y, item){
  const elX = item.rectInfo.el.offset().left;
  const elY = item.rectInfo.el.offset().top;
  const elW = item.rectInfo.width;
  const elH = item.rectInfo.height;

  const fourPoint = [
    {x: elX, y: elY + elH/2}, // 左边
    {x: elX + elW/2, y: elY}, // 上边
    {x: elX + elW, y: elY + elH/2}, // 右边
    {x: elX + elW/2, y: elY + elH} // 下边
  ];
  // console.log(x, y , "---", elX, elY, elW, elH);
  item.rectInfo.isDropIn = false;
  item.rectInfo.dropPosition = 0;
  if(x >= elX && x <= elX + elW && y >= elY && y <= elY + elH){
    item.rectInfo.isDropIn = true;
    item.rectInfo.dropPosition = dropPosition(x, y, fourPoint);
    // console.log(item.rectInfo.dropPosition );
    return item;
  }
  return false;
}
function dropPosition(x, y, fourPoint){
    let l1 = Math.pow(fourPoint[0].x - x, 2) + Math.pow(fourPoint[0].y - y, 2);
    let l2 = Math.pow(fourPoint[1].x - x, 2) + Math.pow(fourPoint[1].y - y, 2);
    let l3 = Math.pow(fourPoint[2].x - x, 2) + Math.pow(fourPoint[2].y - y, 2);
    let l4 = Math.pow(fourPoint[3].x - x, 2) + Math.pow(fourPoint[3].y - y, 2);
    let p = [l1, l2, l3, l4].indexOf(Math.min(l1, l2, l3, l4));
    return p;
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  
  .main{
    flex: 1;
    height: 100%;
    overflow: auto;
    border-right: 1px solid #dddddd; 
    background: #efefef;
    padding: 20px;
    box-sizing: border-box;
  }
  .side{
    width: 400px;
    height: 100%;
    overflow: auto;
  }
  .drag-item{
      position: absolute;
      width: 100px;
      padding: 5px;
      text-align: center;
      background: #37F;
      border: 1px solid #37F;
      user-select: none;
      opacity: 0.8;
  }
  #drag-box{
    position: absolute;
    opacity: 0.8;
    background: #FFF;
    box-sizing: border-box;
    box-shadow: inset 0 0 2px 2px #37F;
    user-select: none;
  }
}
</style>

