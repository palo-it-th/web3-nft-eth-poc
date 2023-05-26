import { When } from '@badeball/cypress-cucumber-preprocessor'

When('I accept metamask access', () => {
  cy.acceptMetamaskAccess()
})

When('I switch to metamask account number {int}', (accountNumber: number) => {
  cy.switchMetamaskAccount(accountNumber)
})

When('I click on {string}', dataTestId => {
  cy.get(`[data-testid=${dataTestId}]`).click()
})
