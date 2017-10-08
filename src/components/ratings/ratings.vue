<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent" @select="select"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
                        <div class="avatar">
                            <img :src="rating.avatar" alt="" width="28" height="28">
                        </div>
                        <div class="content">
                            <div class="username">{{rating.username}}</div>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text" v-show="rating.text">{{rating.text}}</p>
                            <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                                <span :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                                <span class="item" v-for="recommend in rating.recommend">{{recommend}}</span>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import { formatDate } from '../../common/js/date';
import Bus from '../../common/js/eventBus';
const ERR_OK = 0;
const ALL = 2;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            onlyContent: false,
            selectType: ALL
        }
    },
    created() {
        this.$http.get('/api/ratings').then((res) => {
            res = res.body;
            if (res.errno === ERR_OK) {
                this.ratings = res.data;
                this.$nextTick(() => {
                    this.scroll = new BScroll(this.$refs.ratings, {
                        click: true
                    })
                    console.log(this.scroll)
                })
            }
        });
        // 获取子组件的selectType的更新
        Bus.$on('ratingtype.select', selectType => {
            this.selectType = selectType;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        });

        Bus.$on('content.toggle', onlyContent => {
            this.onlyContent = onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        });
    },
    components: {
        star,
        split,
        ratingselect
    },
    methods: {
        needShow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            console.log(this.selectType === ALL)
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        select(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        toggleContent(onlyContent) {
            this.onlyContent = onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/scss/_mixins';
.ratings {
    position: fixed;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        display: flex;
        padding: 18px 0;
        .overview-left {
            flex: 0 0 137px;
            width: 137px;
            padding: 6px 0;
            border-right: 1px solid rgba(7, 17, 27, .1);
            text-align: center;
            .score {
                font-size: 24px;
                color: rgb(225, 153, 0);
                line-height: 28px;
                margin-bottom: 6px;
            }
            .title {
                font-size: 12px;
                color: rgb(7, 17, 27);
                line-height: 12px;
                margin-bottom: 8px;
            }
            .rank {
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }
        .overview-right {
            flex: 1;
            padding: 0 24px;
            .score-wrapper {
                margin-bottom: 8px;
                .title {
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    line-height: 18px;
                }
                .star {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0 12px;
                }
                .score {
                    font-size: 12px;
                    color: rgb(225, 153, 0);
                    line-height: 18px;
                }
            }
            .delivery-wrapper {
                .title {
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    line-height: 18px;
                }
                .delivery {
                    margin-left: 12px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    line-height: 18px;
                }
            }
        }
    }
    .rating-wrapper {
        padding: 0 18px;
        .rating-item {
            padding: 18px 0;
            display: flex;
            @include border-1px(rgba(7, 17, 27, .1));
            .avatar {
                flex: 0 0 28px;
                width: 28px;
                height: 28px;
                margin-right: 12px;
                img {
                    border-radius: 50%;
                }
            }
            .content {
                position: relative;
                flex: 1;
                .username {
                    font-size: 10px;
                    line-height: 12px;
                    color: rgb(7, 17, 27);
                    margin-bottom: 4px;
                }
                .star-wrapper {
                    .star {
                        display: inline-block;
                        margin-right: 6px;
                        margin-bottom: 6px;
                        vertical-align: top;
                    }
                    .delivery {
                        color: rgb(147, 153, 159);
                        font-size: 10px;
                        line-height: 12px;
                        vertical-align: top;
                    }
                }
                .text {
                    font-size: 12px;
                    line-height: 18px;
                    color: rgb(7, 17, 27);
                }
                .recommend {
                    line-height: 16px;
                    .icon,
                    .item {
                        display: inline-block;
                        line-height: 16px;
                        margin-right: 8px;
                    }
                    .icon {
                        font-size: 12px;
                        &.icon-thumb_up {
                            color: rgb(0, 160, 220);
                        }
                        &.icon-thumb_down {
                            color: rgb(183, 187, 191);
                        }
                    }
                    .item {
                        padding: 0 6px;
                        border: 1px solid rgba(7, 17, 27, .1);
                        color: rgb(147, 153, 159);
                        border-radius: 1px;
                        background: #fff;
                        font-size: 9px;
                    }
                }
                .time {
                    position: absolute;
                    top: 18px;
                    right: 0;
                    font-size: 10px;
                    line-height: 12px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
}
</style>