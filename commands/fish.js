exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  const values = Object.values(client.fish)

  if (!message.member.roles.cache.find(r => r.id === client.config.fishRole)) {
    const noPerm = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.noPerm)
    return message.channel.send(noPerm);
  }

  var counter = getRandomInt(1 + 10);
  var output = [];

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  client.log.debug(`${counter}`);

  output.push(client.fish._0)
  for (var i = 0; i < counter; i++) {
    const randomValue = values[parseInt(Math.random() * values.length)]
    output.push(randomValue)
  }

  function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
  }

  output.forEach(async (item) => {
    try {
      var timer = 5000 + (getRandomInt(5) * 1000);
      client.log.debug(`${timer}`);      
      await message.channel.send(item).then(client.log.debug(item));
      sleep(timer);  
    }
    catch (error) {
      client.log.error(error);
    }
  })

  message.channel.send('<:srpgshock:714448190908399626>');

  //TODO: reactions and scoring

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
