<template>
    <div id="listContainer">
        <div id="listTitle">{{ listTitle }}</div>
        <label 
            v-for="(option, index) in options" 
            :key="index" 
            class="radio-label"
        >
            <input 
                type="radio" 
                :name="testQ" 
                :value="option.value" 
                @change="sendRadioVal" 
                v-model="checkedValue"
            >
            <span class="select">{{ option.label }}</span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'TestList',
        props: {
            listTitle: {
                type: String,
                required: true
            },
            testQ: {
                type: String,
                required: true
            },
            checkedValue: {
                type: String
            }
        },
        data() {
            return {
                options: [
                    { value: '0', label: '符合' },
                    { value: '1', label: '大部分符合' },
                    { value: '2', label: '有时不符合' },
                    { value: '3', label: '不符合' }
                ]
            }
        },
        methods: {
            sendRadioVal() {
                this.$emit('getVal', {
                    testQ: this.testQ,
                    checkedValue: this.checkedValue
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    #listContainer {
        border-top: 1px solid rgba(203, 203, 203, 1);
        width: 800px;
        height: 216px;
        position: relative;
        color: rgba(71, 71, 71, 1);
        font-family: PingFang-Regular;
        font-size: 15px;
    }

    #listTitle {
        position: absolute;
        top: 60px;
        color: rgba(0, 0, 0, 1);
        font-family: FZBaoSong-Z04S;
        font-size: 24px;
    }

    input {
        width: 18px;
        height: 18px;
        margin-top: 132px;
        margin-right: 80px;
    }

    .select{
        position: relative;
        top: -5px;
        width: 50px;
        left: -65px;
    }

    .radio-label {
        cursor: pointer;
    }

    
</style>