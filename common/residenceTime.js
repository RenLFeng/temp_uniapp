let enterTime = '';
let outTime = '';
let stayTime = '';
let loadStartTime = '';

function isInViewPortOfOne(el) {
  // viewPortHeight 兼容所有浏览器写法
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const offsetTop = el.offsetTop
  const scrollTop = document.documentElement.scrollTop
  const top = offsetTop - scrollTop
  console.log('top', top)
  // 这里有个+100是为了提前加载+ 100
  return top <= viewPortHeight + 100
}
import {
  captcha
} from '@/api/user.js'
export default {
  data() {
    return {

    };
  },

  onLoad() {
    console.log('页面type onLoad', this.pagetype);
    loadStartTime = new Date();
  },
  onShow() {
    // 用户进入时间
    enterTime = new Date();
    console.log('用户进入时间 onShow', enterTime);
  },
  onHide() {
    // 用户退出时间
    outTime = new Date();
    // 停留时间(毫秒)
    stayTime = outTime.getTime() - enterTime.getTime();
    let curRoute = this.$mp.page.route;
    console.log('页面隐藏' + curRoute + ':' + stayTime);
    this.$store.commit('SET_PAGE_EVENT', {
      key: 'PageViewTime',
      value: stayTime
    })
    // captcha().then(res => {
    //   localStorage.setItem('test', res.id)
    // });

  },
  onPageScroll(e) {
    // console.log(e);
    const query = uni.createSelectorQuery().in(this);
    query.selectAll('.imgitem').boundingClientRect(data => {
      // console.log('data', data);
      // console.log("得到布局位置信息" + JSON.stringify(data));
      // console.log("节点离页面顶部的距离为" + data.top);
      let temp = [];
      for (let v of data) {
        if (v.top >= 0) {
          temp.push({
            id: v.id,
            top: v.top
          })
        } else {
          let top = Math.abs(v.top);
          let hei = v.height;
          let diffH = hei / 4;
          if (top < diffH) {
            temp.push({
              id: v.id,
              top: top
            })
          }
        }
      }
      // console.log('temp', temp[0])
    }).exec();
    //第一种情况 向上滑动 滑过顶部到不可见区域 ：元素距顶部距离+元素本身高度 <= 0
    //第二种情况 向下滑动 滑过底部到不可见区域：元素距顶部距离 >  屏幕可视高度
    // uni.getSystemInfoSync().windowHeight
    // this.$u.getRect('.user-avatar').then(rect => {
    // 							console.log(rect);
    // 						})

    // var that = this;
    // if (!that.$u.test.isEmpty(that.video)) {
    //   this.$u.getRect('.' + that.video.id).then(rect => {
    //     // console.log("元素距离"+JSON.stringify(rect));
    //     if (rect.top <= 0) {
    //       //第一种情况 向上滑动 滑过顶部到不可见区域
    //       console.log("向上滑动false");
    //       that.video.pause();
    //     } else if (rect.top > this.windowHeight) {
    //       //第二种情况 向下滑动 滑过底部到不可见区域
    //       console.log("向下滑动false");
    //       that.video.pause();
    //     } else {
    //       //可见区域
    //       console.log("true");
    //     }
    //   })
    // }
  },
  onUnload() {
    // 用户退出时间
    outTime = new Date();
    //停留时间(毫秒)
    stayTime = outTime.getTime() - enterTime.getTime();
    let curRoute = this.$mp.page.route;
    console.log('页面卸载' + curRoute + ':' + stayTime);
  },
  mounted() {
    console.log('页面>> mounted', );
    let curTime = new Date();
    let diffLoadTime = curTime.getTime() - loadStartTime.getTime();
    this.$store.commit('SET_PAGE_EVENT', {
      key: 'pageLoadTime',
      value: diffLoadTime
    })
  },
  beforeDestroy() {

  },

};
