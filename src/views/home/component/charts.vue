<template>
  <div class="card">
    <div id="charts" class="chart" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'Charts',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById('charts'))
      console.log(myChart, 'muCharts')
      // 绘制图表

      let base = +new Date(2022, 6, 10)
      const oneDay = 24 * 3600 * 1000
      const date = []
      const data = [Math.round(Math.random() * 300)]
      for (let i = 1; i < 50; i++) {
        var now = new Date((base += oneDay))
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
        data.push(Math.round((Math.random()) * 300 + data[i - 1]))
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'left',
          text: '活跃体现'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          offset: -10,
          type: 'value',
          boundaryGap: ['0%', '100%']

        },
        series: [
          {
            name: '活跃度',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: data
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 400px;
  height: 340px;
  padding: 20px;
  margin-left: 30px;
   box-shadow: 0 3px 6px -3px rgb(0 0 0 / 10%);
    border: 1px solid #ebeef5;
    border-radius: 6px;
}
.chart {
  width: 380px;
  height: 340px;
}
</style>
