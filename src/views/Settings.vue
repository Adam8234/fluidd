<template>
  <v-row :dense="$vuetify.breakpoint.smAndDown" justify="center">
    <v-col cols="12" lg="8">
      <router-view v-if="authenticated && socketConnected" />
      <div v-if="$route.matched.length === 1">
        <general-settings></general-settings>
        <theme-settings></theme-settings>
        <auth-settings v-if="supportsAuth"></auth-settings>
        <macro-categories></macro-categories>
        <cameras></cameras>
        <toolhead-settings></toolhead-settings>
        <temperature-preset-settings></temperature-preset-settings>
        <gcode-preview-settings></gcode-preview-settings>
        <version-settings v-if="supportsVersions"></version-settings>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import StateMixin from '@/mixins/state'

import MacroCategories from '@/components/settings/macros/MacroCategories.vue'
import GeneralSettings from '@/components/settings/GeneralSettings.vue'
import TemperaturePresetSettings from '@/components/settings/TemperaturePresetSettings.vue'
import Cameras from '@/components/settings/cameras/Cameras.vue'
import ToolheadSettings from '@/components/settings/ToolheadSettings.vue'
import ThemeSettings from '@/components/settings/ThemeSettings.vue'
import VersionSettings from '@/components/settings/VersionSettings.vue'
import GcodePreviewSettings from '@/components/settings/GcodePreviewSettings.vue'
import AuthSettings from '@/components/settings/auth/AuthSettings.vue'

@Component({
  components: {
    MacroCategories,
    GeneralSettings,
    TemperaturePresetSettings,
    Cameras,
    ToolheadSettings,
    ThemeSettings,
    VersionSettings,
    GcodePreviewSettings,
    AuthSettings
  }
})
export default class Settings extends Mixins(StateMixin) {
  get supportsVersions () {
    return this.$store.getters['server/componentSupport']('update_manager')
  }

  get supportsAuth () {
    return this.$store.getters['server/componentSupport']('authorization')
  }
}
</script>
