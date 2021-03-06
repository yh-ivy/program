<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{ seller.name }}</h1>
                <div class="desc border-1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{ seller.minPrice }}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{ seller.deliveryPrice }}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{ seller.deliveryTime }}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favourite" @click="toggleFavourite">
                    <i class="icon-favorite" :class="{'active': favourite}"></i>
                    <span class="text">{{ favoriteText }}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper border-1px">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul class="supports">
                    <li v-for="support in seller.supports" class="support-item">
                        <span class="icon" :class="classMap[support.type]"></span>
                        <span class="text">{{ support.description }}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li v-for="pic in seller.pics" class="pic-item">
                            <img :src="pic" alt="" width="120px" height="90px">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="info">
                <h1 class="title border-1px">商家信息</h1>
                <ul>
                    <li class="info-item border-1px" v-for="info in seller.infos">{{ info }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import star from 'components/star/star';
import split from 'components/split/split';
import BScroll from 'better-scroll';
import { saveToLocal, loadFromLocal } from 'common/js/store';
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            favourite: (() => {
                console.log('-----' + loadFromLocal(this.seller.id, 'favourite', false))
                return loadFromLocal(this.seller.id, 'favourite', false)
            })(),
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        }
    },
    computed: {
        favoriteText() {
            return this.favourite ? '已收藏' : '收藏';
        }
    },
    methods: {
        toggleFavourite() {
            this.favourite = !this.favourite;
            saveToLocal(this.seller.id, 'favourite', this.favourite);
        }
    },
    mounted() {
        // 页面整体滚动
        this.scroll = new BScroll(this.$refs.seller, {
            click: true
        });
        // 商家图片横向滚动
        if (this.seller.pics) {
            let picWidth = 120;
            let margin = 6;
            let width = this.seller.pics.length * (picWidth + margin) - margin;
            this.$refs.picList.style.width = width + 'px';
            this.$nextTick(() => {
                this.picScroll = new BScroll(this.$refs.picWrapper, {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                });
            })
        }
    },
    components: {
        star,
        split
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../common/scss/_mixins';
.seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        position: relative;
        padding: 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .desc {
            font-size: 0;
            padding-bottom: 18px;
            @include border-1px(rgba(7, 17, 27, .1));
            line-height: 18px;
            .star {
                display: inline-block;
                margin-right: 8px;
                vertical-align: top;
            }
            .text {
                font-size: 10px;
                margin-right: 12px;
                color: rgb(77, 85, 93);
            }
        }
        .favourite {
            position: absolute;
            right: 11px;
            top: 18px;
            text-align: center;
            .icon-favorite {
                display: block;
                font-size: 24px;
                line-height: 24px;
                color: #d4d6d9;
                margin-bottom: 4px;
                &.active {
                    color: rgb(240, 20, 20);
                }
            }
            .text {
                line-height: 10px;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
        .remark {
            display: flex;
            padding-top: 18px;
            .block {
                flex: 1;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, .1);
                &:last-child {
                    border: none;
                }
                h2 {
                    margin-bottom: 4px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .content {
                    line-height: 24px;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                    .stress {
                        font-size: 24px;
                    }
                }
            }
        }
    }
    .bulletin {
        padding: 18px 18px 0 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .content-wrapper {
            padding: 0 12px 16px 12px;
            @include border-1px(rgba(7, 17, 27, .1));
            .content {
                color: rgb(240, 20, 20);
                font-size: 12px;
                line-height: 24px;
            }
        }
        .supports {
            .support-item {
                padding: 16px 12px;
                font-size: 0;
                @include border-1px(rgba(7, 17, 27, .1));
                &:last-child {
                    @include border-none();
                }
                .icon {
                    display: inline-block;
                    vertical-align: top;
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_4');
                    }
                    &.discount {
                        @include bg-image('discount_4');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_4');
                    }
                    &.invoice {
                        @include bg-image('invoice_4');
                    }
                    &.special {
                        @include bg-image('special_4');
                    }
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
            }
        }
    }
    .pics {
        padding: 18px 0 18px 18px;
        .title {
            margin-bottom: 12px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-item {
                display: inline-block;
                margin-right: 6px;
                width: 120px;
                height: 90px;
                &:last-child {
                    margin: 0;
                }
            }
        }
    }
    .info {
        padding: 18px 18px 0 18px;
        color: rgb(7, 17, 27);
        .title {
            padding-bottom: 12px;
            line-height: 14px;
            font-size: 14px;
            @include border-1px(rgba(7, 17, 27, .1));
        }
        .info-item {
            line-height: 16px;
            font-size: 12px;
            padding: 12px 16px;
            @include border-1px(rgba(7, 17, 27, .1));
        }
    }
}
</style>


