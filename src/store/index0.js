import { createStore, storeKey } from 'vuex'

export default createStore({
  state: {
    name: '44',
    List: [
      {
        title:'吃饭',
        complent: true
      },
      {
        title:'碎觉',
        complent: false
      },
      {
        title:'撸代码',
        complent: false
      },
      {
        title:'。。。。',
        complent: false
      },
    ]
  },
  mutations: {
    // setList(state, payload){
    //   state.List.name = payload
    // }
    addList (state, payload) {
      state.List.push(payload)
    },
    delListItem (state, payload) {
      state.List.splice(payload, 1)
    },
    clearListRed ( state, payload ) {
      state.List = payload
    }
  },
  actions: {
    asyncSetList(store, params){
      store.commit('setList', params)
    }
  },
  modules: {
  }
})
