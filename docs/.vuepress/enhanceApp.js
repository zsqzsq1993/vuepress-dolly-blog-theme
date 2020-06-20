/**
 * 扩展 VuePress 应用
 */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './public/fonts/iconfont.css'
// import locale from 'element-ui/lib/locale/lang/en';

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    // isServer
}) => {
    // ...做一些其他的应用级别的优化
    // if (!isServer) {
    //     import('element-ui').then(elementUI => {
    //         Vue.use(elementUI.default, { locale })
    //     })
    // }
    Vue.use(Element)
}
