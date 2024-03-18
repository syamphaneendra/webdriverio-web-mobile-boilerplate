@visual @applitools
Feature: Visual Validation

	Scenario: Verify Visual Validation for Login page
		Given I am on the login page
		Then I see the GUI of the page as expected

	Scenario Outline: As a user, I can log into the secure area
    Given I am on the login page
    When I login to the application with <userType>
    Then I see the GUI of the page as expected

    Examples:
      | userType                 | message                        |
      | valid_user_credentials   | You logged into a secure area! |
      | invalid_user_credentials | Your username is invalid!      |