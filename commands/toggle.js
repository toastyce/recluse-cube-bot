exports.run = (client, message, args) => {
  // command starts here
  message.delete();
  if (!message.member.roles.cache.find(r => r.id === client.config.memberRole)) {
    const noPerm = new client.Discord.MessageEmbed()
      .setColor("#E74C3C")
      .setDescription(client.starray.noPerm)
    return message.channel.send(noPerm);
  }
  var roleLength = [];
  message.guild.roles.cache.forEach(role => roleLength.push(`${role.name}`));
  client.log.info(`Position: ${roleLength.length}`);
  if (args[0] == null) return;
  optRole = args[0].toLowerCase();
  const toggle = message.member.id;
  client.log.debug(toggle);

  // Begin switch/case
  switch (toggle) {

    // Musse
    case "49670556760408064":
      client.log.debug("Musse");
      break;

    //Estelle / Juna  
    case "157348124346679297":
      client.log.debug("Estelle");
      if (optRole === "estelle") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710842510502527046')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Estelle Bright").catch(client.log.error))

        return message.channel.send(notTicket);
      } else if (optRole === "juna") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('726238351195111465')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Juna Crawford").catch(client.log.error))

        return message.channel.send(notTicket);
      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket);

      }
      break;

      
    //Ash / Ashley 
    case "180429866166910976":
        client.log.debug("Ash");
        if (optRole === "ash") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723023539078168597')
            .then(role => role.setPosition(roleLength.length - 3)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Ash Carbide").catch(client.log.error))
  
          return message.channel.send(notTicket);
        } else if (optRole === "ashley") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723088413460398130')
            .then(role => role.setPosition(roleLength.length - 3)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Ashley Carbide").catch(client.log.error))
  
          return message.channel.send(notTicket);
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket);
  
        }
        break;
      // Fie / Sara / Ries
    case "705964980847116299":
      client.log.debug("Fie");
      if (optRole === "fie") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('721542188101533806')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Fie Claussell").catch(client.log.error))

        return message.channel.send(notTicket);
      } else if (optRole === "sara") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('723042777092325376')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Sara Valestein").catch(client.log.error))

        return message.channel.send(notTicket);
      }else if (optRole === "toval") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('723067920413884466')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Toval Randonneur").catch(client.log.error))

        return message.channel.send(notTicket);
      }else if (optRole === "renne") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710058944634290226')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Renne Claussell").catch(client.log.error))

        return message.channel.send(notTicket);
      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket);

      }
      break;

      // Millium / Rean
    case "142787202609446913":
      client.log.debug("Millium");
      if (optRole === "millium") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('724432426822271036')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Millium Orion").catch(client.log.error))

        return message.channel.send(notTicket);
      } else if (optRole === "rean") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710296059863367720')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Rean Schwarzer [Sketch]").catch(client.log.error))

        return message.channel.send(notTicket);
      } else if (optRole === "sora") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('730493748080803961')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Sora Ikushima").catch(client.log.error))

        return message.channel.send(notTicket);
      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket);

      }
      break;

      // Wazy / Angelica
    case "338614712566677505":
      client.log.debug("Wazy");
      if (optRole === "wazy") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710097887375392800')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Wazy Hemisphere").catch(client.log.error))

        return message.channel.send(notTicket);
      } else if (optRole === "angelica") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('729935623636516956')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Angelica Rogner").catch(client.log.error))

        return message.channel.send(notTicket);
      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket);

      }
      break;

      // Anelace / Ries
    case "710429131128700968":
      client.log.debug("Anelace");
      if (optRole === "anelace") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('725382368784810014')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Anelace Elfead").catch(client.log.error))

        return message.channel.send(notTicket);
      } else if (optRole === "ries") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('729921961043427404')
          .then(role => role.setPosition(roleLength.length - 3)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Ries Argent").catch(client.log.error))

        return message.channel.send(notTicket);
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