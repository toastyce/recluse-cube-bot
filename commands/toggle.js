exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
    const noPerm = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.noPerm)
    return message.channel.send(noPerm);
  }
  optRole = args[0].tolowerCase();
  const toggle = message.member.id;
  client.log.debug(toggle);

  // Begin switch/case
  switch (toggle) {

    // Musse
    case "49670556760408064":
      client.log.debug("Musse");
      break;
    case "157348124346679297":
      client.log.debug("Estelle");
      // code block
      break;

      // Fie / Sara / Ries
    case "705964980847116299":
      client.log.debug("Fie");
      // code block
      break;

      // Millium / Rean
    case "142787202609446913":
      client.log.debug("Millium");
      // code block
      break;

      // Wazy / Angelica
    case "338614712566677505":
      client.log.debug("Wazy");
      // code block
      break;
      
      // Anelace / Ries
    case "710429131128700968":
      client.log.debug("Anelace");
      if (optRole === "anelace") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        return message.channel.send(notTicket);
      } else if (optRole === "Ries") {

      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket);

      }
      break;
    default:
      client.log.debug("No Role");
      const notTicket = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.noMulti)
    return message.channel.send(notTicket);
  }

  // command ends here
}