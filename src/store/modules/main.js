const state = {
    projects: null,
    dataLoaded: false,
    homeImagesLoaded: false,
    projectImagesLoaded: false,
    introViewed: false,
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
    'HOME_IMAGES_LOADED'(state) {
        state.homeImagesLoaded = true;
    },
    'PROJECT_IMAGES_LOADED'(state) {
        state.projectImagesLoaded = true;
    },
    'SET_CURRENT'(state, index) {
        state.currentProject = state.projects[index];
        state.currentIndex = index;
    },
    'INTRO_VIEWED'(state) {
        state.introViewed = true;
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
    introViewed({ commit }) {
        commit('INTRO_VIEWED');
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
    homeImagesLoaded: state => {
        return state.homeImagesLoaded;
    },
    introViewed: state => {
        return state.introViewed;
    },
    projectImagesLoaded: state => {
        return state.projectImagesLoaded;
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
