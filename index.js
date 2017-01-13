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

var mitchQuote = ["My fake plants died because I did not pretend to water them.","I bought a $7 pen because I always lose pens and I got sick of not caring.","I used to do drugs — I still do, but I used to, too.","The depressing thing about tennis is that no matter how good I get, I’ll never be as good as a wall.","I haven’t slept for ten days, because that would be too long.","A burrito is a sleeping bag for ground beef.","An escalator can never break — it can only become stairs.","This shirt is ‘dry-clean only’ — which means it’s dirty.","When I was a boy, I laid in my twin-sized bed and wondered where my brother was.","I find a duck’s opinion of me is very much influenced by whether or not I have bread.","I wish I could play little league now, I’d be way better than before.","I love my FedEx guy cause he’s a drug dealer and he doesn’t even know it — and he’s always on time.","The last time I called ‘shotgun’, we had rented a limo, so I fucked up.","This sign says \"IMPROV,\" but I had a bad set on Friday night, so yesterday they put an \"E\" on the end ofit.","I got an ant farm; them fellas didn’t grow shit.","I don’t have a microwave oven, but I do have a clock that occasionally cooks stuff.","I’m against picketing, but I don’t know how to show it.","I got my hair highlighted, because I felt some strands were more important than others.","If you’re flammable and have legs, you are never blocking a fire exit.","People tell me how hard it is to stop smoking; I think it’s about as hard as it is to start flossing.","I’m a hard act to follow, because when I’m done, I take the microphone with me.","You don’t have to be sweaty and holding a basketball to enjoy a Gatorade; you could just be a thirsty dude —Gatorade forgets about this demographic!","My friend asked me if I wanted a frozen banana, I said \"No, but I want a regular banana later, so… yeah.\"","I’d hate to be a giraffe with a sore throat.","I put fruit on top of my waffles, because I want something to brush off.","I was gonna have my teeth whitened, but then I said fuck that, I’ll just get a tan instead.","When I was on acid I would see things like beams of light, and I would hear things that sounded an awful lot like car horns.","One time, this guy handed me a picture of him, he said,\"Here’s a picture of me when I was younger.\" Every picture is of you when you were younger.","Is a hippopotamus a hippopotamus? Or just a really cool opotamus?","I went to a record store, they said they specialized in hard-to-find records — nothing was alphabetized.","A severed foot is the ultimate stocking stuffer.","What happened when Jesus wanted to swim?","Onions make me sad. A lot of people don’t realize that.","If my kid couldn’t draw I’d make sure that my kitchen magnets didn’t work.","When someone hands you a flyer, it’s like they’re saying \"Here, you throw this away.\"","A dog is forever in the push-up position.","I got a parrot and it talked, but it did not say I’m hungry, so it died.","I’m sick of following my dreams, I’m going to ask them where they’re going and hook up with them later.","I turned to my friend and said \"How do you abbreviate Arkansas\". He said \"I don’t know, just start spelling it, and then quit.\"","I like to play blackjack. I’m not addicted to gambling, I’m addicted to sitting in a semi-circle.","I once saw a forklift lift a crate of forks. And it was way too literal for me.","I think Bigfoot is blurry, that’s the problem — it’s not the photographer’s fault.","I order the club sandwich all the time and I’m not even a member. I don’t know how I get away with it.","Alcoholism is a disease, but it’s the only one you can get yelled at for having.","My belt holds my pants up, but the belt loops hold my belt up; so which one’s the real hero?","At the end of my letters, I like to write ‘P.S. – this is what part of the alphabet would look like if Q and R  were eliminated.’","If Spiderman was real, and I was a criminal, and he shot me with his web, I would say, \"Dude, thanks for the hammock.\"", "Swiss Cheese is a rip-off — it’s the only cheese I can bite into and miss.", "It’s very dangerous to wave to people you don’t know because what if they don’t have hands? They’ll think you’re cocky."];


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
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})

controller.on('direct_message,mention,direct_mention', function (bot, message) {
   bot.api.reactions.add({
       timestamp: message.ts,
       channel: message.channel,
       name: 'robot_face',
   }, function (err) {
       if (err) {
           console.log(err)
       }
       bot.reply(message, mitchQuote[Math.floor(Math.random() * mitchQuote.length)]);
   });
});

