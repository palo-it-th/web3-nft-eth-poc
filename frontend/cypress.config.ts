import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import synpressPlugins from '@synthetixio/synpress/plugins'

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })

      synpressPlugins(on, config)

      on('file:preprocessor', bundler)
      await addCucumberPreprocessorPlugin(on, config)

      return config
    },
    specPattern: 'cypress/e2e/features/**/*.feature',
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: true,
    supportFile: 'cypress/support/e2e.ts',
  },
})
