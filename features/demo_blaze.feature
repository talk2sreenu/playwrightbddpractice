Feature: Playwright Demo Tests

    Feature Description: To run demo tests with playwright library

    @demo
    Scenario: Verify Product home page
        Given I am on 'Product Store' page
        When I click categories link
        Then I see 'Phones', 'Laptops' and 'Monitors' under categories

    @demo
    Scenario Outline: Verify relevant products are displayed
        Given I am on 'Product Store' page
        When I choose '<category>'
        Then I see '<product>' in display
        
        Examples:
        |category|product|
        |Phones     |Samsung galaxy s6  |
        |Laptops    |Sony vaio i5       |
        |Monitors   |Apple monitor 24   |
