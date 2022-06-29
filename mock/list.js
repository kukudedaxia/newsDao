const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id', // id
    name: '@string(5, 15)', // 群名称
    'status|1': ['owner', 'administrator', 'masses'], // 身份
    number: '@integer(50, 500)', // 群成员数量
    robot: {
      name: '@string(3, 10)', // 机器人
      img: 'https://img.bee-cdn.com/orj360/3b9ae236lz1h39650jalvj20n00n07wh.jpg'
    },
    'channel|5-10': [{
      'name|1': ['gameFi', 'Defi', 'NFT', 'Oraz', 'POS', 'POW', 'Layer']
    }]
  }],
  total: '@integer(500, 1500)'
})

module.exports = [
  {
    url: '/vue-admin-template/order/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: data.total,
          items: items
        }
      }
    }
  }
]
