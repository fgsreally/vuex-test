import {
    inject,
    reactive
} from 'vue';
let storeKey = 'store'
let memoizeSync = {}
class Store {
    constructor(options) {
        console.log(options)
        this.vm = reactive(options.state)
        // modules解构
        if (options.modules) {
            for (let key in options.modules) {
                this.vm[key] = reactive(options.modules[key].state)
                options.getters = Object.assign(options.modules[key].getters, options.getters)
                options.mutations = Object.assign(options.modules[key].mutations, options.mutations)
                options.actions = Object.assign(options.modules[key].actions, options.actions)
            }
        }
        console.log(options)
        let getters = options.getters
        this.getters = {}
        if(getters){Object.keys(getters).forEach(item => {
            Object.defineProperty(this.getters, item, {
                get: () => {
                    return getters[item](this.state)
                }
            })
        })}
        
        let mutations = options.mutations
        console.log(mutations)
        this.mutations = {}
        if(mutations){
            Object.keys(mutations).forEach(key => {
            //这里还应该有个检验的，要保证是个函数
            this.mutations[key] = (data) => {
                mutations[key](this.state, data)
            }
        })}
        let actions = options.actions
        this.actions = {}
        if(actions){Object.keys(actions).forEach((key, value) => {
            this.actions[key] = (data) => {
                value(this.state, data)
            }
        })}



    }
    commit = (key, data, option) => {
        if (option && memoizeSync[key] == data) {
            return
        }
        memoizeSync[key] = data

        this.mutations[key](data)
    }
    dispatch = (key, data) => {
        this.actions[key](data)
    }
    install(app, key) {
        //vue2兼容,严格来讲是兼容$写法
        app.config.globalProperties.$store = this
        app.provide(key || storeKey, this)
    }
    get state() {
        return this.vm
    }

}
export function createStore(options) { //创建一个store
    return new Store(options)
}
export function useStore(key = null) { //在使用的组件中得到一个store
    return inject(key !== null ? key : storeKey)
}