Feature: Register a new user

    @RegisterUser
    Scenario Outline: Validate the functionality of Register new user
        Given User navigated to scholarship landing page
        And user clicks on Login button
        And user enters "<EMAIL_ID>" in email id field
        And user clicks on Next button
        And user enter basic details
        And user clicked on age confirmation checkbox
        And user clicks on submit button
        Then verify if user is registered

        Examples:
            | EMAIL_ID   | FIRST_NAME | LAST_NAME | COUNTRY_CODE | MOBILE_NO | PASSWORD      |
            | autotest   | Auto_First | Auto_Last | +91          | 979969969 | Test@Pass9909 |