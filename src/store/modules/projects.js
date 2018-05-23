const state = {
    projects: null,
    dataLoaded: false,
    intro: true,
    featuredImages: [],
    currentProject: {},
    currentIndex: -1
};

const mutations = {
    'SET_PROJECTS'(state, data) {
        state.projects = data;
        state.dataLoaded = true;
    },
    'SET_FEATURED'(state, data) {
        let imgs = [];
        for (let i = 0; i < data.length; i++) {
            imgs.push(data[i].featured_image);
        }
        state.featuredImages = imgs;
    },
    'SET_CURRENT'(state, index) {
        state.currentProject = state.projects[index];
        state.currentIndex = index;
    },
    'INTRO_DONE'(state) {
        state.intro = false;
    }
};

const actions = {
    setProjects({ commit }, data) {
        commit('SET_PROJECTS', data);
        commit('SET_FEATURED', data);
    },
    setCurrent({ commit }, selectedIndex) {
        commit('SET_CURRENT', selectedIndex);
    },
    setIntroDone({ commit }) {
        commit('INTRO_DONE');
    }
};

const getters = {
    projects: state => {
        return state.projects;
    },
    featuredImages: state => {
        return state.featuredImages;
    },
    currentProject: state => {
        return state.currentProject;
    },
    dataLoaded: state => {
        return state.dataLoaded;
    },
    isIntro: state => {
        return state.intro;
    },
    currentIndex: state => {
        return state.currentIndex;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
