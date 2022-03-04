/**
 * TODO-EXO(exo-cypress)
 *
 * Dans cet exercice vous allez tester que l'on peut bien acheter un Pokemon
 * via l'interface de l'application.
 *
 * 1. Ouvrez cypress en lançant `yarn run cypress open`
 * 2. Allez la page du pokemon ivysaur `/detail/2`
 * 3. Vérifiez que le titre de la page est bien `ivysaur`
 * 4. Achetez le pokemon pour un montant de `12`.
 * 5. Vérifiez que le message `You have this pokemon!` est bien affiché
 *
 * Bonus:
 * 1. Vérifiez que la balance est bien mise à jour.
 */
describe("Page Pokemon Detail", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it.skip("buys pokemon");
});
