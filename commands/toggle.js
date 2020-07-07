exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
    const noPerm = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.noPerm)
    return message.channel.send(noPerm);
  }
  optRole = args[0];
  const toggle = message.member.id;
  client.log.debug(toggle);
  switch (toggle) {
    case 49670556760408064:
      client.log.debug("Musse");
      break;
    case 157348124346679297:
      client.log.debug("Estelle");
      // code block
      break;
    case 705964980847116299:
      client.log.debug("Fie");
      // code block
      break;
    case 142787202609446913:
      client.log.debug("Millium");
      // code block
      break;
    case 338614712566677505:
      client.log.debug("Wazy");
      // code block
      break;
    case "710429131128700968":
      client.log.debug("Anelace");
      if (optRole === "Anelace") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.footer)
        return message.channel.send(notTicket);
      } else if (optRole === "Ries") {

      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.incorrectChannel)
        return message.channel.send(notTicket);

      }
      // 'Anelace'
      // -- Set nickname : "Anelace Elfead"
      // -- fetch role for Anelace
      // -- set role position to top
      // 'Ries'
      // -- Set nickname : "Ries Argent"
      // -- fetch role for Ries
      // -- set role position to top
      break;
    default:
      client.log.debug("No Role");
  }

  // command ends here
}