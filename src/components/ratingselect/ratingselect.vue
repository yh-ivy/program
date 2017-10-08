<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" @click="select(2, $event)" :class="{'active' : selectType2 === 2}">{{desc.all}}
                <span class="count">{{ ratings.length }}</span>
            </span>
            <span class="block positive" @click="select(0, $event)" :class="{'active' : selectType2 === 0}">{{desc.positive}}
                <span class="count">{{ positives.length }}</span>
            </span>
            <span class="block negative" @click="select(1, $event)" :class="{'active' : selectType2 === 1}">{{desc.negative}}
                <span class="count">{{ negatives.length }}</span>
            </span>
        </div>
        <div class="switch" @click="toggleContent" :class="{'on':onlyContent2}">
            <i class="icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Bus from '../../common/js/eventBus';
const POSITIVE = 0;// 满意
const NEGATIVE = 1;// 不满意
const ALL = 2;// 全部
export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    data() {
        return {
            selectType2: this.selectType,
            onlyContent2: this.onlyContent
        }
    },
    computed: {
        positives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE;
            })
        },
        negatives() {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE;
            })
        }
    },
    methods: {
        toggleContent(event) {
            if (!event._constructed) {
                return;
            }
            this.onlyContent2 = !this.onlyContent2;
            Bus.$emit('content.toggle', this.onlyContent2);
        },
        select(type, event) {
            if (!event._constructed) {
                return;
            }
            this.selectType2 = type;
            Bus.$emit('ratingtype.select', type);
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
.ratingselect {
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        font-size: 0;
        @include border-1px(rgba(7, 17, 27, .1));
        .block {
            display: inline-block;
            padding: 8px 12px;
            color: rgb(77, 85, 93);
            margin-right: 8px;
            border-radius: 1px;
            font-size: 12px;
            line-height: 16px;
            &.active {
                color: #fff;
            }
            &.positive {
                background: rgba(0, 160, 220, 0.2);
                &.active {
                    background: rgb(0, 160, 220);
                }
            }
            &.negative {
                background: rgba(77, 85, 93, 0.2);
                &.active {
                    background: rgb(77, 85, 93);
                }
            }
            .count {
                font-size: 8px;
                margin-left: 2px;
            }
        }
    }
    .switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        color: rgb(147, 153, 159);
        font-size: 0;
        &.on {
            .icon-check_circle {
                color: #00c850;
            }
        }
        .icon-check_circle {
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            font-size: 24px;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
        }
    }
}
</style>