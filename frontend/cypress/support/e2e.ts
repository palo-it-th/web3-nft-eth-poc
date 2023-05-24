// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '@synthetixio/synpress/support'
import './commands'
// Alternatively you can use CommonJS syntax:
// require('./commands')
before(() => {
  // cy
  //   .setupMetamask
  // 'test, test, test, test, test, test, test, test, test, test, test, junk',
  // {
  //   networkName: 'localhost',
  //   rpcUrl: 'http://127.0.0.1:8545',
  //   chainId: 1337,
  //   symbol: 'ETH',
  //   isTestnet: false,
  // },
  // 'testpassword',
  // ()
  // cy.resetMetamaskAccount()
  cy.changeMetamaskNetwork('localhost')
})

beforeEach(() => {
  cy.disconnectMetamaskWalletFromAllDapps()
})
