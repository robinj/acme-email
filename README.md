# README #

This repository contains the source code of the single page application for ACME Email, a ficticious internet startup. This document contains instructions on how to start the app as well as documenting a little bit about my thought process when creating it.

### Setup Instructions

1. Check this project out from source control using `git clone git@bitbucket.org:janssens/acme-email.git`
1. run `npm install` to pull down all of the dependencies

To run the application: 
1. run `npm run api` to start the mock API server
1. run `npm start` to start the http server
1. Navigate to http://localhost:8000 to view the application

To run the unit tests:
1. run `npm run test` 

The results will be displayed in the console.

### Who do I talk to? ###
This application is developed and maintained by Robin Janssens. You can contact him on contact@janssens.me.uk

### Contributing
This repository is not currently accepting contributions

## Design Decisions

### Source Control
This application will be source controlled in Git. There are a number of other systems that could be used, but Git is currently the most widely used and has the most integrations with other services.

### Project Management methodology/paradigm
I am going to pretend that this project is run in an Agile way. This is because it allows an MVP, that delivers most of the business value, to be developed rapidly with additional functionality added later in decreasing order of business value. High level specifications, such as the one provided, can be broken into smaller and more manageable individually deliverable components which then aids continuous integration and deployment. 

I started this exercise by splitting the provided specification into a number of Epics and Stories. This is very important as it allows me to understand the problem and figure out if there are any missing details. It also allows me to track my progress, what has been done and what tasks are still waiting to be delivered. In a real scenario, this list would be prioritised into a regularly "groomed" backlog. The stories would then be estimated and enter a sprint duing a planning session. 

In reality, these stories would be agreed with the product owner rather than just abstracted from a document and then put straight onto a Kanban. Since interaction with the product owner is limited, I am going to focus on the "What?" rather than the "Why?" in these stories.  

#### Message Card Epic
As a user, I would like to be able to send a message.

Stories:
- As a user, I would like to be able to send a "Birthday Wish" message so that (bla bla bla this would, in reality, be agreed with the product owner)
	- Name
	- Standard message text - should be "Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy."
- As a user, I would like to be able to send a "Congratulations on the birth of your child" message 
    - Name
    - Standard message text - should be "'Whooa well done and congratulations on the birth of [babyname] on [birthdate]."
- As a user, I would like to be able to select a baby name from a list
    - The list is static and will never change 
- As a user, I would like to be able to select a date of birth from a dropdown 

#### Dashboard Epic
As a user, I would like to see my messages on a dashboard

Stories:
- As a logged in user I would like to see how many messages are waiting to be processed 
- As a logged in user I would like to see how many messages have been processed
- As a logged in user I would like to see the next five messages
    - **Question**: does this mean the next five messages that are waiting to be processed?  

#### Gift Epic
As a user, I would like to be able to send a gift

Stories:
- As a user, I would like to be able to send a gift with the following attributes:
    - Title 
    - Description
    - Image
- As a user, I would like to be able to send a gift with a birthday message
- As a user, I would like to be able to send a gift from the standard inventory
    - When sending a message, the user can send a gift from a list
    - **Information**: gift inventory changes approximately every 2 months
- As a user, I would like to be able to send a gift from the specials inventory
    - specials are available from the /api/specials endpoint

### Design

#### User Experience
Since we are waiting on Bob's UX, I have created a rough approximation of the user flow. I am going to exploit the AngularJS framework to create re-usable components which can easily be "re-wired" into whatever beautiful design he eventually delivers.

I have chosen to use the material design framework as it provides a nubmer of well-tested UI components which conform with the latest trends in design. 

#### Technologies 
 - Angular 1.5
    - Angular Material 
 - Node
    - json-server 

#### Reusable components
Where possible, I have made components reusable. For example, the list of cards which contain images and details about gifts could easily be used to display something else such as a list of friends. Because of this, I created it as a reusable directive called image-card. 

I attend all design meetings for BA Single Page Applications and like to invite the developers to print off any UX artefacts and draw circles around anything that looks like it could be reusable. If it's reusable across the application then it goes in a components directory and if it could be used by other products it goes in a separate bower module. 

#### Backend Design
Since this is a frontend exercise, I have used a NodeJS module called _json-server_ to mock the backend. No backend contract has been provided so I have taken the liberty of assuming what the endpoints will be. I have also had to imagine what data may be held in the backend. Normally, I would either work directly on the backend myself or work closely with whoever is delivering the backend to remove this guessswork.

Routes: 
 - _/names_ - all potential names that can be assigned to babies
 - _/gifts_ - the gift inventory
 - _/specials_ - special gifts. This is separate as the spec implies that the endpoint will be different
 - _/messages/inbox_ - messages that need to be sent
 - _/messages/sent_ - messages that have been sent

### Further development
In the name of expediency, I have only really used basic build tooling (the ones that come free with angular-seed). This means that the application and its assets are not minified which is likely to lead to slower performance, particularly on mobiles. There are a number of uglification and minification tools which could be integrated into a gulp/npm task pipeline to do this.
 
I have also not considered how this will be deployed. That job could probably be perfomed by the CI environment (for control) or another npm task.

Internationalisation is a very common non-functional requirement for any app that will have a more global audience. In a more real-life application, I would have used a module such as angular-translate. Then, instead of hard-coding English into the markup, I would put resource keys through a translation filter.

The app look alright for an MVP but is not the most beautiful thing in the world. When Bob eventually delivers his UX, it should be fairly easy to incorporate into what's been delivered so far with the addition of a bit of CSS. 

Ideally, any reasonable sized app would come with automated e2e tests using Protractor. 