import Mock from 'mockjs'
Mock.mock('/mock/category', (options) => {
  return {
    success: true,
    code: 200,
    data: {
      categorys: [
        {
          id: 'web_app_icon',
          name: 'UI/UX',
          col: 1,
          urlname: 'web_app_icon'
        }
      ]
    },
    message: 'success'
  }
})
