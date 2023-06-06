@demo
Feature: The Internet Guinea Pig Website

  Scenario Outline: As a user, I can log into the secure area
    Given I am on the login page
    When I login to the application with <userType>
    Then I should see a flash message saying <message>

    Examples:
      | userType                 | message                        |
      | valid_user_credentials   | You logged into a secure area! |
      | invalid_user_credentials | Your username is invalid!      |
