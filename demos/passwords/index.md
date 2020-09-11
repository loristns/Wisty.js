# I lost my password bot

I lost my password bot is a tiny bot helping people find their login back.
He can do the following actions :

* sayHello
* introduce
* askForDetails
* solved
* sayGoodbye
* checkSpell
* resetPassword
* retryReset
* callSupport

## wisty.stories

### Happy path

> Hi, I cannot access to my account
- sayHello
- checkSpell

> Oh I didn't spelled it correctly, thank you
- solved
- sayGoodbye

### Alt happy path

> Hello, can't sign in i'm stuck on login page
- sayHello
- checkSpell

> Thanks it worked !
- solved
- sayGoodbye

### Alt happy path 2
In this path, the user don't know the purpose of the bot, he is confused at first

> hello????
- sayHello
- introduce

> i cannot log in
- checkSpell

> yeah, it was that. Thanks !
- solved
- sayGoodbye

### Reset needed path

> Can't sign into my email
- sayHello
- checkSpell

> No, still cannot get in
- resetPassword

> Oh thanks
- solved
- sayGoodbye

### Alt reset need path

> Good morning
- sayHello
- introduce

> i have trouble to log in
- checkSpell

> No, it doesn't work
- resetPassword

> Thank you for your help
- solved
- sayGoodbye

### No problem path

> Hi
- sayHello
- introduce

> Bye
- sayGoodbye

### Alt no problem path

> Hey ???
- sayHello
- introduce

> Alright, sorry, i lost myself
- askForDetails

> nothing
- sayGoodbye

### Reset failed once path

> Hey, I can't sign in :/
- sayHello
- checkSpell

> It was well written, sorry
- resetPassword

> I didn't get the mail
- retryReset

> Oh nice, I got it
- solved
- sayGoodbye

### Alt reset failed once path

> Good afternon
- sayHello
- introduce

> I can't get logged into my profile
- checkSpell

> No, it's not the spelling
- resetPassword

> Oh, I don't got the e-mail...
- retryReset

> Perfect, thanks
- solved
- sayGoodbye

### Reset failed twice path

> Howdy, I lost my password
- sayHello
- resetPassword

> I didn't received the email
- retryReset

> No, still the same...
- callSupport
- sayGoodbye

### Alt reset failed twice path

> Hello
- sayHello
- introduce

> I lost the memory... What's my password ?
- resetPassword

> I have not received it...
- retryReset

> No, I don't got it...
- callSupport
- sayGoodbye

### Alt reset failed twice path 2

> Good morning
- sayHello
- introduce

> I can't remind myself of my credentials
- resetPassword

> I didn't got the mail
- retryReset

> Still anything in my inbox
- callSupport
- sayGoodbye

### ♻

> I CAN'T SIGN IN
- sayHello
- checkSpell

> NO I ALREADY TRIED
- resetPassword

> OH ITS FINE
- solved
- sayGoodbye

### Alt ♻

> hey
- sayHello
- introduce

> i forgot my password
- resetPassword

> It worked
- solved
- sayGoodbye

### Really uncooperative path

> ???
- sayHello
- introduce

> What is this ?
- askForDetails

> What, I don't understand
- callSupport
- sayGoodbye

### Test path 1

> can you give my account's code
- sayHello
- checkSpell

> no it doesn't work
- resetPassword

> yes it has worked
- solved
- sayGoodbye

### Test path 2

> I can't find my login
- sayHello
- resetPassword

> can you resend me a new code ?
- retryReset

> yeah it is solved...
- solved
- sayGoodbye

### Test path 3

> Why it says me my password is incorrect ?
- sayHello
- checkSpell

> it keeps saying me my session doesn't exist i don't know what to do
- resetPassword

> no
- retryReset

> still no
- callSupport
- sayGoodbye

### Test path 4
The issue seems much more important than a password lost

> My account is unknown what should I do ?
- sayHello
- checkSpell

> No it doesn't find my account at all
- resetPassword

> I didn't have received your message
- retryReset

> I still didn't have received any mail
- callSupport
- sayGoodbye

### Test path 5

> hello !
- sayHello
- introduce

> I can't connect me on the website
- checkSpell

> no
- resetPassword

When the user is confused, the bot can call the support directly

> it's too complicated for me
- callSupport
- sayGoodbye

### Test path 6

> Hey
- sayHello
- introduce

> I think i have a problem can you help me ?
- askForDetails

> i can't log in
- checkSpell

> no
- resetPassword

> yes
- solved
- sayGoodbye

### Test path 7

> can't connect to my account
- sayHello
- checkSpell

> my bad caps-locks
- solved
- sayGoodbye

### Test path 8

> i forgot my password
- sayHello
- resetPassword

> Solved thanks
- solved
- sayGoodbye

### Test path 9

> Hi, I lost my password
- sayHello
- resetPassword

> it's not working
- retryReset

> not solved
- callSupport
- sayGoodbye

### Test path 10

> hey can't sign in
- sayHello
- checkSpell

> no
- resetPassword

> yep
- solved
- sayGoodbye

### Test path 11

> hola
- sayHello
- introduce

> can't remind my credentials
- resetPassword

> nope
- retryReset

> nope
- callSupport
- sayGoodbye

### Test path 12

> hey can't log in today
- sayHello
- checkSpell

> that's ok
- solved
- sayGoodbye

### Test path 13

> can't get in
- sayHello
- checkSpell

> it was well spelled
- resetPassword

> what mail ?
- retryReset

> thx
- solved
- sayGoodbye

### Test path 14

> my login doesn't work today
- sayHello
- checkSpell

> nope
- resetPassword

> okay
- solved
- sayGoodbye

### Test path 15

> Hi
- sayHello
- introduce

> I've got no troubles
- sayGoodbye

### Test path 16

> Hi
- sayHello
- introduce

> I have no problem
- sayGoodbye

### Test path 17

> hey
- sayHello
- introduce

> i'm fine
- sayGoodbye

### Test path 18

> Good morning !
- sayHello
- introduce

> my account is blocked
- checkSpell

> No
- resetPassword

> Ok, it's good !
- solved
- sayGoodbye

### Test path 18bis

> Good morning !
- sayHello
- introduce

> I've got into some trouble indeed
- checkSpell

> nope
- resetPassword

> it's fine
- solved
- sayGoodbye

### Test path 19

> Hi i am not able to be logged in
- sayHello
- checkSpell

> nah
- resetPassword

The user has found the solution by itself, it don't want to go further

> no need it was ok
- solved
- sayGoodbye

### Test path 20

> can't get my password back in my memory
- sayHello
- resetPassword

> oh i remembered it, no need to reset
- solved
- sayGoodbye

### Test path 21

> hi
- sayHello
- introduce

> yes
- askForDetails

> unable to get logged in
- checkSpell

> it does not
- resetPassword

> it does
- solved
- sayGoodbye

### Test path 22

> hello
- sayHello
- introduce

> help please
- askForDetails

> i lost my password
- resetPassword

> alright
- solved
- sayGoodbye

### Test path 23

> Good morning can you help ?
- sayHello
- introduce

> can you help me
- askForDetails

> my password doesn't work
- checkSpell

> I tried at least 10 times !
- resetPassword

> an e-mail you said ?
- retryReset

> Hum no mail
- callSupport
- sayGoodbye

### Test path 24

> hello
- sayHello
- introduce

> how are you ?
- askForDetails

> can you reset my password
- resetPassword

> fine thanks
- solved
- sayGoodbye

### Test path 25

> good afternoon
- sayHello
- introduce

> ok cool, i do have a problem
- askForDetails

> cannot access my account
- checkSpell

> it does
- solved
- sayGoodbye

### Test path 24bis

> what
- sayHello
- introduce

> wtf
- askForDetails

> bye
- sayGoodbye

### Test path 25

> hey
- sayHello
- introduce

> yes i have a problem
- askForDetails

> i am enable to get logged in
- checkSpell

> no
- resetPassword

> hum alright
- solved
- sayGoodbye

### Test path 26

> hey
- sayHello
- introduce

> reset my password
- resetPassword

> no need bye
- sayGoodbye

### Test path 27

> hello
- sayHello
- introduce

> have a nice day
- sayGoodbye

### Test path 28

> hey
- sayHello
- introduce

> do you have a problem with me ?
- askForDetails

> in nothing, in nothing
- sayGoodbye

### Test path 29

> morning'
- sayHello
- introduce

> what's up
- askForDetails

> please help
- callSupport
- sayGoodbye

### Test path 30

> Hello
- sayHello
- introduce

> Oh, nice
- askForDetails

> I have a problem with my password, I can't log in
- checkSpell

> Oh, I was in caps-lock
- solved
- sayGoodbye

### Test path 31

> how do you do ?
- sayHello
- introduce

> no problem
- sayGoodbye

### Test path 32

> hey reset my password
- sayHello
- resetPassword

> cancel
- sayGoodbye

### Test path 33

> hello
- sayHello
- introduce

> i've lost my password
- resetPassword

> nop
- retryReset

> nothing
- callSupport
- sayGoodbye

### Test path 34

> hey
- sayHello
- introduce

> yeah i need help
- askForDetails

> i think you can't help
- callSupport
- sayGoodbye

### Test path 35

> good evening
- sayHello
- introduce

> can you help me ?
- askForDetails

> you are not able to help me
- callSupport
- sayGoodbye

### DA 1

> Hi, I can't get in, I'm stuck on the login page
- sayHello
- checkSpell

> Oh, I didn't write it right, thank you
- solved
- sayGoodbye

### DA 2

> I can't get into
- sayHello
- checkSpell

> No, I can't go in yet
- resetPassword

> Oh thank you
- solved
- sayGoodbye

### DA 3

> Hi
- sayHello
- introduce

> I have problems logging in
- checkSpell

> No, that does not work
- resetPassword

> Thanks for your help
- solved
- sayGoodbye

### Test set 1
> hey
- sayHello
- introduce

> what's up
- askForDetails

> hum nothing
- sayGoodbye

### Test set 2
> hey bro
- sayHello
- introduce

> i have troubles to log in
- checkSpell

> nope
- resetPassword

> yeah
- solved
- sayGoodbye

### Test set 3

> hey
- sayHello
- introduce

> i have a problem with my account
- checkSpell

> yep, that was it
- solved
- sayGoodbye

### Test set 4

> hey i lost my pass
- sayHello
- resetPassword

> no it doesn't
- retryReset

> still nothing
- callSupport
- sayGoodbye

### Test set 5

> hello
- sayHello
- introduce

> so... can you help ?
- askForDetails

> i have troubles logging in
- checkSpell

> i tried at least 10 times...
- resetPassword

> that's what i needed thanks
- solved
- sayGoodbye

### Test set 6

> hello
- sayHello
- introduce

> my login is wrong
- checkSpell

> nope nothing
- resetPassword

> no, not any mail
- retryReset

> still nope
- callSupport
- sayGoodbye

### Test set 7

> hey
- sayHello
- introduce

> what is this
- askForDetails

> hummm bye
- sayGoodbye

### Test set 8

> hey bro
- sayHello
- introduce

> no i can't get logged in
- checkSpell

> no no no
- resetPassword

> yes
- solved
- sayGoodbye

### Test set 9

> hello
- sayHello
- introduce

> reset my password
- resetPassword

> what, my mailbox is empty
- retryReset

> still nothing
- callSupport
- sayGoodbye

### Test set 10

> good morning
- sayHello
- introduce

> goodbye
- sayGoodbye

### Test set 11

> bonjour
- sayHello
- introduce

> well, I do need you
- askForDetails

> It's seems like my password is not functionnal, it won't log in when I try
- checkSpell

> I thinked about this but it seems more complicated
- resetPassword

> Alright it seems okay this time
- solved
- sayGoodbye

### Test set 12

> hi can you help me please i have big troubles to log in
- sayHello
- checkSpell

> how about no
- resetPassword

> did not got your e-mail
- retryReset

> yes
- solved
- sayGoodbye

### Test set 13

> i've lost my password
- sayHello
- resetPassword

> bye
- sayGoodbye
