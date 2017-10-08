<template>
  <div class="header">
    <div class="content-wrap">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}</div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-content" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrap clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div v-if="seller.supports" class="supports">
              <div v-for="support in seller.supports" class="support-item">
                <span class="icon" :class="classMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </div>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">{{seller.bulletin}}</div>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="hideDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import star from 'components/star/star';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
  components: {
    star
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
.header {
  color: #fff;
  position: relative;
  overflow: hidden;
  .content-wrap {
    position: relative;
    padding: 24px 12px 18px 24px;
    background: rgba(7, 17, 27, .5);
    /* font-size: 0; */
    .avatar {
      display: inline-block;
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          @include bg-image('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
          vertical-align: top;
        }
        .name {
          margin-left: 12px;
          font-size: 16px;
          font-weight: bold;
          line-height: 18px;
        }
      }
      .description {
        font-size: 12px;
        line-height: 12px;
        margin-bottom: 10px;
      }
      .supports {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          &.decrease {
            @include bg-image('decrease_1');
          }
          &.discount {
            @include bg-image('discount_1');
          }
          &.guarantee {
            @include bg-image('guarantee_1');
          }
          &.invoice {
            @include bg-image('invoice_1');
          }
          &.special {
            @include bg-image('special_1');
          }
        }
        .text {
          font-size: 10px;
          line-height: 12p;
        }
      }
    }
    .support-content {
      position: absolute;
      bottom: 14px;
      right: 12px;
      background-color: rgba(0, 0, 0, 0.2);
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      text-align: center;
      padding: 0 8px;
      .count {
        vertical-align: top;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  .background {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
  .bulletin-wrap {
    position: relative;
    height: 28px;
    line-height: 28px;
    background: rgba(7, 17, 27, .7);
    padding: 0 22px 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      @include bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      right: 12px;
      top: 8px;
    }
  }
  .detail {
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: auto;
    transition: all .5s;
    background: rgba(7, 17, 27, .8);
    backdrop-filter: blur(10px); /*ios 模糊背景*/
    &.fade-enter-active,&.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter,&.fade-leave{
      opacity: 0
    }
    .detail-wrap {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          width: 100%;
          font-size: 16px;
          line-height: 16px;
          text-align: center;
        }
        .star-wrapper {
          width: 100%;
          margin-top: 16px;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px;
          .text {
            margin: 0 12px;
            font-size: 14px;
          }
          .line {
            position: relative;
            flex: 1;
            top: -6px;
            border-bottom: 1px solid rgba(225, 225, 255, .2);
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          padding: 0 12px;
          .support-item {
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              background-repeat: no-repeat;
              background-size: 16px 16px;
              margin-right: 6px;
              &.decrease {
                @include bg-image('decrease_2');
              }
              &.discount {
                @include bg-image('discount_2');
              }
              &.guarantee {
                @include bg-image('guarantee_2');
              }
              &.invoice {
                @include bg-image('invoice_2');
              }
              &.special {
                @include bg-image('special_2');
              }
            }
            .text {
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      font-size: 32px;
      clear: both;
    }
  }
}
</style>
