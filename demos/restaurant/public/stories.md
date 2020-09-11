# Restaurant Bot dataset

Restaurant Bot is a chatbot taking orders for meals.

A meal is composed of a starter, a main dish and a dessert.
Furthermore, you have a point system where you pay a fixed price of 8$ giving you 6 points you can spread across your meal.

There is several option for starter :

* salad (-1 pt)
* quiche (-2 pt)
* boiled eggs (-1 pt)

for main dish :

* pizza (-5 pt)
* omelet (-4 pt)

for dessert :

* chocolate muffin (-1 pt)
* sundae (-2 pt)

You can buy additional points for 1$/point.

The bot takes orders and can use a set of commands :

* giveMenu

* askStarter
* askMain
* askDessert

* orderStarter
* orderMain
* orderDessert

* noStarter
* noMain
* noDessert

* removeStarter
* removeMain
* removeDessert

* orderStarter
* orderMain
* orderDessert

* unknown
* askMorePoints
* morePoints
* finalise


## wisty.stories

### Happy path dialog

A simple dialog starts like this :

"Hey I'm your Restaurant Assistant, let's order today's meal !"

> I will take a salad with a pizza
- orderStarter
- orderMain
- askDessert

"Alright, a salad. Alright, a pizza"

"Do you want a dessert ?"

> a muffin please
- askMorePoints

"You have not enough points left, do you want to pay 1$ more to add this item ?"

> ok fine
- morePoints
- orderDessert
- finalise

"Alright, a muffin"

"So your command is #0039 with a salad, a pizza and a muffin for a total of 9$. Payment will take place at the reception desk when your number will be called."

### 2

> what do you have ?
- giveMenu

> nothing in starter, but I will take an omelet
- noStarter
- orderMain
- askDessert

> hum what about a sundae
- orderDessert
- finalise

### 3

> i'd like a quiche, a pizza and a muffin with chocolate
- orderStarter
- askMorePoints

> remove the quiche and take the muffin instead
- removeStarter
- orderMain
- orderDessert
- askStarter

> no
- noStarter
- finalise

### 4

> hey what is your menu ?
- giveMenu

> hum i want a salad
- orderStarter
- askMain

> an omelet
- orderMain
- askDessert

> with a muffin please
- orderDessert
- finalise

### 5

> a sundae
- orderDessert
- askStarter

> no thanks
- noStarter
- askMain

> a pizza
- askMorePoints

> yes i want that pizza
- morePoints
- orderMain
- finalise

### 6

> hey
- giveMenu

> i want a muffin
- orderDessert
- askStarter

> nothing
- noStarter
- askMain

> an omelette
- orderMain
- finalise

### 7

> i want a salad
- orderStarter
- askMain

> a pizza
- orderMain
- askDessert

> nothing
- noDessert
- finalise

### 8

> an omelet and a sundae
- orderMain
- orderDessert
- askStarter

> a salad
- askMorePoints

> no thanks
- askStarter

> replace my sundae with a muffin and take the starter
- orderDessert
- orderStarter
- finalise

### 9

> could i take an ice cream
- orderDessert
- askStarter

> some lettuce
- orderStarter
- askMain

> a pizza please
- askMorePoints

> sure
- morePoints
- orderMain
- finalise

### 10

> good morning
- giveMenu

> i will take a sundaee
- orderDessert
- askStarter

> with a pizza
- askMorePoints

> no problem
- morePoints
- orderMain
- askStarter

> i don't want anything
- noStarter
- finalise

### 11

> i'd take a salad and an ice-cream
- orderStarter
- orderDessert
- askMain

> nothing
- noMain
- finalise

> remove the salad
- removeStarter
- askStarter

> nothing, just add an omelet instead
- noStarter
- orderMain
- finalise

### 12

> i want a salad
- orderStarter
- askMain

> i will take a pizza
- orderMain
- askDessert

> no, remove the salad please
- removeStarter
- askStarter

> nothing else
- noStarter
- askDessert

> a muffin
- orderDessert
- finalise

### 13

> i will take some eggs
- orderStarter
- askMain

> pasta please
- unknown
- giveMenu
- askMain

> a pizza
- orderMain
- askDessert

> a muffin
- askMorePoints

> remove the eggs instead
- removeStarter
- orderDessert
- askStarter

> no thanks
- noStarter
- finalise

### 14

> hello
- giveMenu

> i want some salad and a pizza
- orderStarter
- orderMain
- askDessert

> a sundae
- askMorePoints

> oh remove the lettuce and take the sunday instead
- removeStarter
- askMorePoints

> ok
- morePoints
- orderDessert
- askStarter

> none
- noStarter
- finalise

### 15

> hey
- giveMenu

> a pizza
- orderMain
- askStarter

> with some eggs
- orderStarter
- askDessert

> just a sundae
- askMorePoints

> why not
- morePoints
- orderDessert
- finalise

### 16

> i want a muffin
- orderDessert
- askStarter

> nothing
- noStarter
- askMain

> a pizza
- orderMain
- finalise

> i wanted eggs too
- askMorePoints

> yes
- morePoints
- orderStarter
- finalise

### 17

> can i have a muffin and an omelet
- orderDessert
- orderMain
- askStarter

> no
- noStarter
- finalise

> add a salad sir
- orderStarter
- finalise

> remove the muffin
- removeDessert
- askDessert

> hum nothing sir
- noDessert
- finalise

### 18

> i want lettuce and a sundae
- orderStarter
- orderDessert
- askMain

> i don't know
- giveMenu

> humm nothing
- noMain
- finalise

> no, no... A pizza !
- askMorePoints

> remove the dessert and take it without more points
- removeDessert
- orderMain
- askDessert

> nothing, i guess
- noDessert
- finalise

### 19

> i'd take a pizza
- orderMain
- askStarter

> what do you offer ?
- giveMenu

> some eggs and a muffin
- orderStarter
- askMorePoints

> remove the eggs instead
- removeStarter
- orderDessert
- askStarter

> some tapas
- unknown
- askStarter

> nothing else
- finalise

### 20

> I want a pie
- unknown
- giveMenu

> I will just take a muffin
- orderDessert
- askStarter

> nothing
- noStarter
- askMain

> really, nothing
- noMain
- finalise

### 21

> hey
- giveMenu

> I will take a salad
- orderStarter
- askMain

> do you have some sandwich ?
- unknown
- askMain

> an omelet please
- orderMain
- askDessert

> nothing more
- noDessert
- finalise

### 22

> i want a pizza
- orderMain
- askStarter

> lettuce
- orderStarter
- askDessert

> what do you have to offer
- giveMenu

> i will take some muffin
- askMorePoints

> ok
- morePoints
- orderDessert

### 23

> i will take a pizza, salad, and an apple
- orderStarter
- orderMain
- askDessert

> an apple i said
- unknown
- giveMenu
- askDessert

> oh too bad, nothing more thank you
- noDessert
- finalise

### 24 GIVE THE MENU

> Hey
- giveMenu

> ok a salad
- orderStarter
- askMain

> what do you have for the main dish ?
- giveMenu

> a Napolitan Pizza
- orderMain
- askDessert

> what are your dessert
- giveMenu

> some yogurt
- unknown
- askDessert

> a muffin instead
- askMorePoints

> no cancel that
- noDessert
- finalise

### 25

> i want a tomatoe
- unknown
- giveMenu

> i want a salad
- orderStarter
- askMain

> pineapple
- unknown
- askMain

> pizza
- orderMain
- askDessert

> Sunday
- askMorePoints

> no
- askDessert

> nothing
- noDessert
- finalise

### 26

> i want a salad
- orderStarter
- askMain

> muffin
- orderDessert
- askMain

> pizza
- askMorePoints

> yes
- morePoints
- orderMain
- finalise

### 27

> hey i want a salad
- orderStarter
- askMain

> what do you offer ?
- giveMenu

> i will take you a pizza
- orderMain
- askDessert

Voice recognition fail
> nephew
- unknown
- askDessert

> muffin
- askMorePoints

> sure
- morePoints
- orderDessert
- finalise

### 28

> i want eggs and omelet
- orderStarter
- orderMain
- askDessert

> nothing
- noDessert
- finalise

> no an ice cream
- askMorePoints

> yes
- morePoints
- orderDessert
- finalise

### 29

> order quiche and a muffin
- orderStarter
- orderDessert
- askMain

> no main course
- noMain
- finalise

> finally, i do want a pizza
- removeMain
- askMorePoints

> no
- askMain

> no cancel this, just the quiche and the muffin
- noMain
- finalise

### 30

> i want an omelet with some eggs and a muffin
- orderStarter
- orderMain
- orderDessert
- finalise

### 31

> i want a quiche with a pizza and a sundae
- orderStarter
- askMorePoints

> yes
- morePoints
- orderMain
- orderDessert
- finalise

### 32

> can you order a salad and a pizza
- orderStarter
- orderMain
- askDessert

> a muffin
- askForPoints

> no remove the salad and take the muffin instead
- removeStarter
- orderDessert
- askStarter

> no starter please
- noStarter
- finalise

> replace the muffin by a sundae
- askMorePoints

> yes
- morePoints
- orderDessert
- finalise

### 33

> i want a quiche
- orderStarter
- askMain

> a muffin
- orderDessert
- askMain

> nothing
- noMain
- finalise

> no finally take a pizza
- askMorePoints

> remove the quiche, i will eat the pizza instead
- removeStarter
- orderMain
- askStarter

> nothing
- noStarter
- finalise

### 34

> i want a pizza, a muffin and a salad
- orderStarter
- orderMain
- askMorePoints

> yep
- morePoints
- orderDessert
- finalise

> no take a sundae finally
- askMorePoints

> yes
- morePoints
- orderDessert
- finalise

### 35

> i want a salad
- orderStarter
- askMain

> and a sundae
- orderDessert
- askMain

> pizza
- askMorePoints

> remove the ice cream and take the pizza
- removeDessert
- orderMain
- askDessert

> no dessert
- noDessert
- finalise

### 36

> i want : salad, omelet and no dessert
- orderStarter
- orderMain
- noDessert

> remove the salad
- removeStarter
- askStarter

> remove the main course
- removeMain
- askStarter

> a quiche
- orderStarter
- askMain

> a pizza
- askMorePoints

> no remove the quiche
- removeStarter
- orderMain
- askStarter

> nothing
- noStarter
- finalise

### 37

> hey i want a sundae, a salad and an omelet
- orderStarter
- orderMain
- askMorePoints

> yes
- morePoints
- orderDessert
- finalise

> remove the omelet and take a pizza
- askMorePoints

> no problems
- morePoints
- orderMain
- finalise

### 38

> hello
- giveMenu

> i want a salad, sunday, pizza
- orderStarter
- orderMain
- askMorePoints

> yep
- morePoints
- orderDessert
- finalise

> replace the salad by some boiled eggs
- orderStarter
- finalise

> replace the dessert by a muffin
- orderDessert
- finalise

> replace the pizza by an omelet
- orderMain
- finalise

### 39 

> i will take eggs, an omelet and a muffin
- orderStarter
- orderMain
- orderDessert
- finalise

> replace the omelet by a pizza and the eggs by a salad
- orderStarter
- askMorePoints

> sure
- orderMain
- finalise

> remove the pizza
- removeMain
- askMain

> nothing
- noMain
- finalise

### 40

> hello i want a sundae
- orderDessert
- askStarter

> some salad
- orderStarter
- askMain

> a pizza
- askMorePoints

> no remove the salad then take the pizza
- removeStarter
- askMorePoints

> sure
- morePoints
- orderMain
- askStarter

> salad
- orderStarter
- finalise

> can you remove the salad and the pizza
- removeStarter
- removeMain
- askStarter

> a muffin
- orderDessert
- askStarter

> eggs
- orderStarter
- askMain

> an omelet
- orderMain
- finalise

> remove the eggs
- removeStarter
- askStarter

> i don't want a starter
- noStarter
- finalise

> take a pizza
- orderMain
- finalise

### 41

> i'd like some lettuce, an omelet and a sundae
- orderStarter
- orderMain
- askMorePoints

> affirmative
- morePoints
- orderDessert
- finalise

### 42

> hey what's on your menu
- giveMenu

> i do want a quiche, a pizza and a muffin
- orderStarter
- askMorePoints

> go
- morePoints
- orderMain
- orderDessert
- finalise

### 43

> i want a salad
- orderStarter

> and a pizza with a sundae
- orderMain
- askMorePoints

> yes
- morePoints
- orderDessert
- finalise

### 44

> i want a bagel
- unknown
- giveMenu

> oh, a pizza instead
- orderMain
- askStarter

> salad
- orderStarter
- askDessert

> a milkshake
- unknown
- askDessert

> a muffin
- askMorePoints

> no cancel
- askDessert

> nothing nothing
- noDessert
- finalise

### 45

> hey
- giveMenu

> you don't have fish ?
- unknown

> take an omelet...
- orderMain
- askStarter

> nothing for starter
- noStarter
- askDessert

> what do you have ?
- giveMenu

> a muffin
- orderDessert
- finalise

### 46

> i want a salad, some tomatoes and a muffin
- orderStarter
- orderDessert
- askMain

> tomatoes
- unknown
- giveMenu
- askMain

> a pizza
- askMorePoints

> i agree
- morePoints
- orderMain
- finalise

### 47

> howdy
- giveMenu

> quiche
- orderStarter
- askMain

> remove the hamburger
- unknown
- askMain

> i will take an omelet
- orderMain
- askDessert

> no thanks
- noDessert
- finalise

> order a pizza
- askMorePoints

> ok
- morePoints
- orderMain
- finalise

### 48

> hey i want a sundae on its caramel
- orderDessert
- askStarter

> remove the pizza
- askStarter

> a salad sorry
- orderStarter
- askMain

> an omelet
- askMorePoints

> sure
- morePoints
- orderMain
- finalise

### 49

> hello, what is on your menu
- giveMenu

> what ? omelet please
- orderMain
- askStarter

> no, just the main course and a dessert
- noStarter
- askDessert

> delete the muffin
- askDessert

> ice cream
- orderDessert
- finalise

### 50

> hey i want eggs and a neapolitan
- orderStarter
- orderMain
- askDessert

> replace the pizza by an omelet
- orderMain
- askDessert

> a muffin
- orderDessert
- finalise

### 51

> i will have a muffin and some boiled eggs
- orderStarter
- orderDessert
- askMain

> replace the eggs by a quiche and take a neapolitan
- orderStarter
- askMorePoints

> alright
- morePoints
- orderMain
- finalise

### 52

> i do want some potatoes
- unknown
- giveMenu

> take a pizza and lettuce
- orderStarter
- orderMain
- askDessert

> no, but replace the pizza by an omelet
- noDessert
- orderMain
- finalise

### 53

> hey bro
- giveMenu

> a quiche bro
- orderStarter
- askMain

> replace my quiche by a pizza
- removeStarter
- orderMain
- askStarter

> a salad
- orderStarter
- askDessert

> pomme
- unknown
- askDessert

> no
- noDessert
- finalise

### 54

> i want eggs and pizzas
- orderStarter
- orderMain
- askDessert

> remove the pizza take a sundae
- removeMain
- orderDessert
- askMain

> an omelet
- askMorePoints

> remove the sundae take the omelet
- removeDessert
- orderMain
- askDessert

> a muffin
- orderDessert
- finalise

> replace the eggs by a pizza
- removeStarter
- orderMain
- askStarter

> nothing
- noStarter
- finalise

### 55

> hey awesome
- giveMenu

> a salad
- orderStarter
- askMain

> replace my salad by a potatoe
- unknown
- askMain

> replace my salad by a quiche
- orderStarter
- askMain

> pizza
- askMorePoints

> why not
- morePoints
- orderMain
- askDessert

> a salad
- orderStarter
- askDessert

> replace the salad by a muffin
- removeStarter
- orderDessert
- askStarter

> none
- noStarter
- finalise

### 56

> i want a quiche, a pizza, and a sundae
- orderStarter
- askMorePoints

> sure
- morePoints
- orderMain
- orderDessert
- finalise

> what's on your offering ?
- giveMenu

> remove everything
- removeStarter
- removeMain
- removeDessert
- askStarter

> a salad
- orderStarter
- askMain

> a muffin
- orderDessert
- askMain

> delete the salad, take a pizza instead
- removeStarter
- orderMain
- askStarter

> i don't want any
- noStarter
- finalise

### 57

> hey i want a pizza
- orderMain
- askStarter

> remove the pizza
- removeMain
- askStarter

> quiche
- orderStarter
- askMain

> omelet
- orderMain
- askDessert

> remove that omelet
- removeMain
- askMain

> none
- noMain
- askDessert

### 58

> wow i want an apple
- unknown
- giveMenu

> a pineapple maybe
- unknown
- askStarter

> salad
- orderStarter
- askMain

> pizza
- orderMain
- askDessert

> muffin
- askMorePoints

> remove the salad
- removeStarter
- orderDessert
- askStarter

> exchange the muffin with eggs
- removeDessert
- orderStarter
- askDessert

> sundae
- askMorePoints

> don't
- askDessert

> muffin
- askMorePoints

> do
- morePoints
- orderDessert
- finalise

> oh no, remove the dessert
- removeDessert
- askDessert

> none
- noDessert
- finalise

### 59 User Testing

> hey
- giveMenu

> i will take eggs and a salad
- orderStarter
- askMain

> can i have the eggs instead of the salad please
- orderStarter
- askMain

> i'll take an omelet because I love eggs
- orderMain
- askDessert

> it's muffin time
- orderDessert
- finalise

> thank you

### 60 User Testing

Very uncooperative user wanting products not offered on the menu just to annoy the bot ;)

> i want kebab
- unknown
- giveMenu

> i want a kebab anyway
- unknown

> a kebab !!
- unknown
- askStarter

> no
- noStarter
- askMain

> A pizza
- orderMain
- askDessert

> a sundae
- askMorePoints

> No, i go for the muffin then
- orderDessert
- finalise

> but i wanted a kebab
- unknown
- finalise

> finally I DON'T WANT PIZZA
- removeMain
- askMain

> yes
- askMain

> kebab!
- unknown
- askMain

> pizza
- orderMain
- finalise

> FINE