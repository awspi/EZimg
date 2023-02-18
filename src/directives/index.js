
/**
 * !自动全局注册指令
 * *import.meta.globEager
 */
export default {
  install(app) {
    const directives = import.meta.glob('./modules/*.js', { eager: true })
    console.log(directives)
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      const name = arr[arr.length - 1].replace('.js', '')
      app.directive(name, value.default)
    }
  }
}
