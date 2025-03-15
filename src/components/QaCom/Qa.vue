<script>
  import request from '@/utils/request.js'
  import Paging from '@/components/Paging.vue'
  import QaArticleList from '@/components/QaCom/QaArticleList.vue'
  import ToAsk from '@/components/QaCom/ToAsk.vue'
  import DOMPurify from 'dompurify'
  export default {
    name: 'Qa',
    components: {
      Paging,
      QaArticleList,
      ToAsk,
    },

    data() {
      return {
        text: [],
        qas: [],
        isReady: false,
        totalPage:{},
        pageSize:6,
        pageNo:1,
        userInput: '',
        sanitizedOutput: ''
      }
    },

    methods: {
      getQuestion1() {
        request({
          method: 'post',
          url: '/question/listQuestionByPage',
          params: {
            pageNo: Math.floor(Math.random() * 11 + 1),
          }
        }).then(({
          data: res
        }) => {
          this.text = [...res.data.records];
          this.totalPage = res.data.total;
          console.log(this.totalPage);
        })
      },
      getQuestion2(val) {
        request({
          method: 'post',
          url: '/question/listQuestionByPage',
          params: {
            pageNo: val,
          }
        }).then(({
          data: res
        }) => {
          this.qas = [...res.data.records];
          this.totalPage = res.data.total;
          for (const item of this.qas) {
            item.questionContent = item.questionContent.slice(0, 80) + "……";
          }
        })
      },
      changePage(val) {
        this.pageNo = val;
        this.getQuestion2(val);
      },
      sanitizeInput() {
        this.sanitizedOutput = DOMPurify.sanitize(this.userInput);
      },
      submit() {
        console.log('用户输入:', this.sanitizedOutput);
      }
    },

    created() {
      this.getQuestion1();
      this.getQuestion2(1);
    },

  }
</script>




<template>
  <div>
    <div class="container">
      <div class="top1">
        <img src="@/assets/pictures/qaBgimg.gif">
        <div>
          <router-link to='/PublishQ' id="ask">
            提问
          </router-link>
        </div>
      </div>
    </div>
    <div class="top2">
      <img src="@/assets/pictures/Rectangle_25.png" id="img1">
      <div id="title1">精选问答</div>
      <div id="line1"></div>
      <router-link :to="'/Qa/'+text[0].id" id="text0">
        <div v-text="this.text[0].questionTitile"></div>
      </router-link>
      <router-link :to="'/Qa/'+text[1].id" id="text1">
        <div v-text="this.text[1].questionTitile"></div>
      </router-link>
      <router-link :to="'/Qa/'+text[2].id" id="text2">
        <div v-text="this.text[2].questionTitile"></div>
      </router-link>
      <div id="line2"></div>
      <router-link :to="'/Qa/'+text[3].id" id="text3">
        <div v-text="this.text[3].questionTitile"></div>
      </router-link>
      <router-link :to="'/Qa/'+text[4].id" id="text4">
        <div v-text="this.text[4].questionTitile"></div>
      </router-link>
      <router-link :to="'/Qa/'+text[5].id" id="text5">
        <div v-text="this.text[5].questionTitile"></div>
      </router-link>
    </div>
    <div id="title2">最新问答</div>
    <ToAsk id="toAsk"></ToAsk>
    <div id="qaContainer">
      <router-link :to="'/Qa/'+ item.id" v-for="item in qas" :key="item.id">
        <QaArticleList :title="item.questionTitile" :content='item.questionContent' :date='item.questionTime'
          :comNum='item.comment' :likeNum='item.like'></QaArticleList>
      </router-link>
    </div>
    <Paging id="pages" @changePage='changePage' :totalPage='totalPage' :pageSize='pageSize' :pageNo='pageNo'></Paging>
    <Foot id="foot"></Foot>
    <input 
      type="text" 
      v-model="userInput" 
      @input="sanitizeInput" 
      placeholder="请输入内容"
    />
    <button @click="submit">提交</button>
    <div v-if="sanitizedOutput">
      <h3>输出内容:</h3>
      <div v-html="sanitizedOutput"></div>
    </div>
  </div>

</template>



<style lang="less" scoped>
@width-full: 1920px;
@height-top1: 383px;
@height-top2: 550px;
@color-white: #FFFFFF;
@color-light: rgb(177, 243, 243);
@color-dark: rgba(71, 71, 71, 1);
@border-radius: 100px;
@font-family-pingfang: PingFang-Regular;
@font-family-fz: FZBaoSong-Z04S;

.container {
  width: @width-full;
}

.top1 {
  width: @width-full;
  height: @height-top1;
  background: @color-white;
  position: relative;

  img {
    height: 100%;
    width: 100%;
  }

  #ask {
    position: absolute;
    top: 259px;
    left: 260px;
    width: 108px;
    height: 40px;
    border-radius: @border-radius;
    border: 1px solid rgba(0, 0, 0, 1);
    box-sizing: border-box;
    background: @color-white;
    color: @color-dark;
    font-family: @font-family-pingfang;
    font-size: 18px;
    line-height: 130.265629%;
    text-align: center;
    padding-top: 7px;
  }
}

  .top2 {
    width: 1920px;
    height: 550px;
    background-color: rgb(177, 243, 243);
    position: relative;
  }

  #img1 {
    position: absolute;
    top: 67px;
    left: 228px;
  }

  #title1 {
    position: absolute;
    top: 80px;
    left: 260px;
    width: 180px;
    height: 47px;
    color: @color-dark;
    font-family: @font-family-pingfang;
    font-size: 36px;
    line-height: 130.265629%;
  }

  #line1 {
    position: absolute;
    top: 187px;
    left: 260px;
    width: 0.6px;
    height: 239px;
    background-color: rgba(0, 0, 0, 1);
  }

  #line2 {
    position: absolute;
    top: 187px;
    left: 1097px;
    width: 0.6px;
    height: 239px;
    background-color: rgba(0, 0, 0, 1);
  }

  #text0 {
    position: absolute;
    top: 187px;
    left: 280px;
    width: 500px;
    height: 62px;
    color: rgba(0, 0, 0, 1);
    font-family: FZBaoSong-Z04S;
    font-size: 24px;
    line-height: 130.799997%;
  }

  #text1 {
    position: absolute;
    top: 273px;
    left: 280px;
    width: 500px;
    height: 62px;
    color: rgba(0, 0, 0, 1);
    font-family: FZBaoSong-Z04S;
    font-size: 24px;
    line-height: 130.799997%;
  }

  #text2 {
    position: absolute;
    top: 359px;
    left: 280px;
    width: 500px;
    height: 62px;
    color: rgba(0, 0, 0, 1);
    font-family: FZBaoSong-Z04S;
    font-size: 24px;
    line-height: 130.799997%;
  }

  #text3 {
    position: absolute;
    top: 187px;
    left: 1117px;
    width: 500px;
    height: 62px;
    color: rgba(0, 0, 0, 1);
    font-family: FZBaoSong-Z04S;
    font-size: 24px;
    line-height: 130.799997%;
  }

  #text4 {
    position: absolute;
    top: 273px;
    left: 1117px;
    width: 500px;
    height: 62px;
    color: rgba(0, 0, 0, 1);
    font-family: FZBaoSong-Z04S;
    font-size: 24px;
    line-height: 130.799997%;
  }

  #text5 {
    position: absolute;
    top: 359px;
    left: 1117px;
    width: 359px;
    height: 62px;
    color: rgba(0, 0, 0, 1);
    font-family: FZBaoSong-Z04S;
    font-size: 24px;
    line-height: 130.799997%;
  }

  #title2 {
    position: relative;
    top: 150px;
    left: 260px;
    width: 180px;
    height: 47px;
    color: rgba(71, 71, 71, 1);
    font-family: PingFang-Regular;
    font-size: 36px;
    line-height: 130.265629%;
  }

#qaContainer {
  height: 1400px;
  position: relative;
  top: 168px;
  left: 262px;
  width: 910px;
}

#pages {
  position: relative;
  top: 249px;
  left: 250px;
  width: 500px;
}

#foot {
  position: relative;
  top: 400px;
}

#toAsk {
  position: sticky;
  margin-left: 1400px;
  top: 300px;
}
</style>