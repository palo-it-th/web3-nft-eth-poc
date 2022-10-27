Feature: Landing page

    Testing landing page features

    Background:
        Given I navigate to the website

    Scenario: I should be able to connect to my Metamask account and see information about the account and the Palo NFT
        Given I am on metamask account number 1
        When I click on 'connect-to-wallet-button'
        And I accept metamask access
        Then I should not see 'connect-to-wallet-button'
        And I should see 'disconnect-from-wallet-button'
        And I should see 'account-information'
        And The displayed account should be the current metamask account
        And I should see 'nft-symbol' with value 'PNFT'

    Scenario: All account information should disappear when I click on disconnect button
        Given I am connected with metamask account number 1
        And I see 'account-information'
        When I click on 'disconnect-from-wallet-button'
        Then I should not see 'account-information'


    Scenario: I should be able to mint Palo nft
        Given I am connected with metamask account number 1
        And The nft balance is 0
        And The number of nfts displayed is 0
        When I mint a new nft
        Then The nft balance should be 1
        And The number of nfts displayed should be 1
