<template>
    <div class="hoverIt">
        <div id="container">
            <div id="line"></div>
            <div id="titleContainer">
                <div id="title">{{block1}}</div>
                <router-link :to='tolink' v-show="link">
                    <div id="toAsk">{{link}}</div>
                </router-link>
            </div>
            <router-link :to='url2'>
                <div id="text1">{{block2}}</div>
            </router-link>
            <router-link :to='url3'>
                <div id="text2">{{block3}}</div>
            </router-link>
            <router-link :to='url4'>
                <div id="text3">{{block4}}</div>
            </router-link>
            <router-link :to='url5'>
                <div id="text4">{{block5}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RelativeThing',
        props: {
            block1: {},
            url2:'',
            link:'',
            tolink:'',
            block2: {},
            url3:'',
            block3: {},
            url4:'',
            block4: {},
            url5:'',
            block5: {},
        }
    }
</script>

<style lang="less" scoped>
    .hoverIt :hover {
        cursor: pointer;
    }

    #container {
        position: relative;
    }

    #titleContainer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        width: 280px;
        height: 34px;
    }

    #line {
        position: absolute;
        top:7px;
        width: 0.6px;
        height: 300px;
        background-color: rgba(0, 0, 0, 1);
    }

    #title {
        
        color: rgba(97, 97, 97, 1);
        font-family: PingFang-Regular;
        font-size: 24px;
    }
    

    #toAsk :hover {
        cursor: pointer;
    }

    #toAsk a{
        color: rgba(97, 97, 97, 1);
        font-family: PingFang-Regular;
        font-size: 16px;
    }

    #text1 {
        position: absolute;
        left: 22px;
        top: 56px;
        width: 317px;
        height: 48px;
        color: #616161;
        font-family: PingFang-Regular;
        font-size: 18px;
        line-height: 150.799997%;
    }

    #text2 {
        position: absolute;
        left: 22px;
        top: 130px;
        width: 317px;
        height: 48px;
        color: #616161;
        font-family: PingFang-Regular;
        font-size: 18px;
        line-height: 150.799997%;
    }

    #text3 {
        position: absolute;
        left: 22px;
        top: 205px;
        width: 317px;
        height: 48px;
        color: #616161;
        font-family: PingFang-Regular;
        font-size: 18px;
        line-height: 150.799997%;
    }

    #text4 {
        position: absolute;
        left: 22px;
        top: 260px;
        width: 317px;
        height: 48px;
        color: #616161;
        font-family: PingFang-Regular;
        font-size: 18px;
        line-height: 150.799997%;
    }
</style>