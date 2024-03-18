@a11y
Feature: Accessibility testing feature

	Scenario: Verify Accessibility issues for Login page
		Given I am on the login page
		Then I should be able to verify Accessibility issues

	Scenario Outline: As a user, I can log into the secure area
    Given I am on the login page
    When I login to the application with <userType>
    Then I should be able to verify Accessibility issues

    Examples:
      | userType                 | message                        |
      | valid_user_credentials   | You logged into a secure area! |
      | invalid_user_credentials | Your username is invalid!      |