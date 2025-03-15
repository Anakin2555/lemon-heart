<template>
    <div id="container1">

            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="心理科普" name="second"></el-tab-pane>
                <el-tab-pane label="职场技能" name="third"></el-tab-pane>
                <el-tab-pane label="婚恋情感" name="fourth"></el-tab-pane>
                <el-tab-pane label="家庭关系" name="fifth"></el-tab-pane>
                <el-tab-pane label="自我觉察" name="sixth"></el-tab-pane>
                <el-tab-pane label="人际社交" name="seventh"></el-tab-pane>
            </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'AriticleNav',
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab) {
                this.$emit('changeKind',tab._props.label)
            }
        }
    }
</script>

<style lang="less" scoped>
// 定义变量
@pingfang: PingFang-Regular;
@primary-color: #409EFF;
@text-color: #666;
@border-color: #000000;
@active-font-weight: 500;

// 定义混合(mixin)
.font-style() {
  font-family: @pingfang;
  line-height: 40px;
}

.tab-underline(@height, @color) {
  height: @height;
  background-color: @color;
}

#contaienr1 {
  width: 1150px;
  color: rgba(97, 97, 97, 1);
  .font-style();
  font-size: 20px;
  overflow: hidden;
}

::v-deep .el-tabs {
  // 标签项公共样式
  .el-tabs__item {
    .font-style();
    font-size: 18px;
    color: @text-color;
    height: 40px;

    &:hover {
      color: @primary-color;
    }

    // 激活状态
    &.is-active {
      color: @primary-color;
      font-weight: @active-font-weight;
    }
  }

  // 激活指示条
  .el-tabs__active-bar {
    .tab-underline(3px, @primary-color);
  }

  // 底部边框
  .el-tabs__nav-wrap {
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      .tab-underline(1px, @border-color);
      transform: scaleY(0.5);
      transform-origin: 0 100%;
    }
  }
}
</style>