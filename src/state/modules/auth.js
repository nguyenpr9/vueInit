import { AuthService } from '@services/auth.service'
export const state = {
  currentUser: getSavedState('auth.currentUser'),
  token: getSavedState('auth.token'),
  expToken: getSavedState('auth.expToken'),
  refreshToken: getSavedState('auth.refreshToken'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
  },
  SET_TOKEN(state, newValue) {
    state.token = newValue
    saveState('auth.token', newValue)
  },
  SET_EXP_TOKEN(state, newValue) {
    state.expToken = newValue
    saveState('auth.expToken', newValue)
  },
  SET_REFRESH_TOKEN(state, status) {
    if (!['', 'true'].includes(status)) {
      throw new Error(
        `setRefreshToken: invalid value ${status}; Expect one of ['', 'true']`
      )
    }
    state.refreshToken = status
    saveState('auth.refreshToken', status)
  },
}

export const getters = {
  loggedIn(state) {
    return !!state.currentUser
  },
  hasRefreshToken(state) {
    return Boolean(state.refreshToken)
  },
  isTokenExp(state) {
    const tokenExp = state.expToken - 100
    const nowTime = Math.floor(new Date().getTime() / 1000)
    return tokenExp <= nowTime
  },
}

export const actions = {
  logIn({ commit }, { username, password } = {}) {
    return AuthService.makeLogin({ username, password }).then((response) => {
      const token = response.data.jwt
      commit('SET_TOKEN', token)
      commit('SET_EXP_TOKEN', _parseTokenData(token).exp)
      commit('SET_REFRESH_TOKEN', 'true')
      return response
    })
  },

  logOut({ commit }) {
    return AuthService.makeLogout().then((response) => {
      commit('SET_TOKEN', null)
      commit('SET_EXP_TOKEN', null)
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_CURRENT_USER', null)
      return response
    })
  },

  refreshTokens({ commit }) {
    return AuthService.refreshTokens()
      .then((response) => {
        const token = response.data.jwt
        commit('SET_TOKEN', token)
        commit('SET_EXP_TOKEN', _parseTokenData(token).exp)
        commit('SET_REFRESH_TOKEN', 'true')
        return response
      })
      .catch(() => {
        commit('SET_TOKEN', null)
        commit('SET_EXP_TOKEN', null)
        commit('SET_REFRESH_TOKEN', '')
      })
  },

  setMe({ commit }) {
    return AuthService.getMe().then((response) => {
      const user = response.data
      commit('SET_CURRENT_USER', user)
      return response
    })
  },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state))
}

function _parseTokenData(accessToken) {
  let payload = ''
  let tokenData = {}

  try {
    payload = accessToken.split('.')[1]
    tokenData = JSON.parse(atob(payload))
  } catch (error) {
    throw new Error(error)
  }
  return tokenData
}
