<template>
  <div class="card">
    <div id="chartWordCloud" class="chart" />
  </div>
</template>
<script>
import request from '@/utils/request'
import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'Words',
  data() {
    return {
      demo: require('./demo.png'),
      list: [
        {
          'name': '男子',
          'rank': 1.0,
          'heat': 1552222,
          'count': 1
        },
        {
          'name': '直播间',
          'rank': 1.0,
          'heat': 1552222,
          'count': 1
        },
        {
          'name': '捡漏',
          'rank': 1.0,
          'heat': 1552222,
          'count': 1
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      request({
        url: '/vue-admin-template/words',
        method: 'get'
      }).then(res => {
        console.log(res, 'res')
        this.list = res.data.list
        const data = this.list.map(val => ({
          ...val

        }))
        const chart = echarts.init(document.getElementById('chartWordCloud'))
        console.log(data, 'data')

        var option = {
          title: {
            text: '热门词汇'
          },
          series: [{
            type: 'wordCloud',
            sizeRange: [5, 24],
            rotationRange: [-45, 90],
            gridSize: 0,
            shape: 'circle',
            maskImage: maskImage,
            drawOutOfBound: true,
            width: '100%',
            height: '100%',
            top: '-40px',
            left: '-60px',
            keepAspect: false,
            textStyle: {
              fontWeight: 'bold',
              color: function() {
                return 'rgb(' + [
                  Math.round(Math.random() * 200) + 50,
                  Math.round(Math.random() * 50),
                  Math.round(Math.random() * 50) + 50
                ].join(',') + ')'
              }
            },
            emphasis: {
              textStyle: {
                color: '#528'
              }
            },
            data: data.sort(function(a, b) {
              return b.value - a.value
            })
          }]
        }
        const maskImage = new Image()
        // maskImage.onload = function() {
        //   option.series[0].maskImage
        //   console.log('111')
        // }
        chart.setOption(option)

        maskImage.src = this.demo
      })
    },
    randomColor() {
      return 'rgb(' + [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255)
      ].join(',') + ')'
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 320px;
  height: 340px;
  padding: 20px;
   box-shadow: 0 3px 6px -3px rgb(0 0 0 / 10%);
    border: 1px solid #ebeef5;
    border-radius: 6px;
}
.chart {
  width: 400px;
  height: 400px;
}
</style>
