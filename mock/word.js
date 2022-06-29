const Mock = require('mockjs')

const data = Mock.mock({
  'items|50': [{
    id: '@id', // id
    name: '@cname()',
    value: '@integer(10, 3000)' // 群成员数量
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/words',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          list: items
        }
      }
    }
  }
]
