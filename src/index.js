import './assets/common.sass'

function changeTitle () {
  const html = '<div>看到我，说明工程正常启动</div><button onclick="handleClick()">发个请求吧</button>'
  window.$('#app').html(html)
}

setTimeout(function () {
  changeTitle()
}, 10)