<template>
    <div>
        <el-card style="font-weight: bold;" v-for="(i, j) in toptenlist" :key="j">
            #{{i[0]}}
        </el-card>
    </div>
</template>
<script>
export default {
    props: ['tags'],
    computed: {
        toptenlist() {
            var app = this
            var items = Object.keys(app.tags).map(function(key) {
                return [key, app.tags[key]];
            });

            // Sort the array based on the second element
            items.sort(function(first, second) {
                return second[1] - first[1];
            });

            console.log(items.slice(0, 10))

            // Create a new array with only the first 5 items
            return items.slice(0, 10)
        }
    }
}
</script>
