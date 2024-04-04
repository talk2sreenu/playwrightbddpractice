Feature: To validate the Get In Touch 

@demo
Scenario: To verify if Get In Touch details displayed
    Given I am on 'Product Store' page
    When User scroll to Get In touch section
    Then '<field>' and correct value displayed

    Examples:
    |field  |
    |Address|
    |Phone  |
    |Email  |