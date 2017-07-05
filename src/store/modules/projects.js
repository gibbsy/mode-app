import Vue from 'vue';

const state = {
    projects: null,
    isLoaded: false,
    intro: true,
    featuredImages: [],
    currentProject: {}
};

const mutations = {
    'SET_WORK' (state, data) {
        state.projects = data;
        state.isLoaded = true;
    },
    'SET_FEATURED' (state, data) {
        let arr = [];
        for (let i=0; i<data.length; i++) {
            arr.push( data[i].featured_image );
        }
        console.log(arr);
        state.featuredImages = arr;
    },
    'SET_CURRENT' (state, index) {
        state.currentProject = state.projects[index];
    },
    'INTRO_DONE' (state) {
        state.intro = false;
    }
};

const actions = {
    loadData({commit}) {
         Vue.http.get('projects?per_page=30')
        .then(response => response.json())
        .then(data => {
            //any data transformations here
            //console.log(data[0].custom_fields.project_content[0].embedded_media.vimeo_embed);
             commit('SET_WORK', data);
             commit('SET_FEATURED', data);
        });
    },
    setCurrent({commit},selectedIndex) {
        commit('SET_CURRENT', selectedIndex);
    },
     setIntroDone({commit}) {
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
    isLoaded: state => {
        return state.isLoaded;
    },
    isIntro: state => {
        return state.intro;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
