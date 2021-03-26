import Vue from 'vue'
import { MutationTree } from 'vuex'
import { defaultState } from './'
import { Macro, MacrosState } from './types'

export const mutations: MutationTree<MacrosState> = {
  /**
   * Reset state
   */
  setReset (state) {
    Object.assign(state, defaultState())
  },

  // Sets macro state from db
  initMacros (state, payload: MacrosState) {
    if (payload) Object.assign(state, payload)
  },

  // Updates a singular macro
  setUpdateMacro (state, macro: Macro) {
    const i = state.stored.findIndex(m => m.name === macro.name)
    if (i < 0) {
      state.stored.push(macro)
    } else {
      Vue.set(state.stored, i, macro)
    }
  },

  setUpdateAllVisible (state, payload: { macros: Macro[]; visible: boolean}) {
    payload.macros.forEach((macro: Macro) => { macro.visible = payload.visible })
    Vue.set(state, 'stored', payload.macros)
  }
}
