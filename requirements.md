
You are the new Front End Developer at this new shiny start-up, Acme Email. The product the company is feverishly trying to push out is a Message Processor (c). Message Processor (c) is going to be a single page web application, relying heavily on javascript and the latest web technologies (assume IE10 and up). It is going to be a very large application. Below is only a small part. The Message Processor (c) processes different type of messages. The logged in user will see how many messages are waiting to be processed (in their own personal queue) and how many messages they have processed - something like a dashboard. A list of the next 5 messages is also displayed. When the user clicks on a message in this list, the message is displayed in some type of panel. There are two types of messages:
 - Birthday Wish
 - Congrats on the birth of your child

The Birthday wish message will display:
 - Name
 - Standard Message Text - 'Mate, Happy Birthday. To celebrate this once a year occasion we have picked the following gift: [gift]. Enjoy.'

The user must select the gift the person will receive. The list of gifts doesn't change much, maybe once every two months as gift inventory changes. There are 10 set gifts to choose from and you can assume there are some specials available at “/api/specials”. They all have a title, description and image associated with them. The 'Congrats on the birth of your child' message will display:

 - Name
 - Standard Message Text - 'Whooa well done and congratulations on the birth of [babyname] on [birthdate].'

The user must selected the date of birth for the child and also what the name of the child should be. The list of names is huge, and doesn't change. Once the user fills in the required details the message is sent. It should appear on the processed list and be removed from the to do list. The artwork and some of the design is being done by Billy Bob, Acme's own design guru, which will be incorporated later on.
