/// <reference types="cypress" />

context('create-cli-application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should display correct content', () => {
    cy.get('body').should('contain.text', 'create-cli-application');
    cy.get('body').should(
      'contain.text',
      'A bootstrapper for creating a cli application with Node.',
    );
    cy.get('body').should('contain.text', '15.6kb gzipped');
    cy.get('body').should('contain.text', 'View Documentation');
  });

  it('Should step through demo', () => {
    cy.get('#create-application').click();
    cy.wait(10000);
    cy.get('#start-application').click();
    cy.wait(10000);
    cy.get('#view-documentation').should('exist');
  });
});
