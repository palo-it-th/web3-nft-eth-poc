Feature: Landing page

    Testing landing page features

    Background:
        Given I navigate to the website

    Scenario: I should be able to connect to my Metamask account and see information about the account and the Palo NFT
        Given I am on metamask account number 2
        When I click on 'connect-to-wallet-button'
        And I accept metamask access
        Then I should not see 'connect-to-wallet-button'
        And I should see 'connected-wallet-button'
        And I should see 'account-address'
        And The displayed account should be the current metamask account

    Scenario: All account information should disappear when I click on disconnect button
        Given I am connected with metamask account number 2
        And I see 'connected-wallet-button'
        And I see 'account-address'
        When I click on 'connected-wallet-button'
        And I click on 'disconnect-from-wallet-button'
        Then I should not see 'connected-wallet-button'
        And I should not see 'account-address'

    Scenario: I should be able to mint Palo nft
        Given I am connected with metamask account number 2
        When I mint a new nft
        Then I should see 'nft-card-0'

