describe("Authenticatio", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("user can sign in", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Sign in").click();
    cy.contains("Email").should("be.visible");

    cy.get('[name="email"]').type("admin@test.com");
    cy.get('[name="password"]').type("admin");

    cy.get('[form="sign-in-modal"]').click();
  });
});
