import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import synpressPlugins from '@synthetixio/synpress/plugins'
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      })

      synpressPlugins(on, config)

      on('file:preprocessor', bundler)
      // Sets up metamask with network and private key supplied by .env.local file
      on('before:run', details => {
        cy.setupMetamask()
      })
      await addCucumberPreprocessorPlugin(on, config)

      return config
    },
    specPattern: 'cypress/e2e/features/**/*.feature',
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    chromeWebSecurity: true,
    video: true,
    screenshotOnRunFailure: true,
  },
})
