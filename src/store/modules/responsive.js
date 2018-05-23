const state = {
    viewportWidth : null,
    viewportHeight : null
};

const mutations = {
    'SETVIEWPORTWIDTH' (state, width) {
        state.viewportWidth = width;
    },
    'SETVIEWPORTHEIGHT' (state, height) {
        state.viewportHeight = height;
    },
    'PROJECT_VIEW_ACTIVE' (state, val) {
        state.projectView = val
    }
};

const actions = {
    setVWidth({commit},width) {
        commit('SETVIEWPORTWIDTH', width);
    },
    setVHeight({commit},height) {
        commit('SETVIEWPORTHEIGHT', height);
    },
    setProjectView({commit}, val) {
        commit('PROJECT_VIEW_ACTIVE', val);
    }
};

const getters = {
    viewportWidth: state => {
        return state.viewportWidth;
    },
    viewportHeight: state => {
        return state.viewportHeight;
    },
    layoutSize: state => {
        if ( state.viewportWidth < 768 )
            return 'sml';
        else if ( state.viewportWidth >= 768 && state.viewportWidth < 980 )
            return 'med';
        else if ( state.viewportWidth >= 980 )
            return 'lrg';
        else if ( state.viewportWidth == null )
            return 'layout size not set';
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}