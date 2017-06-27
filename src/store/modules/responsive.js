const state = {
    viewPortWidth : null
};

const mutations = {
    'SETVIEWPORTWIDTH' (state, width) {
        state.viewPortWidth = width;
    }
};

const actions = {
    setVWidth({commit},width) {
        commit('SETVIEWPORTWIDTH', width);
    }
};

const getters = {
    viewportWidth: state => {
        return state.viewPortWidth;
    },
    layoutSize: state => {
        if ( state.viewPortWidth < 768 )
            return 'sml';
        else if ( state.viewPortWidth >= 768 && state.viewPortWidth < 980 )
            return 'med';
        else if ( state.viewPortWidth >= 980 )
            return 'lrg';
        else if ( state.viewPortWidth == null )
            return 'layout size not set';
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}