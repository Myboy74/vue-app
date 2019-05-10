<template>
    <!--<div>访客信息记录</div>-->
  <div>
    <my-header title="访客信息" />
    <van-tabs v-model="tabIndex" color="#1890ff" title-active-color="#1890ff" @change="tabFu" style="padding-top:0">
      <van-tab v-for="(item, index) in tabGroup" :key="index" :title="item.title">
        <form action="/">
          <van-search placeholder="请输入查询条件" show-action
            v-model="value" @search="onSearch" @cancel="onCancel" @clear="onCancel"/>
        </form>
        <van-list v-model="loading" :finished="finished"
          finished-text="没有更多了" @load="onLoad">
         <ul class="ul-visitor" v-show="noVisitorlist.length">
          <li v-for="(val,ind) in noVisitorlist" :key="ind" @click="visitDetail(val)">
            <p class="font17" v-if="val.name">{{val.name}}</p>
            <p class="font17" v-else><em>暂无添加访客姓名</em></p>
            <p class="font14">{{val.info}}</p>
            <p class="font12">到访: {{val.forecastVisitStTimeStr ? val.forecastVisitStTimeStr : '未填写'}} ~ {{val.forecastVisitEdTimeStr ? val.forecastVisitEdTimeStr : '未填写'}}</p>
          </li>
        </ul>
        </van-list>
        <div v-if="!noVisitorlist.length" style="text-align:center;padding: 10px 0">暂无数据</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Search, List } from 'vant'
import { getVisitor } from '@/http/ower/ower'
import myHeader from '@/components/header'
// import { isDate } from 'util';
export default {
  name: 'serveVisitorInfo',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Search.name]: Search,
    [List.name]: List,
    myHeader
  },
  data () {
    return {
      tabIndex: '0', // tab切换
      tabGroup: [
        {
          title: '未访问'
        },
        {
          title: '已访问'
        }
      ],
      value: '', // 搜索值
      noVisitorlist: [], // 列表数据
      loading: false, // 分页加载
      finished: false, // 是否加载完成
      page: '0', // 分页页数默认第一页
      count: '0' //  分页总页数

    }
  },
  methods: {
    auto (ind, val) {
      let params = {
        filters: {
          accessState: ind,
          visitorName: val
        },
        page: this.page
      }
      getVisitor(params).then((res) => {
        if (res.data.code === 10000) {
          this.loading = false // 加载结束
          let date = res.data.data.result
          date.forEach((item, index) => {
            this.noVisitorlist.push({
              visitorInviteId: item.visitorInviteId,
              forecastVisitStTimeStr: item.forecastVisitStTimeStr,
              forecastVisitEdTimeStr: item.forecastVisitEdTimeStr
            })
            this.noVisitorlist[index].name = ''
            let big = item.hscPopulationVisitorGroupingDto
            if (big.length) {
              big.forEach((ele, ind) => {
                let sum = ele.hscPopulationVisitorGroupingAccessDtos
                if (sum.length) {
                  sum.forEach(val => {
                    this.noVisitorlist[index].name += val.visitorName + ','
                  })
                }
              })
            } else {
              this.noVisitorlist[index].name = ''
            }
            switch (item.visitorReason) {
              case 0:
                this.noVisitorlist[index].info = '其他'
                break
              case 1:
                this.noVisitorlist[index].info = '拜访'
                break
              case 2:
                this.noVisitorlist[index].info = '面试'
                break
              case 3:
                this.noVisitorlist[index].info = '快递'
                break
              case 4:
                this.noVisitorlist[index].info = '外卖'
                break
              default:
                this.noVisitorlist[index].info = '未填写事由'
            }
          })
          this.page = res.data.data.pageNumber
          this.count = res.data.data.pageCount
        } else {
          // toast.message = '请求失败'
          // Toast.clear()
        }
      })
    },
    tabFu (ind, title) { // tab切换事件
      this.tabIndex = ind
      this.noVisitorlist = []
      this.auto(ind, '')
    },
    onSearch (val) {
      this.value = val
      this.noVisitorlist = []
      this.page = '0'
      this.count = '0'
      this.auto(this.tabIndex, val)
    },
    visitDetail (val) { // 进入详情页面
      this.$router.push({
        name: 'serveVisitorDetail',
        query: {
          id: val.visitorInviteId
        }
      })
    },
    onCancel () { // 搜索框的取消
      this.value = ''
    },
    onLoad () {
      if (this.page === '0' || this.page < this.count) {
        this.page++
        this.auto(this.tabIndex, this.value)
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ul-visitor{
  overflow:hidden;
  padding:5px;
  li{
    margin-bottom: 10px;
    padding:8px;
    border-radius: 5px;
    box-shadow:1px 4px 13px 1px rgba(101, 101, 101, 0.2);
    p{
      line-height:24px;
      margin:0;
    }
  }
}
  .title-active-color{
    color: #2483d5;
  }
  .font17{
    overflow: hidden;
    font-size: 17px;
    color: #333;
    word-spacing: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .font14{ font-size: 14px;color: #888;}
  .font12{ font-size: 12px;color: #333;}
</style>
