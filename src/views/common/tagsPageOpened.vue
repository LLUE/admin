<style lang="less" scoped>

</style>
<template>
    <transition-group name="list" tag="div">
        <el-tag
        size="medium"
        v-for="(tag) in pageTagsList"
        :key="tag.name"
        :closable="(tag.name==='home_index')?false:true"
        :disable-transitions="false"
        :class="{'on':tag.children?(tag.children[0].name===currentPageName):tag.name === currentPageName,'list-item':true}"
        @click.native="linkTo(tag)"
        @close="handleClose(tag)">
            <span class="fa fa-circle"></span>
            {{$t(tag.meta.title||tag.title)}}
            <!-- {{tag.meta.title||tag.title}} -->
        </el-tag>
    </transition-group>
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
            this.pageTagsList.forEach(tag => {
                let name = this.filterMenuName(tag)
                if(name==to.name){
                    this.linkTo(tag)
                }
            });
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
                    if(this.pageTagsList.length == i+1){
                        openTag = this.pageTagsList[i-1]
                    }else{
                        if(this.pageTagsList.length<=2){
                            openTag = this.pageTagsList[i-1]
                        }else{
                            openTag = this.pageTagsList[i+1]
                        }
                    }
                    this.$store.commit('subTag',i)
                }
            })
            this.$parent.initMoveTag();
            let tagName = this.filterMenuName(tag)
            let goName = this.filterMenuName(openTag)
            if(tagName == this.routePageName){
                this.$store.commit('changeTags', openTag);
                this.$router.push({
                    name: goName
                });
            }
        },
        linkTo (tag) {
            this.$store.commit('changeTags', tag);
            if(this.currentPageName !== this.$route.name){
                this.$router.push({
                    name: this.currentPageName
                });
            }
        },
    }
}

</script>