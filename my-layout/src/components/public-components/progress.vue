<template>
    <div>
        <el-progress :percentage="50" :key="1"></el-progress>
        <el-progress :percentage="100" :key="2" :format="format"></el-progress>
        <el-progress :percentage="100" :key="3" status="success"></el-progress>
        <el-progress :percentage="100" :key="4" status="warning"></el-progress>
        <el-progress :percentage="50" :key="5" status="exception"></el-progress>
    </div>
</template>


<script>
  export default {
        name: "progress",
        methods: {
            format(percentage) {
            return percentage === 100 ? '满' : `${percentage}%`;
        }
    }
  };
</script>
<style>

</style>

