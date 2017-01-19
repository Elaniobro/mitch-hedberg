var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  // reconnect to Slack RTM when connection goes bad
  retry: Infinity,
  debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
  console.log('Starting in single-team mode')
  controller.spawn({
    token: token,
    retry: Infinity
  }).startRTM(function (err, bot, payload) {
    if (err) {
      throw new Error(err)
    }

    console.log('Connected to Slack RTM')
  })
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
  console.log('Starting in Beep Boop multi-team mode')
  require('beepboop-botkit').start(controller, { debug: true })
}

var mitchQuote = ["My fake plants died because I did not pretend to water them.",
                  "I bought a $7 pen because I always lose pens and I got sick of not caring.",
                  "I used to do drugs — I still do, but I used to, too.",
                  "The depressing thing about tennis is that no matter how good I get, I’ll never be as good as a wall.",
                  "I haven’t slept for ten days, because that would be too long.",
                  "A burrito is a sleeping bag for ground beef.",
                  "An escalator can never break — it can only become stairs.",
                  "This shirt is ‘dry-clean only’ — which means it’s dirty.",
                  "When I was a boy, I laid in my twin-sized bed and wondered where my brother was.",
                  "I find a duck’s opinion of me is very much influenced by whether or not I have bread.",
                  "I wish I could play little league now, I’d be way better than before.",
                  "I love my FedEx guy cause he’s a drug dealer and he doesn’t even know it — and he’s always on time.",
                  "The last time I called ‘shotgun’, we had rented a limo, so I fucked up.",
                  "This sign says \"IMPROV,\" but I had a bad set on Friday night, so yesterday they put an \"E\" on the end ofit.",
                  "I got an ant farm; them fellas didn’t grow shit.",
                  "I don’t have a microwave oven, but I do have a clock that occasionally cooks stuff.",
                  "I’m against picketing, but I don’t know how to show it.",
                  "I got my hair highlighted, because I felt some strands were more important than others.",
                  "If you’re flammable and have legs, you are never blocking a fire exit.",
                  "People tell me how hard it is to stop smoking; I think it’s about as hard as it is to start flossing.",
                  "I’m a hard act to follow, because when I’m done, I take the microphone with me.",
                  "You don’t have to be sweaty and holding a basketball to enjoy a Gatorade; you could just be a thirsty dude —Gatorade forgets about this demographic!",
                  "My friend asked me if I wanted a frozen banana, I said \"No, but I want a regular banana later, so… yeah.\"",
                  "I’d hate to be a giraffe with a sore throat.",
                  "I put fruit on top of my waffles, because I want something to brush off.",
                  "I was gonna have my teeth whitened, but then I said fuck that, I’ll just get a tan instead.",
                  "When I was on acid I would see things like beams of light, and I would hear things that sounded an awful lot like car horns.",
                  "One time, this guy handed me a picture of him, he said,\"Here’s a picture of me when I was younger.\" Every picture is of you when you were younger.",
                  "Is a hippopotamus a hippopotamus? Or just a really cool opotamus?",
                  "I went to a record store, they said they specialized in hard-to-find records — nothing was alphabetized.",
                  "A severed foot is the ultimate stocking stuffer.",
                  "What happened when Jesus wanted to swim?",
                  "Onions make me sad. A lot of people don’t realize that.",
                  "If my kid couldn’t draw I’d make sure that my kitchen magnets didn’t work.",
                  "When someone hands you a flyer, it’s like they’re saying \"Here, you throw this away.\"",
                  "A dog is forever in the push-up position.",
                  "I got a parrot and it talked, but it did not say I’m hungry, so it died.",
                  "I’m sick of following my dreams, I’m going to ask them where they’re going and hook up with them later.",
                  "I turned to my friend and said \"How do you abbreviate Arkansas\". He said \"I don’t know, just start spelling it, and then quit.\"",
                  "I like to play blackjack. I’m not addicted to gambling, I’m addicted to sitting in a semi-circle.",
                  "I once saw a forklift lift a crate of forks. And it was way too literal for me.",
                  "I think Bigfoot is blurry, that’s the problem — it’s not the photographer’s fault.",
                  "I order the club sandwich all the time and I’m not even a member. I don’t know how I get away with it.",
                  "Alcoholism is a disease, but it’s the only one you can get yelled at for having.",
                  "My belt holds my pants up, but the belt loops hold my belt up; so which one’s the real hero?",
                  "At the end of my letters, I like to write ‘P.S. – this is what part of the alphabet would look like if Q and R  were eliminated.’",
                  "If Spiderman was real, and I was a criminal, and he shot me with his web, I would say, \"Dude, thanks for the hammock.\"",
                  "Swiss Cheese is a rip-off — it’s the only cheese I can bite into and miss.",
                  "It’s very dangerous to wave to people you don’t know because what if they don’t have hands? They’ll think you’re cocky.",
                  "If carrots got you drunk, rabbits would be messed-up.",
                  "I wanted to buy a candle holder, but the store didn't have one. So I got a cake.",
                  "I got an ant farm... them fellas didn't grow shit!",
                  "I went to a doctor, all he did was suck blood from my neck. Don't go see Dr. Acula.",
                  "I had a Mr. Pibb, Mr. Pibb is a replica of Dr. Pepper... but it's the bullshit replica, cause dude didn't even get his degree.",
                  "One time a guy handed me a picture and said \"Here's a picture of me when I was younger.\" Every picture is of you when you were younger! \"Here's a picture of me when I'm older.\" You son of a bitch, how'd you pull that off? Let me see that camera.",
                  "I'd like to see a forklift lift a crate of forks... it'd be so damn literal!  You are using that machine to its exact purpose!",
                  "Last week I helped my friend stay put. It's a lot easier than helping someone move. I just went over to his house and made sure that he did not start to load shit into a truck.",
                  "I think we should only get 3 honks a month on the car horn, because people honk the car horn too much. 3 honks, that's the limit. And then someone cuts you off, ffffft, you press your horn, nothing happens. You're like, \"shit! I wish I wouldn't have seen Ricky on the sidewalk!\"",
                  "I'm against picketing, but I don't know how to show it.",
                  "I was at this casino minding my own business, and this guy came up to me and said, \"You're gonna have to move, you're blocking a fire exit.\" As though if there was a fire, I wasn't gonna run. If you're flammable and have legs, you are never blocking a fire exit.",
                  "I wanna be a race car passenger - just a guy who bugs the driver. \"Say man, can I turn on the radio? You should slow down. Why we gotta keep going in circles? Can I put my feet out the window? Man, you really like Tide.\"",
                  "My friend asked me if I wanted a frozen banana, I said \"no, but I want a regular banana later, so... yeah.\"",
                  "I walked by a drycleaner at 3am, the sign said \"Sorry, we're closed.\" You don't have to be sorry, it's 3am and you're a drycleaner. It would be ridiculous for me to expect you to be open. I'm not gonna walk in at 10am and say \"Hey, I walked in at 3am and you guys were closed. Somebody owes me an apology.\"",
                  "I got a business card, cause I wanna win some lunches. That's what my business card says: \"Mitch Hedberg, Potential Lunch Winner.\"",
                  "I had a paper route when I was a kid, I was a paper boy. I was supposed to go to 2,000 houses... or 2 dumpsters!",
                  "I like the hot tubs at the hotels. I like to go there when there's a guy in there already, I say \"hey man, you mind if I join you?\" He says no. Then I go and I turn the whirlpool heat up, then I go by and I add some carrots and onions. Then I say \"hey man, just simmer for a whil- I mean, sit there.\"",
                  "I would like to have a product that was available for 3 easy payments and one fuckin' complicated payment. We ain't gonna tell you which payment it is, but one of these payments is gonna be a bitch!",
                  "I saw this wino, he was eating grapes. It's like, \"dude, you have to wait.\"",
                  "I saw a commercial that said, \"forget everything you know about slip covers!\" So I did. And it was a load off my mind. Then the commercial tried to sell me slip covers, but I didn't know what the hell they were.",
                  "Every McDonald's commercial ends the same way, right? \"Prices and participation may vary.\" I wanna open a McDonald's and not participate in anything. I wanna be a stubborn McDonald's owner. Cheeseburgers? Nope. We got spaghetti! And blankets!",
                  "I was gonna have my teeth whitened, but then I said fuck that, I'll just get a tan instead.",
                  "I had a job interview at an insurance company once, and the lady said \"Where do you see yourself in five years?\" I said, \"Celebrating the fifth year anniversary of you asking me this question!\"",
                  "I bought a house, it's a 2-bedroom house. But I think it's up to me how many bedrooms there are, don't you? Fuck you real estate lady, this bedroom has an oven in it! This bedroom has a lot of people sitting around watching TV. This bedroom's over in that guy's house.",
                  "I like the FedEx driver, because he's a drug dealer, and he don't even know it.",
                  "I wanna hang a map of the world in my house. Then I'm gonna put pins into all the locations that I've traveled to. But first, I'm gonna have to travel to the top two corners of the map, so it won't fall down.",
                  "You know when a company wants to use letters in their phone number to be catchy? But often times they use too many letters. \"Give us a call down here at 1-800-I-Really-Enjoy-Carpeting.\" It's too many letters, man. \"Hello?\" \"Hold on, I'm only on 'Enjoy'! How did you know I was calling?\"",
                  "I bought a 7 dollar pen, because I always lose pens, and I got sick of not caring.",
                  "I would imagine if you understood Morse code, a tap dancer would drive you crazy!",
                  "I had a small scene in a movie with Peter Frampton. And we had to smoke pot for our scene - but it was fake pot! Do not buy pot on a movie set. But I got to smoke fake pot with Peter Frampton, that's a cool story. It's as cool as smoking real pot with a guy who looks like Peter Frampton... I've done that way more.",
                  "The thing that's depressing about tennis is, no matter how good I get, I'll never be as good as a wall. I played a wall once... they're fucking relentless!",
                  "People ask me what words mean... they say, \"what does 'composition' mean?\" Some people would say, \"put it in a sentence.\" But I need a little more. \"Put it in a play.\"",
                  "If I'm out to dinner with a group of friends, and someone offers to pay for the check, I immediately reach for my wallet. Because inside is a note that says \"say thanks.\"",
                  "Every book is a children's book, if the kid can read!",
                  "My friend said to me \"I think the weather's trippy.\" And I said \"No man, it's not the weather that's trippy. Perhaps it is the way that we percieve it that is indeed trippy.\" Then I thought \"man, I should have just said 'yeah'.\"",
                  "I like escalators, because an escalator can never break; it can only become stairs. You would never see an \"escalator temporarily out of order\" sign, just \"Escalator temporarily stairs... sorry for the convenience. We apologize for the fact that you can still get up there.\"",
                  "When I was on acid, I would see things like beams of light... and I would hear sounds that sounded an awful lot like car horns.",
                  "I was in a hotel room and my friend comes over, he says \"can I use the phone?\" I said \"certainly.\" He said \"do I need to dial 9?\" \"Yeah... especially if it's in the number. You can try 4 and 5 back to back real quick.\"",
                  "I wanna get a job naming kitchen appliances, that seems easy. Refrigerator, toaster, blender... you just say what the thing does, then you add \"er\". Kitchen Appliance Naming Institute... \"What does this thing do?\" \"It keeps shit fresh.\" \"Well then that's a fresher! I'm going on break.\"",
                  "I did a radio interview with XM radio... they said \"you can swear on XM radio.\" No shit, cause nobody can hear it. You can swear in the woods, too!",
                  "As a comedian, you have to start the show strong and you have to end the show strong. Those are the two key elements. You can't be like pancakes... all exciting at first, but then by the end you're fuckin' sick of em.",
                  "Alcoholism is a disease, but it's the only disease that you can get yelled at for having. Goddammit Otto, you're an alcoholic! Goddammit Otto, you have lupus! One of those two doesn't sound right.",
                  "I know a lot about cars, I can look at a car's headlights and tell you exactly which way it's coming.",
                  "I say the word \"totally\" way too much. I need to change it and use a word that's different but means the same. \"Mitch, do you like submarine sandwiches?\" \"All-encompassingly!\"",
                  "I went to the Home Depot the other day, which was unnecessary... I need to go to the Apartment Depot, which is just a big warehouse with people standing around saying \"hey, we ain't gotta fix shit!\"",
                  "I used to do drugs. I still do, but I used to, too.",
                  "I like refried beans, that's why I wanna try fried beans. Cause maybe they're just as good, and we're wasting time. You don't have to fry them again, after all!",
                  "I hate dreaming, because when you wanna sleep, you wanna sleep. Dreaming is work, you know? Like there I am, laying in my comfortable bed in my hotel room... next thing I know, I have to build a go-cart with my ex-landlord.",
                  "I drank some boiling water, because I wanted to whistle.",
                  "On a traffic light, green means go and yellow means yield, but on a banana, it's just the opposite. Green means hold on. Yellow means go ahead. And red means, where the fuck did you get that banana at?",
                  "My apartment is infested with koala bears... it's the cutest infestation ever! Way better than cockroaches. When I turn on the light, a bunch of koala bears scatter. And I don't want 'em to, you know?",
                  "I don't have any children, but if I had a baby, I would have to name it. So I would buy a baby naming book... or I would invite somebody over who had a cast on!",
                  "I think Bigfoot is blurry, that's the problem. It's not the photographers' fault! Bigfoot is blurry... and that's extra scary to me. Cause there's a large, out-of-focus monster roaming the countryside.",
                  "I opened up a yogurt, and underneath the lid it said \"please try again\", because they were having a contest I was unaware of. But I thought I might have opened the yogurt wrong. Or maybe Yoplait was trying to inspire me. \"Come on Mitchell, don't give up... please try again.\" A message of inspiration from your friends at Yoplait. Fruit on the bottom, hope on top.",
                  "I miss the $2... I could break a $2.",
                  "My sister wanted to be an actress... she never made it, but she does live in a trailer. She got half-way. It's like she's an actress, she's just never called to the set.",
                  "Sometimes I wave to people I don't know... very dangerous to wave to someone you don't know, because what if they don't have a hand? They'll think you're cocky! Look what I got, motherfucker... this thing is useful! I'm gonna go pick something up!",
                  "Is a hippopotamus a hippopotamus? Or just a really cool opotamus?",
                  "I did a radio interview, the DJ's first question was \"who are you?\" I had to think: is this guy really deep, or did I drive to the wrong station?",
                  "I think Pizza Hut is the cockiest pizza chain on the planet, because Pizza Hut will accept all competitors' coupons. That makes me wish I had my own pizza place. \"Mitch's Pizzaria... this week's coupon: unlimited free pizza. Special Note: coupon not good at any of the Mitch's Pizza locations. Free pizza oven with purchase of a small Coke. Two-for Tuesday: buy one pizza, get one franchise free.\"",
                  "Last time I called shotgun, we had rented a limo... so I fucked up.",
                  "Foosball fucked up my perception of soccer. I thought you had to kick the ball, and then spin around and round. I can't do a backflip, much less several... simultaneously with two other guys... that look just like me.",
                  "I had a bag of Fritos, they were Texas Grilled Fritos. These Fritos had grill marks on 'em. Hell yeah! Reminds me of summer, when we used to fire up the barbeque, and throw down on some Fritos. I can still see my dad with the apron on... \"you better flip that Frito dad, you know how I like it.\"",
                  "You know, I'm sick of following my dreams, man. I'm just gonna ask where they're going, and hook up with them later.",
                  "Fish are always eating other fish. If fish could scream, the ocean would be loud as shit! You would not want to submerge your head... nothing but fish going \"Ahhhh, fuck! I thought I looked like that rock!\"",
                  "The club owner here hooks me up with drugs, like cocaine or pot brownies. But last time I was in town he gave me a drug for attention deficit disorder, because he's afflicted. But I'm not, so what happened to me was I suddenly had an extra-long attention span. People would be telling me a story, then the story would end and I'd get all mad and shit. \"Come on man, there's gotta be more to that story!\"",
                  "I wake up in the morning, I make myself a bowl of instant oatmeal, then I don't do shit for an hour. Which makes me wonder why I need the instant oatmeal! I could get the regular oatmeal and feel productive.",
                  "I got into an argument with a girlfriend inside of a tent. That's a bad place for an argument. Cause then I tried to walk out, and slam the flap. How are you supposed to express your anger in this situation? Zip it up really quick?",
                  "I mumble a lot off stage, I'm a mumbler. If I'm walking with a friend, and I say something, he won't hear me, he'll say \"what?\" So I'll say it again, but once again he doesn't hear me, so he says \"what?\" But really it's just some insignificant shit that I'm saying... but now I'm yelling, \"That tree is far away!\"",
                  "I did comedy for a fundraiser once, we were trying to raise money to buy one of those machines that shows how much money has been raised.",
                  "I've had the AIDS test four times. And that shit is scary, doesn't matter what you've been doing. So I don't get the regular AIDS test anymore, I get the <i>roundabout</i> AIDS test. I call up my friend Brian and say \"Brian, do you know anyone that has AIDS? No? Cool... cause you know me.\"",
                  "I get the Reese's candy bar... if you read that name, Reese's, that's an \"apostrophe s\" on the end of that name. That means the candy bar is his. I didn't know that. Next time you're eating a Reese's candy bar and a guy named Reese comes buy and says \"let me have that\", you better hand it over. \"I'm sorry Reese, I didn't think I'd ever run into you. You're a fuckin' bully, man!\"",
                  "The Kit-Kat candy bar has the name \"Kit-Kat\" imprinted into the chocolate. That robs you of chocolate! That's a clever chocolate-saving technique. I'll go down to the factory... \"you owe me some letters!\"",
                  "As a comedian, I always get into situations where I'm auditioning for movies and sitcoms, you know? As a comedian, they want you to do other things besides comedy. They say \"alright you're a comedian, can you write? Write us a script. Act in this sitcom.\" They want me to do shit that's related to comedy, but it's not comedy, man. It's not fair, you know? It's as though if I was a cook, and I worked my ass off to become a really good cook, and they said \"alright you're a cook... can you farm?\"",
                  "This one guy said \"look at that girl's butt! She has a nice butt.\" I said \"yeah, I bet she can sit down excellently.\"",
                  "2 in 1 shampoo... 2 in 1 is a bullshit term, because 1 is not big enough to hold 2. That's why 2 was created. If it was 2 in 1, it would be overflowing... the bottle would be all sticky and shit.",
                  "I bought a doughnut, and they gave me a receipt for the doughnut. I don't need a receipt for the doughnut, man, I'll just give you the money then you give me the doughnut! End of transaction. We don't need to bring ink and paper into this. I just can't imagine a scenario where I would have to prove that I bought a doughnut. Some skeptical friend... don't even act like I didn't get that doughnut! I got the documentation right here. Oh wait, it's at home... in the file... under 'D'.",
                  "I called the hotel operator, she said \"how can I direct your call?\" Well, you could say \"action!\" And I will begin to dial. And then when I say goodbye, you could yell \"cut!\"",
                  "When we were on acid, we would go into the woods... cause when you're in the woods tripping, there's less likely a chance you'll run into an authority figure. But we ran into a bear. That was even more of a buzzkill. My friend Dwayne was standing there raising his right hand, swearing to help prevent forest fires. We got away from the bear, he put his arm around my shoulder, he said \"Mitchell... Smokey is way more intense in person!\"",
                  "I had the cab driver drive me here backwards... the fucker owed me $27.50!",
                  "I bought a scratch-off ticket, but then I accidentally spilled some cortizone cream on it, so it did not need to be scratched.",
                  "I played in a death metal band. People either loved us or they hated us... or they thought we were okay. A lot of death metal bands have intense names, like \"Rigormortis\" or \"Mortuary\" or \"Obituary\". We weren't that intense, we just went with \"Injured\". Later on we changed it to \"A Capella\"... as we were walking out of the pawn shop.",
                  "I'm an ice sculptor... last night I made a cube.",
                  "I was in downtown Boise Idaho and I saw a duck. And I knew the duck was lost, cause ducks ain't supposed to be downtown, there's nothing for 'em there. So I went to a Subway sandwich shop, I said \"let me have a bun.\" But she wouldn't sell me just the bun, she said I had to have something on it. She told me it's against regulations for Subway to sell just the bun. I guess the two halves ain't supposed to touch. So I said alright, well put some lettuce on it. They said, \"that'll be $1.75.\" I said \"it's for a duck.\" They said \"alright, well then it's free.\" See, I did not know that. Ducks eat for free at Subway!! Had I known that, I would have ordered a much larger sandwich. \"Let me have the steak fajita sub. But don't bother ringing it up... it's for a duck! There are 6 ducks out there, and they all want Sun Chips!!\"",
                  "I flew over an island that said \"S.O.S.\", so I landed, because I wanted to clean their pans.",
                  "You know when they show someone on TV, washing their hair under a waterfall? That's fucking bullshit man... cause that thing would knock you on your ass!",
                  "I saw a billboard for a lottery, it said \"estimated lotto jackpot 55 million.\" See, I did not know that shit was estimated. That would suck if you won and they go, \"oh, we were off by two zeros. We estimate that you are angry!\"",
                  "My girlfriend works at Hooters... in the kitchen.",
                  "Stephen Lynch is funny, he's a hard act to follow. I'm a hard act to follow too, cause when I'm done I take the microphone with me.",
                  "I hope the next time I move I get a real easy phone number. Something like 222-2222. I would say sweet. People would say \"Mitch, how do I get a hold of you?\" I would say, \"Just press 2 for a while! And when I answer, you will know that you have pressed 2 enough.\"",
                  "I'm so glad I'm almost done the set, man... because I have a roll of Lifesavers in my pocket, and pineapple is next!",
                  "When you go to a restaurant on the weekends, it's busy, so they start a waiting list. They start calling out names, they say \"Dufrene, party of 2. Table ready for Dufrene, party of 2.\" And if no one answers, they'll say their name again. \"Dufrane, party of 2.\" But then if no one answers they'll just go right on to the next name. \"Bush, party of 3.\" Yeah... what happened to the Dufrenes? No one seems to give a shit. Who can eat at a time like this? People are missing! You fuckers are selfish. The Dufrenes are in someone's trunk right now, with duct tape over their mouths. And they're hungry - that's a double whammy. We need help. Bush, SEARCH party of 3! You can eat once you find the Dufrenes.",
                  "My manager was concerned, he said \"Mitch, don't use liquor as a crutch.\" I can't use liquor as a crutch... because a crutch <u>helps</u> me walk. Liquor severely screws up the way I walk. It ain't like a crutch, it's like a step I didn't see.",
                  "I used to live here in Los Angeles... and I had an apartment, and I had a neighbor. And whenever he would knock on my wall, I knew he wanted me to turn my music down. And that made me angry, cause I like loud music. So when he knocked on the wall, I'd mess with his head. I'd say, \"go around! I cannot open the wall. I don't know if you have a doorknob on the other side, but over here there's nothing... it's just flat!\"",
                  "I wanted to buy a candle holder, but the store didn't have one. So I got a cake.",
                  "I smoke cigars occasionally, I don't know a lot about cigars.  Like I'm at the cigar store, the man behind the counter says \"what kind of cigars do you like?\"  \"Uhh... Itsaboys.\"",
                  "I used to have really long hair, and people thought I was high on stage, because people associate long hair with drug use.  I wish long hair was associated with something other than drug use, like an extreme longing for cake.  And then strangers would see a long-haired guy, they'd say \"that fucker eats cake!  He is on bundt cake!\"  Mothers saying to their daughters, \"don't bring the cake-eater over here anymore, he smells like flour.  Did you see how excited he got when he found out your birthday was fast approaching?\"",
                  "I had a roommate, his name was Eddie, and Eddie was slow on the mental draw.  I was writing a letter, I had a problem... I said, \"Ed, how do you abbreviate Arkansas?\"  He said, \"I don't know, just start spelling it, then quit!\"",
                  "Like, we had a refrigerator with a hard-boiled egg inside, after a few days the shell started to crack.  Eddie's first comment was \"man, this guy's a survivor!\"",
                  "I can't floss my teeth, man... I can't get into the flossing thing.  People who smoke cigarettes, they say \"man, you don't know how hard it is to quit smoking.\"  Yes I do.  It's as hard as it is to <u>start</u> flossing!",
                  "You know when you go to concerts, and the kids get on stage and they jump into the crowd, stage diving?  People think that's dangerous, but not me.  Because humans are made out of 95% water!  So the audience is 5 percent away from a pool.",
                  "I rent a lot of cars, cause I go on the road.  And when I drive a rental car, I don't know what's going on with it, right?  So a lot of times I'll drive for like 10 miles with the emergency brake on.  That doesn't say a lot for me, but it really doesn't say a lot for the <i>emergency brake</i>.",
                  "I play the guitar, I taught myself how to play the guitar, which was a bad decision... because I didn't know how to play it, so I was a shitty teacher.  I would never have went to me.",
                  "I hate turkeys.  If you go to the grocery store and you stand in front of the lunchmeat section for too long, you start to get pissed off at turkeys.  You see, like, turkey ham, turkey pastrami, turkey bologna... somebody needs to tell the turkeys, \"man, just be yourself!\"",
                  "I order the club sandwich all the time, but I'm not even a member, man!  I don't know how I get away with it.\n\"I like my sandwiches with three pieces of bread.\"\n\"So do I.\"\n\"Well let's form a club then.\"\n\"Okay, but we need some more stipulations.\"\n\"Yes we do.  Instead of cutting the sandwich once, let's cut it again.\"\n\"Yes, four triangles.  And we will position them into a circle.  And in the middle we will dump chips.\"\n\"Or potato salad.\"\n\"Okay.  Lemme ask you a question: how do you feel about frilly toothpicks?\"\n\"I'm for 'em!\"\n\"Well this club is formed.  Spread the word on menus nationwide!\"
                  ];


controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "I wish I could play little league now. I'd be way better than before.")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hello. Add me to your channel for laughs')
})

controller.hears('.*', ['mention'], function (bot, message) {
  bot.reply(message, 'You really do care about me. :heart:')
})

// controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
//   var help = 'I will respond to the following messages: \n' +
//       '`bot hi` for a simple message.\n' +
//       '`bot attachment` to see a Slack attachment message.\n' +
//       '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
//       '`bot help` to see this again.'
//   bot.reply(message, help)
// })

// controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
//   var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
//   var attachments = [{
//     fallback: text,
//     pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
//     title: 'Host, deploy and share your bot in seconds.',
//     image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
//     title_link: 'https://beepboophq.com/',
//     text: text,
//     color: '#7CD197'
//   }]

//   bot.reply(message, {
//     attachments: attachments
//   }, function (err, resp) {
//     console.log(err, resp)
//   })
// })

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, you\'re not that funny.  \n')
})

controller.on('direct_message,mention,direct_mention', function (bot, message) {
   bot.api.reactions.add({
       timestamp: message.ts,
       channel: message.channel
   }, function (err) {
       if (err) {
           console.log(err)
       }
       bot.reply(message, mitchQuote[Math.floor(Math.random() * mitchQuote.length)]);
   });
});

