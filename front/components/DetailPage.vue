<template>
    <div>
        <div v-for="(i,j) in points" :key="j">
            <el-card :body-style="{ padding: '0px' }" style="width: 365px; margin: 5px; padding: 10px;">
                <div @click="gotoLink(i)">
                    <div style="display: flex;">
                        <img :src="i.image_url[0]" style="width: 100px; height: 100px; object-fit: cover; margin-right: 10px;" class="image">
                        <div style="display: block">
                            <div style="display: flex">
                                <h4 style="margin-right: 10px;">{{i.name}}</h4>
                                <span style="font-size: 14px; color: gray;" v-if="i.category!='rest'">{{i.category}}</span>
                                <span style="font-size: 14px; color: gray;" v-else>restaurant</span>
                            </div>
                            <p style="font-size: 12px;">{{i.addr}}</p>    
                            <p>instagram posts: {{i.post.num}}</p>
                            <div v-show="Object.keys(i.post.tags).length >= 3">
                                <span style="font-weight: bold;">#{{Object.keys(i.post.tags)[0]}}</span>
                                <span style="font-weight: bold;">#{{Object.keys(i.post.tags)[1]}}</span>
                                <span style="font-weight: bold;">#{{Object.keys(i.post.tags)[2]}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        points() {
            return this.$store.getters.getPoints
        },
    },
    methods: {
        gotoLink(i) {
            window.open(i.detail.url, '_blank')
        }
    }
}
</script>