export const state = {
  loader: false,
}

export const mutations = {
  LOADER(state, loader) {
    state.loader = loader
  },
}

export const actions = {
  changeLoaderValue({ commit }, { loader }) {
    commit('LOADER', loader)
  },
}
