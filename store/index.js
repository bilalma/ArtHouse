
import Vuex from 'vuex'



const state  = { 
    user: null
}

const store = new Vuex.Store({
    state,
    getters:{
        user: (state) => {
            return state.user
        }
    },
    actions:{
        user(context, user){
           context.commit('user', user);
           // first arg is mutation method second is value 
        }
    },
    mutations:{
        user(state, user){
            state.user = user;
        }
    },
})

export default(store);