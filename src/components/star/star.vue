
<template>
    <div :class="starType" class="star">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
    </div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            var result = [];
            // 计算全星的个数
            var score = Math.floor(this.score);
            // 计算是否有半星
            var hasHalf = Math.round(this.score) - Math.floor(this.score) === 1;
            for (var i = 0; i < score; i++) {
                result.push(CLS_ON);
            }
            if (hasHalf) {
                result.push(CLS_HALF);
            }
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            }
            return result;
        }
    }
}
</script>
    
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
.star {
    font-size: 0;
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
    &.star-48 {
        .star-item {
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
            &.on {
                @include bg-image('star48_on');
            }
            &.half {
                @include bg-image('star48_half');
            }
            &.off {
                @include bg-image('star48_off');
            }
        }
    }
    &.star-36 {
        .star-item {
            width: 15px;
            height: 15px;
            margin-right: 6px;
            background-size: 15px 15px;
            background-repeat: no-repeat;
            &.on {
                @include bg-image('star36_on');
            }
            &.half {
                @include bg-image('star36_half');
            }
            &.off {
                @include bg-image('star36_off');
            }
        }
    }
    &.star-24 {
        .star-item {
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
            background-repeat: no-repeat;
            &.on {
                @include bg-image('star24_on');
            }
            &.half {
                @include bg-image('star24_half');
            }
            &.off {
                @include bg-image('star24_off');
            }
        }
    }
}
</style>