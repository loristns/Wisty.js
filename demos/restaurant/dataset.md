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


## Happy path dialog

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

## 2

> what do you have ?
- giveMenu

> nothing in starter, but I will take an omelet
- noStarter
- orderMain
- askDessert

> hum what about a sundae
- orderDessert
- finalise

## 3

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

## 4

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

## 5

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

## 6

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

## 7

> i want a salad
- orderStarter
- askMain

> a pizza
- orderMain
- askDessert

> nothing
- noDessert
- finalise

## 8

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

## 9

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

## 10

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

## 11

> i'd take a salad and an ice-cream
- orderStarter
- orderDessert
- askMain

> nothing
- noMain
- finalise

## 12

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

# 13

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

## 14

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

## 15

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

## 16

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

## 17

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

## 18

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

## 19

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
- giveMenu
- askStarter

> nothing else
- finalise

## 20

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

## 21

> hey
- giveMenu

> I will take a salad
- orderStarter
- askMain

> do you have some sandwich ?
- unknown
- giveMenu
- askMain

> an omelet please
- orderMain
- askDessert

> nothing more
- noDessert
- finalise

## 22

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

## 23

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

## 24 GIVE THE MENU

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
- giveMenu
- askDessert

> a muffin instead
- askMorePoints

> no cancel that
- noDessert
- finalise