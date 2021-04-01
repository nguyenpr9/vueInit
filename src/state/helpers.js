import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const layoutComputed = {
  ...mapState('layout', {
    loader: (state) => state.loader,
  }),
}

export const layoutMethods = mapActions('layout', ['changeLoaderValue'])
