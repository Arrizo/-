<template>
  <div class="dashboard-container">
    <div class="dashboard-form">
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-date-picker
            v-model="month"
            type="month"
            placeholder="选择月"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryTime()">查询</el-button>
          <el-button type="primary" @click="getCurrentTime()">当前日期</el-button>
          <el-button type="primary" @click="resetTime()">重置</el-button>
        </el-form-item>
        <div>
          <el-row :gutter="10">
            <el-col :span="12">
              <div id="map" class="map" />
            </el-col>
            <el-col :span="12">
              <div class="account-class">年检总数<span class="total">{{ totalForm.total }}</span>
              </div>
              <div id="successDiv" style="background-color: #00B83F" class="account-class">
                年检通过数<span class="total">{{ totalForm.success }}</span>
              </div>
              <div id="rectificationDiv" style="background-color: #FFB951" class="account-class">
                年检已整改数<span id="rectification" class="total">{{ totalForm.rectification }}</span>
              </div>
              <div id="failDiv" style="background-color:#a52a2a" class="account-class">
                年检不通过数<span id="fail" class="total">{{ totalForm.fail }}</span>
              </div>
              <div id="chart" class="map" />
            </el-col>

          </el-row>
        </div>
      </el-form>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import json from '@/plugins/provinceCity/henan.json'
import { getInspectTotal, getInitMap, getInitBar } from '@/api/inspect/Inspect-analysis'
import { formatTime } from '@/utils/validate'
import echarts from 'echarts'
export default {
  name: 'Dashboard',
  data() {
    return {
      totalCount: 0,
      form: {
        inspectStartTime: '',
        inspectEndTime: ''
      },
      month: '',
      totalForm: {
        fail: '',
        rectification: '',
        success: '',
        total: ''
      }

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getTotal()
    this.initMap()
    this.initBar()
  },
  methods: {
    getTotal(obj) {
      getInspectTotal(obj).then(res => {
        if (res.code === 0) {
          this.totalForm = res.result
        } else {
          this.$$alert(res.msg)
        }
      })
    },
    getCurrentTime() {
      var currentTime = new Date()
      this.month = formatTime(currentTime, 0)
      console.log(this.month)
    },
    initMap(obj) {
      getInitMap(obj).then(res => {
        if (res.code === 0) {
          var mapTotal, mapFail, mapSuccess, mapRectification
          mapTotal = res.result.total // 总数
          mapFail = res.result.fail // 不通过数
          mapSuccess = res.result.success // 通过数
          mapRectification = res.result.rectification // 已整改数
          var myMap = echarts.init(document.getElementById('map'))
          // getProvinceJson(json => {
          echarts.registerMap('henan', json)
          myMap.setOption({
            title: {
              text: '年检统计报表'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b}<br/>{c} '
            },
            legend: {
              orient: 'vertical',
              x: 'right',
              data: ['年检总数', '不通过数', '通过数', '已整改数'],
              // 设置为单选模式
              selectedMode: 'single'
            },
            visualMap: {
              min: 0,
              max: 100000,
              text: ['高', '低'],
              realtime: false,
              calculable: true
            },
            scaleLimit: { min: 1, max: 3 },
            series: [{
              name: '年检总数',
              type: 'map',
              map: 'henan',
              aspectScale: 1,
              layoutCenter: ['30%', '30%'],
              selectedMode: 'single',
              itemStyle: {
                normal: {
                  label: { show: true }
                },
                emphasis: {
                  label: { show: true }
                }
              },
              data: mapTotal
            },
            {
              name: '不通过数',
              type: 'map',
              map: 'henan',
              selectedMode: 'single',
              itemStyle: {
                normal: {
                  label: { show: true }
                },
                emphasis: {
                  label: { show: true }
                }
              },
              data: mapFail
            },
            {
              name: '通过数',
              type: 'map',
              map: 'henan',
              selectedMode: 'single',
              itemStyle: {
                normal: {
                  label: { show: true }
                },
                emphasis: {
                  label: { show: true }
                }
              },
              data: mapSuccess
            }, {
              name: '已整改数',
              type: 'map',
              map: 'henan',
              selectedMode: 'single',
              itemStyle: {
                normal: {
                  label: { show: true }
                },
                emphasis: {
                  label: { show: true }
                }
              },
              data: mapRectification
            }
            ]
          })
        }
      })
    },
    initBar(obj) {
      getInitBar(obj).then(res => {
        if (res.code === 0) {
          var citys, barTotal, barFail, barSuccess, barRectification
          citys = res.result.citys // 横坐标 城市
          barTotal = res.result.total // 总数
          barFail = res.result.fail // 不通过数
          barSuccess = res.result.success // 通过数
          barRectification = res.result.rectification // 已整改数

          var myChart = echarts.init(document.getElementById('chart'))
          var option = {
            color: ['#1E9FFF', '#00B83F', '#FFB951', '#a52a2a'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
            },
            legend: {
              data: ['年检总数', '通过数', '已整改数', '不通过数']
            },
            xAxis: [{
              type: 'category',
              axisTick: { show: false },
              'axisLabel': { 'interval': 0 },
              // data: ["合肥市","亳州市","淮北市","宿州市","阜阳市","淮南市","蚌埠市","六安市","滁州市","安庆市","马鞍山市","芜湖市","铜陵市","池州市","宣城市","黄山市"],
              data: citys,
              axisPointer: {
                type: 'shadow'
              },
              // eslint-disable-next-line no-dupe-keys
              axisLabel: {
                rotate: 0 // 设置X轴文字旋转
              }
            }],
            yAxis: [{
              type: 'value',
              name: '数量',
              axisLabel: {
                formatter: '{value}'
              }
            }],
            series: [{
              name: '年检总数',
              type: 'bar',
              data: barTotal
            },
            {
              name: '通过数',
              type: 'bar',
              data: barSuccess
            },
            {
              name: '已整改数',
              type: 'bar',
              data: barRectification
            },
            {
              name: '不通过数',
              type: 'bar',
              data: barFail
            }
            ]
          }
          myChart.setOption(option)
        }
      })
    },
    queryTime() {
      if (this.month) {
        var endTiem = new Date(this.month)
        this.form.inspectStartTime = this.month
        var fullEndMonth = new Date(endTiem.getFullYear(), endTiem.getMonth() + 1, 0)
        this.form.inspectEndTime = formatTime(fullEndMonth)
        this.getTotal(this.form)
        this.initMap(this.form)
        this.initBar(this.form)
      } else {
        this.getTotal()
        this.initMap()
        this.initBar()
      }
    },
    resetTime() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.month = ''
      this.getTotal()
      this.initMap()
      this.initBar()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
    .account-class {
            width: 170px;
            height: 90px;
            background-color: #00C0F7;
            text-align: center;
            vertical-align: middle;
            line-height: 44px;
            margin-left: 4px;
            color: white;
            font-size: 12px;
            display: inline-block;
            box-shadow: 3px 4px 0.5px -2px gray;
        }

        .total {
            display: block;
            line-height: 40px;
            font-size: 20px;
        }
        .map{
          height: 650px;
          width: 100%;
        }
</style>
