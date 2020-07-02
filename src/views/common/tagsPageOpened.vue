<style lang="less" scoped>

</style>
<template>
    <div>
        <el-tag
        size="medium"
        :key="i"
        v-for="(tag,i) in pageTagsList"
        :closable="(tag.name==='home_index')?false:true"
        :disable-transitions="false"
        :class="{'on':tag.children?(tag.children[0].name===currentPageName):tag.name === currentPageName}"
        @click.native="linkTo(tag)"
        @close="handleClose(tag)">
            <span class="fa fa-circle"></span>
            {{tag.meta.title||tag.title}}
        </el-tag>
    </div>
</template>

<script>

export default {
    props: {
        pageTagsList: Array
    },
    data() {
        return {
            routePageName: this.$route.name,
            onClass: false,
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            inputValue: ''
        };
    },
    created(){
        // console.log('pageTagsList',this.pageTagsList,this.routePageName)
    },
    watch: {
        '$route' (to) {
            this.routePageName = to.name;
        }
    },
    computed: {
        title () {
            return this.$store.state.currentTitle;
        },
        // pageTagsList2 () {
        //     return this.pageTagsList.slice(0)
        // },
        currentPageName () {
            return this.$store.state.currentPageName;
        },
    },
    methods: {
        filterMenuName(menu){
            return (menu.children && menu.children.length==1) ? menu.children[0].name : menu.name;
        },
        handleClose(tag){
            let openTag = null;
            this.pageTagsList.map((item,i)=>{
                if(tag.id == item.id){
                    if(this.pageTagsList.length<=2){
                        openTag = this.pageTagsList[i-1]
                    }else{
                        openTag = this.pageTagsList[i+1]
                    }
                    this.$store.commit('subTag',i)
                }
            })
            
            let tagName = this.filterMenuName(tag)
            if(tagName == this.routePageName){
                this.linkTo(openTag)
            }
        },
        linkTo (tag) {
            this.$store.commit('changeMenu', tag);
            if(this.currentPageName !== this.$route.name){
                this.$router.push({
                    name: this.currentPageName
                });
            }
        },
    }
}

</script>