<template>
    <div>
        <div id="edit">
            <Edit v-show='isShow' @closeEdit='closeEdit'></Edit>
        </div>
        <div id="topContainer">
            <img id="headPic" src="@/assets/pictures/infoHead.png">
            <div id="name">{{ this.cookie.getCookie('userName')}}</div>
            <div class="hoverIt">
                <div id="but1" @click="showEdit">编辑</div>
            </div>
            <div class="hoverIt">
                <div id="but2" @click="signOut">退出</div>
            </div>
        </div>
        <div id="myQuestion">
            <img src="@/assets/pictures/Rectangle_25.png" id="img1">
            <div id="theTitle">我的提问</div>
            <div id="questionContainer">
                <router-link v-for="item in MyQuestions" :key="item.id" :to="'/Qa/' +item.id">
                    <MyQuestionList :date='item.questionTime' :title='item.questionTitile' :commentNum='item.comment'
                        :likeNum='item.like'></MyQuestionList>
                </router-link>
            </div>
        </div>
        <Foot id="foot"></Foot>
    </div>
</template>

<script>
    import MyQuestionList from '@/components/UserCom/MyQuestionList.vue'
    import request from '@/utils/request.js'
    import Edit from '@/components/UserCom/Edit.vue'
    export default {
        name: 'UserPage',
        components: {
            MyQuestionList,
            Edit,
        },
        data() {
            return {
                MyQuestions: [],
                isShow: false,
            }
        },
        methods: {
            getMyQuestion() {
                request({
                    method: 'post',
                    url: '/question/questionsOfOnePerson',
                    params: {
                        questionUid: this.cookie.getCookie('userId')
                    }
                }).then(({
                    data: res
                }) => {
                    this.MyQuestions = res.data;
                    console.log(this.MyQuestions);
                })
            },
            showEdit() {
                this.isShow = true;
            },
            closeEdit(val) {
                this.isShow = val;
            },
            signOut(){
                this.cookie.clearCookie('userName');
                this.cookie.clearCookie('userId');
                sessionStorage.clear('listArr');
                this.$router.replace('/Home');
                location.reload();
            },
        },
        created() {
            this.getMyQuestion();
        },
    }
</script>

<style>
    #topContainer {
        position: relative;
        width: 1920px;
        height: 465px;
        background-color: rgba(177, 243, 243, 1);
    }

    #headPic {
        position: absolute;
        top: 165px;
        left: 915px;
    }

    #name {
        position: absolute;
        width: 200px;
        height: 40px;
        top: 280px;
        left: 850px;
        text-align: center;
        color: rgba(0, 0, 0, 1);
        font-family: FZBaoSong-Z04S;
        font-size: 36px;
    }

    .hoverIt :hover {
        cursor: pointer;
    }

    #but1 {
        position: absolute;
        top: 384px;
        left: 880px;
        width: 70px;
        height: 32px;
        border-radius: 21px;
        border: 0.6px solid rgba(111, 111, 111, 1);
        box-sizing: border-box;
        color: rgba(110, 110, 110, 1);
        font-family: PingFang-Regular;
        font-size: 14px;
        text-align: center;
        padding-top: 5px;
    }

    #but2 {
        position: absolute;
        top: 384px;
        left: 970px;
        width: 70px;
        height: 32px;
        border-radius: 21px;
        border: 0.6px solid rgba(111, 111, 111, 1);
        box-sizing: border-box;
        color: rgba(110, 110, 110, 1);
        font-family: PingFang-Regular;
        font-size: 14px;
        text-align: center;
        padding-top: 5px;
    }

    #myQuestion {
        position: relative;
        width: 1920px;
    }

    #img1 {
        position: absolute;
        left: 858px;
        top: 85px;
        width: 42px;
        height: 42px;
    }

    #theTitle {
        position: absolute;
        left: 888px;
        top: 97px;
        color: rgba(0, 0, 0, 1);
        font-family: FZBaoSong-Z04S;
        font-size: 36px;
    }

    #questionContainer {
        position: relative;
        left: 575px;
        top: 250px;
        width: 1000px;
        height: 1000px;
    }

    #foot {
        margin-top: 200px;
    }

    #edit {
        position: absolute;
        z-index: 99;
        left: 710px;
        top: 170px;
    }
</style>