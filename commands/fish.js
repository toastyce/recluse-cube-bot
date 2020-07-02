exports.run = (client, message, args) => {
    // command starts here
    message.delete();
    var fishArray = [
      "*Waves crash over your lure, displacing it ever so slightly.*",
      "*Under the water, you spot a shadow moving ever closer. Will it chance upon your bait?*",
      "*The wind howls for a moment. You keep concentration in hopes of landing a catch.*",
      "*The water looks serene from here.*",
      "*The current picks up, dragging your lure farther out.*",
      "*The screech of a bird can be heard overhead. It hasn't found it's meal yet, and neither have you.*",
      "*The reflection of the sun on the waters surface is mesmerizing. What a beautiful day to be outside.*",
      "*A couple of shadows swim past your lure. Perhaps they didn't notice your bait?*",
      "*...*",
      "*The fish are not biting yet. Perhaps it is time for a sip of tea.*",
      "*Welcome back to another exciting day of extreme fishing! Today, we continue watching our professional fishermen in the quest to catch something. So far, no dice.*",
      "*...*",
      "*Lets spice this trip up with a fact about shrimp. Did you know that the average shrimp lifespan is between 12 and 16 minutes?*",
      "*A fish leaped out of the water!*",
      "*The calmness of the water lets you relax a little easier.*",
      "*You feel a tug!*",
      "*...*",
      "*It was just your imagination.*",
      "*You toss your line at a different location, hoping to have better luck over there.*",
      "*The ebb and flow of the waves is mesmerizing.*",
      "*A shadow approaches your line, but turns away at the last second.*",
      "*Just think about how great it will feel once you finally catch one of these!*",
      "*...*"
    ]
    if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
      const noPerm = new client.Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(client.starray.noPerm)
      return message.channel.send(noPerm);
    }
    const gameCount = parseInt(args[0]);
    const fishChance = client.emojis.cache.find(emoji => emoji.name === "srpgshock");
    const fishhit = client.emojis.cache.find(emoji => emoji.name === "fishhit");
    const time = 60000 //amount of time to collect for in milliseconds
    if (isNaN(gameCount)) {
      const needNumber = new client.Discord.MessageEmbed()
        .setColor("#E74C3C")
        .setDescription(client.starray.needNumber)
      return message.channel.send(needNumber);
    }
    let timer = 0;
    let fishLines = 0;

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    for (var i = 0; i < gameCount; i++) {
      fishLines = getRandomInt(10)
      for (var n = 0; n < fishLines; n++) {
        timer = 5 + getRandomInt(10)
        currentLine = fishArray[getRandomInt(24)]
        message.channel.send(currentLine);
      }
      const filter = (reaction, user) => {
        return reaction.emoji.name === '714000390722420756'
      };
      message.channel.send(fishChance).then(() => {
          message.awaitReactions(filter, {
              max: 1,
              time: 10000,
              errors: ['time']
            })
            .then(collected => {
              message.channel.send(`${collected.first().author} wins this round with the biggest fish!`);
            })
            .catch(collected => {
              message.channel.send('Miss...');
            });
          })
        // command ends here
      }
    }