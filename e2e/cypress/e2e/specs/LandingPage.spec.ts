import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-file-upload";
import { ellipsisAccount } from "../utils/accountUtils";

Then("The displayed account should be the current metamask account", () => {
  cy.getMetamaskWalletAddress().then((currentAddress) => {
    cy.get('[data-testid="account-address"]').contains(
      ellipsisAccount(currentAddress),
      {
        matchCase: false,
      }
    );
  });
});

Given("The nft balance is {int}", (balance) => {
  cy.get('[data-testid="nft-balance"]').should("have.text", balance);
});

Given("The number of nfts displayed is {int}", (nftsNumber) => {
  cy.get('[data-testid*="nftImage-"]').should("have.length", nftsNumber);
});

When("I mint a new nft", () => {
  cy.get('[data-testid="mint-nft"]').click();
  cy.get('[data-testid="nft-name"]').type("Image name");
  cy.get("input[type=file]").attachFile("images/monkey1.jpg", {
    subjectType: "drag-n-drop",
  });
  cy.get('[data-testid="confirm-mint-nft"]').click();
  cy.confirmMetamaskTransaction();
});

Then("The nft balance should be {int}", (balance) => {
  cy.get('[data-testid="nft-balance"]').should("have.text", balance);
});

Then("The number of nfts displayed should be {int}", (nftsNumber) => {
  cy.get('[data-testid*="nftImage-"]').should("have.length", nftsNumber);
});
