Feature: Create an application by logging in user else create a user

    @CreateApplication
    Scenario: Validate create application for Kaleidoscope process by creating user if required
        Given User navigated to scholarship landing page
        And user clicks on Login button
        And user enters EMAIL in email id field
        And user clicks on Next page button
        Then verify if user is already created else create a user
        And verify if user is registered
        And validate if First name, Last name and Email address are auto populated
        And user enters address details
        Then user clicks on Next button
        Then user verifies if 2 extracurricular activities are required
        And user enters 2 extracurricular activities
        Then user clicks on Next button
        And user enters high school information
        And user uploads transcript
        And user clicks on Next button
        When user validates essay checkbox functionality
        And user selects "Animals" checkbox and enter essay
        And user selects "School" checkbox and enter essay
        And user clicks on Next button
        Then validate if user is landed on review page
        And user validates values in review page
        When user clicks on Submit application button
        Then validate if application is submitted
        And click on view application button
        Then verify if user is not able to edit application