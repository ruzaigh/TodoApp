
describe("My First Test", () => {
  it.only("Login Test", () => {
    cy.visit("http://localhost:4200");
    cy.get('form.ng-untouched > :nth-child(1)').type('ruz@momint.so');
    cy.get('.ng-pristine > .native-input').type('111111');
    cy.get('form.ng-dirty > .button').click();
    cy.get('ion-menu-toggle.md > .md').click();
    cy.get('.ion-activatable').click();
  })
})
