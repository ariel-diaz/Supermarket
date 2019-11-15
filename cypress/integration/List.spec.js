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

  it('Add item and delete it', function() {
    cy.addItem('Product One')
      .get('body')
      .should('contain', 'Product One')
      .get('.Container-list-item-btn')
      .click()
      .get('body')
      .should('not.contain', 'Product One');
  });

  it('Add item and check in localstorage', function() {
    cy.addItem('Product One')
      .get('body')
      .should('contain', 'Product One');

    cy.window().then(win => {
      const list = win.localStorage.getItem('list');
      expect(list).include('Product One');
    });
  });
});
