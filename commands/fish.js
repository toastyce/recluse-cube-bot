exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  const fishArray = [
    "*The lines are cast!*",
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
    "*A fish leaped out of the water!*",
    "*The calmness of the water lets you relax a little easier.*",
    "*You feel a tug!*",
    "*...*",
    "*It was just your imagination.*",
    "*You toss your line at a different location, hoping to have better luck over there.*",
    "*The ebb and flow of the waves is mesmerizing.*",
    "*A shadow approaches your line, but turns away at the last second.*",
    "*Just think about how great it will feel once you finally catch one of these!*",
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
    "*...*",
    "*A fish leaped out of the water!*",
    "*The calmness of the water lets you relax a little easier.*",
    "*You feel a tug!*",
    "*...*",
    "*It was just your imagination.*",
    "*You toss your line at a different location, hoping to have better luck over there.*",
    "*The ebb and flow of the waves is mesmerizing.*",
    "*A shadow approaches your line, but turns away at the last second.*",
    "*Just think about how great it will feel once you finally catch one of these!*",
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

  var timer = 0;
  var fishLines = getRandomInt(10);
  var counter = 0;

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  message.channel.send(`${fishArray[0]}`);

  while (counter < fishLines) {

    sleep(timer).then(() => {
      timer = parseInt(5000 + (getRandomInt(5) * 1000));
      message.channel.send(`${fishArray[1 + getRandomInt(23)]}`);
      counter++;
      client.log.debug(`${timer}`);
      client.log.debug(`${counter}`);
      if (counter > fishLines) { return message.channel.send('<:srpgshock:714448190908399626>') };
    });
  }

 

  //.then(async () => {
  // try {
  //   message.awaitReactions({
  //     max: 1,
  //     time: 10000,
  //     errors: ['time']
  //   })
  //     .then(collected => {
  //       message.channel.send(`${collected.first().author} wins this round with the biggest fish!`);
  //     })
  //     .catch(collected => {
  //       message.channel.send('Miss...');
  //       client.log.debug(collected);
  //     });
  // }
  // catch (error) {
  //   client.log.error(error)


};
  // command ends here
