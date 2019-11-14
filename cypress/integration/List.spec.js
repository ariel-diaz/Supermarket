describe('Supermarket list', function() {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add item', function() {
    cy.addItem('Product one')
      .get('[data-cy=label-items]')
      .should('contain', '1 ITEM')
      .get('body')
      .should('contain', 'Product one');
  });

  it('Add two items', function() {
    cy.addItem('Product Two')
      .addItem('Product One')
      .get('[data-cy=label-items]')
      .should('contain', '1 ITEM')
      .get('body')
      .should('contain', 'Product One')
      .should('contain', 'Product Two');
  });
});
