<template>
    <el-card>
        <div v-for="(k, tag) in tags" :key="tag">
            {{ tag }} {{ k }}
        </div>
    </el-card>
</template>
<<script>
export default {
    computed:{
        tags : function (params) {
            console.log(this)
            var points = this.$store.getters.getPoints
            var tags = {}
            for( var point of points){
                for(var tag in point.post.tags){
                    if(tags[tag] != undefined){
                        tags[tag] += point.post.tags[tag]
                    }
                    else{
                        tags[tag] = 1
                    }
                }
            }
            console.log(tags)
            return tags
        }
    }
}
</script>
