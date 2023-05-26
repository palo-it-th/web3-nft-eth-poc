import { Given } from '@badeball/cypress-cucumber-preprocessor'

Given('I navigate to the website', () => {
  cy.visit('/')
})

Given('I see {string}', dataTestId => {
  cy.get(`[data-testid=${dataTestId}]`).should('be.visible')
})

Given('I am on metamask account number {int}', (accountNumber: number) => {
  cy.switchMetamaskAccount(accountNumber)
})

Given(
  'I am connected with metamask account number {int}',
  (accountNumber: number) => {
    cy.switchMetamaskAccount(accountNumber)
    cy.get(`[data-testid="connect-to-wallet-button"]`).click()
    cy.acceptMetamaskAccess()
  },
)
