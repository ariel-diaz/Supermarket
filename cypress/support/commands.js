Cypress.Commands.add('addItem', title => {
  cy.get('.Button.FULL')
    .click()
    .get('[data-cy=input-item]')
    .type(title)
    .get('.ModalAddItem-wrapper > .PRIMARY')
    .click();
});
