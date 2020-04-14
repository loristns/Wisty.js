# I lost my password bot

I lost my password bot is a tiny bot helping people find their login back.
He can do the following actions :

* introduce
* sayHello
* solved
* sayGoodbye
* checkSpell
* resetPassword
* retryReset
* checkResetCodeSpell
* callSupport

## Happy path

> Hi, I cannot access to my account
- sayHello
- checkSpell

> Oh I didn't spelled it correctly, thank you
- solved
- sayGoodbye

## Alt happy path

> Hello, can't sign in
> i'm stuck on login page
- sayHello
- checkSpell

> Thanks it worked !
- solved
- sayGoodbye

## Alt happy path 2
In this path, the user don't know the purpose of the bot, he is confused at first

> hello????
- sayHello
- introduce

> i cannot log in
- checkSpell

> yeah, it was that. Thanks !
- solved
- sayGoodbye

## Reset needed path

> Can't sign into my email
- sayHello
- checkSpell

> No, still cannot get in
- resetPassword

> Oh thanks
- solved
- sayGoodbye

## Alt reset need path

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

## No problem path

> Hi
- sayHello
- introduce

> Bye
- sayGoodbye

## Alt no problem path

> Hey ???
- sayHello
- introduce

> Alright, sorry, i lost myself
- sayGoodbye

## Reset failed once path

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

## Alt reset failed once path

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

## Reset failed twice path

> Howdy, I lost my password
- sayHello
- checkSpell

> No... I can't remember it at all
- resetPassword

> I didn't received the email
- retryReset

> No, still the same...
- callSupport

> Sounds goods, thank you anyway
- sayGoodbye

## Alt reset failed twice path

> Hello
- sayHello
- introduce

> I lost the memory... What's my password ?
- checkSpell

> No, I'm completly lost
- resetPassword

> I have not received it...
- retryReset

> No, I don't got it...
- callSupport

> Ok well
- sayGoodbye

## Alt reset failed twice path 2

> Good morning
- sayHello
- introduce

> I can't remind myself of my credentials
- checkSpell

> Huhu no, I completely forgot it
- resetPassword

> I didn't got the mail
- retryReset

> Still anything in my inbox
- callSupport

> alright
- sayGoodbye

## Reset failed bad spell path

> I CAN'T SIGN IN
- sayHello
- checkSpell

> NO I ALREADY TRIED
- resetPassword

> IT SAY THE CODE IS INCORRECT
- checkResetCodeSpell

> OH IT WAS THIS FINE
- solved
- sayGoodbye


## Alt reset failed bad spell path

> hey
- sayHello
- introduce

> i forgot my password
- checkSpell

> No, it written correctly
- resetPassword

> uh, the reset code is wrong
- checkResetCodeSpell

> Oh sorry, my fault. It worked
- solved
- sayGoodbye

## Really uncooperative path

> ???
- sayHello
- introduce

> What is this ?
- introduce

> What, I don't understand
- callSupport
