const state = {
  last_scroll_pos: 0
}

const mutations = {
  'SCROLLED'(state, newPos) {
    state.last_scroll_pos = newPos;
  }
}

const actions = {
  onScrolled: ({commit}, newPos) => {
    commit('SCROLLED', newPos);
  }
}

const getters = {
  scrollPos(state) {
    return state.last_scroll_pos;
  } 
}

export default {
    state,
    mutations,
    actions,
    getters
}