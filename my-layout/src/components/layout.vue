<template>
    <div id="layout-container">  
        <div class="row-container" v-for="(arr, index1) in layoutArray"  :key="index1">
            <lc v-for="(item, index2) in arr"  :key="item.id" :m="item" :index1="index1" :index2="index2"></lc>
        </div>
        
        <!-- <lc :m="table"></lc> -->
        <!-- <lc :m="title1"></lc>
        <lc :m="title2"></lc>
        <lc :m="title3"></lc>
        <lc :m="text1"></lc>
        <lc :m="timeline"></lc>
        <lc :m="pagination"></lc>
        <lc :m="progress1"></lc> -->
    </div>
</template>

<script>
import lc from "@/components/layout-container.vue";

export default {
    name: "layout",    
    components: {
        lc,
    },
    computed: {
        layoutArray (){
            return this.$store.state.layoutArray;
        }
    },
    data (){
        return {
            mheader: "mheader",
            pagination: "pagination",
            table: "table",
            title1: "title1",
            title2: "title2",
            title3: "title3",
            text1: "text1",
            timeline: "timeline",
            progress1: "progress1",
        }
    }
}
</script>

<style lang="less" scoped>
    #layout-container{
        background: #FFF;
        width: 1000px;
        min-height: 100%;
        margin: 0 auto;
        .row-container{
            display: flex;
        }
    }
</style>