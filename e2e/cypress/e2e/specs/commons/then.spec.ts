import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('I should see {string}', dataTestId => {
  cy.get(`[data-testid=${dataTestId}]`).should('be.visible')
})

Then('I should not see {string}', dataTestId => {
  cy.get(`[data-testid=${dataTestId}]`).should('not.exist')
})

Then('I should see {string} with value {string}', (dataTestId, value) => {
  cy.get(`[data-testid=${dataTestId}]`)
    .should('be.visible')
    .should('have.text', value)
})
