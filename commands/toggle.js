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
  
  // Log
  const embed = new client.Discord.MessageEmbed()
  .setAuthor(`${client.user.username}`, client.user.avatarURL)
  .setTitle("Toggle activated")
  .setColor(client.config.colour)
  .addField("Username", message.author, true)
  .addField("Role:", optRole, true)
  .addField("Channel", message.channel.name, true)
  .setFooter(client.starray.footer.replace("{{version}}", `${client.version}`))
  .setTimestamp();
client.channels.cache.get(client.config.logChannel).send({
  embed
})

// Begin switch/case
  switch (toggle) {

    // Musse
    case "49670556760408064":
      if (optRole === "musse") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#9dee74")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710059143641170021')
          .then(role => role.setPosition(roleLength.length - 4)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Musse Egret").catch(client.log.error))
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      } else if (optRole === "mildine") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#9dee74")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710059143641170021')
          .then(role => role.setPosition(roleLength.length - 4)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Mildine Juzalith de Cayenne").catch(client.log.error))
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

      }
      break;

          // duvalie
    case "442377941670952982":
      if (optRole === "duvalie") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#9dee74")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710843767061479484')
          .then(role => role.setPosition(roleLength.length - 4)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Duvalie The Swift").catch(client.log.error))
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      } else if (optRole === "doobs") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#9dee74")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('710843767061479484')
          .then(role => role.setPosition(roleLength.length - 4)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Duvalie The Swift").catch(client.log.error))
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      }else if (optRole === "noel") {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#9dee74")
          .setDescription(client.starray.roleUp)
        message.guild.roles.fetch('744772391313604680')
          .then(role => role.setPosition(roleLength.length - 4)
            .then(updated => console.log(`Role position: ${updated.position}`))
            .catch(console.error)
          ).then(message.member.setNickname("Noel Seeker").catch(client.log.error))
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      } else {
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.wrongRole)
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

      }
      break;

            //Renne / Altina
            case "294526351300493314":
              client.log.debug("Renne");
              if (optRole === "renne") {
                const notTicket = new client.Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(client.starray.roleUp)
                message.guild.roles.fetch('710058944634290226')
                  .then(role => role.setPosition(roleLength.length - 4)
                    .then(updated => console.log(`Role position: ${updated.position}`))
                    .catch(console.error)
                  ).then(message.member.setNickname("Renne Bright").catch(client.log.error))
      
                return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
              } else if (optRole === "altina") {
                const notTicket = new client.Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(client.starray.roleUp)
                message.guild.roles.fetch('710296422020415580')
                  .then(role => role.setPosition(roleLength.length - 4)
                    .then(updated => console.log(`Role position: ${updated.position}`))
                    .catch(console.error)
                  ).then(message.member.setNickname("Altina Orion").catch(client.log.error))
      
                return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
              }else {
                const notTicket = new client.Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(client.starray.wrongRole)
                return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      
              }
              break;          
                  //Towa
            case "144604065509146627":
              client.log.debug("Towa");
              if (optRole === "towa") {
                const notTicket = new client.Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(client.starray.roleUp)
                message.guild.roles.fetch('723043859113836556')
                  .then(role => role.setPosition(roleLength.length - 4)
                    .then(updated => console.log(`Role position: ${updated.position}`))
                    .catch(console.error)
                  ).then(message.member.setNickname("Towa Herschel").catch(client.log.error))
      
                return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
              } else if (optRole === "b") {
                const notTicket = new client.Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(client.starray.roleUp)
                message.guild.roles.fetch('749003862454566972')
                  .then(role => role.setPosition(roleLength.length - 4)
                    .then(updated => console.log(`Role position: ${updated.position}`))
                    .catch(console.error)
                  ).then(message.member.setNickname("Bleublanc").catch(client.log.error))
      
                return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
              }else {
                const notTicket = new client.Discord.MessageEmbed()
                  .setColor("#E74C3C")
                  .setDescription(client.starray.wrongRole)
                return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
      
              }
              break;        
               //Renne / Altina
      case "172857701255086080":
        client.log.debug("Renne");
        if (optRole === "crow") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('739630229215117414')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Crow Armbrust").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "alfin") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('729402685782229063')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Alfin Reise Arnor").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else if (optRole === "swin") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('748504737825161306')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Swin Abel").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

        }
        break;

      //Estelle / Juna  
      case "157348124346679297":
        client.log.debug("Estelle");
        if (optRole === "estelle") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('710842510502527046')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Estelle Bright").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "juna") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('726238351195111465')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Juna Crawford").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else if (optRole === "oli") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('714881982110367794')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Olivert Reise Arnor").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

        }
        break;


      //Joshua / Kurt  
      case "696634710146809917":
        client.log.debug("Joshua");
        if (optRole === "joshua") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('749593326705180762')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Joshua Bright [Bialga]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "kurt") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('734049886701486080')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Kurt Vander").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

        }
        break;

      //Joshua / Rixia / Randy  
      case "160150246934970368":
        client.log.debug("Joshua");
        if (optRole === "joshua") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('724785664331087933')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Joshua Bright [Grapey]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "rixia") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('740020772671717416')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Rixia Mao [Grapey]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else if (optRole === "randy") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('729841536359071865')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Randy Orlando [Grapey]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

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
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Ash Carbide").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "ashley") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723088413460398130')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Ashley Carbide").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "shirley") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('731639682672230411')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Shirley Orlando").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else if (optRole === "nadia") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723042835397607475')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Nadia Rayne").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

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
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Fie Claussell").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "sara") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723042777092325376')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Sara Valestein").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "toval") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723067920413884466')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Toval Randonneur").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "lavot") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('723067920413884466')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("lavoT ruennodnaR").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "renne") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('710058944634290226')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Renne Claussell").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

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
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Millium Orion [Sketch]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "rean") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('710296059863367720')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Rean Schwarzer [Sketch]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "sora") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('730493748080803961')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Sora Ikushima").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "alisa") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('738588958224547850')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Alisa Reinford [Sketch]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

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
              .then(role => role.setPosition(roleLength.length - 4)
                .then(updated => console.log(`Role position: ${updated.position}`))
                .catch(console.error)
              ).then(message.member.setNickname("Wazy Hemisphere").catch(client.log.error))
  
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
          } else if (optRole === "angelica") {
            const notTicket = new client.Discord.MessageEmbed()
              .setColor("#E74C3C")
              .setDescription(client.starray.roleUp)
            message.guild.roles.fetch('729935623636516956')
              .then(role => role.setPosition(roleLength.length - 4)
                .then(updated => console.log(`Role position: ${updated.position}`))
                .catch(console.error)
              ).then(message.member.setNickname("Angelica Rogner").catch(client.log.error))
  
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
          }else if (optRole === "lloyd") {
            const notTicket = new client.Discord.MessageEmbed()
              .setColor("#E74C3C")
              .setDescription(client.starray.roleUp)
            message.guild.roles.fetch('712108701816717382')
              .then(role => role.setPosition(roleLength.length - 4)
                .then(updated => console.log(`Role position: ${updated.position}`))
                .catch(console.error)
              ).then(message.member.setNickname("Lloyd Bannings [Syoudre]").catch(client.log.error))
  
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
          } else {
            const notTicket = new client.Discord.MessageEmbed()
              .setColor("#E74C3C")
              .setDescription(client.starray.wrongRole)
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
  
          }
        break;

                // Rean / Lechter
      case "224923884565168138":
        client.log.debug("Rean-Xmas");
        if (optRole === "rean") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('733720696387141633')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Rean Schwarzer [Xmas]").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "lechter") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('733579585781760060')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Lechter Arundel").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        }else if (optRole === "jusis") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('737049386437181522')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Jusis Albarea").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

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
              .then(role => role.setPosition(roleLength.length - 4)
                .then(updated => console.log(`Role position: ${updated.position}`))
                .catch(console.error)
              ).then(message.member.setNickname("Anelace Elfead").catch(client.log.error))
  
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
          } else if (optRole === "ries") {
            const notTicket = new client.Discord.MessageEmbed()
              .setColor("#E74C3C")
              .setDescription(client.starray.roleUp)
            message.guild.roles.fetch('729921961043427404')
              .then(role => role.setPosition(roleLength.length - 4)
                .then(updated => console.log(`Role position: ${updated.position}`))
                .catch(console.error)
              ).then(message.member.setNickname("Ries Argent").catch(client.log.error))
  
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
          } else {
            const notTicket = new client.Discord.MessageEmbed()
              .setColor("#E74C3C")
              .setDescription(client.starray.wrongRole)
            return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
  
          }
          break;
                  // Sharon / Campanella
      case "277980829387456512":
        client.log.debug("Sharon");
        if (optRole === "sharon") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('728254793818046545')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Sharon Krueger").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "lapis") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('749597224480145408')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Lapis Rosenberg").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "campy") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('734368922698252288')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Campanella").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "campanella") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('734368922698252288')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Campanella").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else if (optRole === "vita") {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.roleUp)
          message.guild.roles.fetch('742937323611619378')
            .then(role => role.setPosition(roleLength.length - 4)
              .then(updated => console.log(`Role position: ${updated.position}`))
              .catch(console.error)
            ).then(message.member.setNickname("Vita Clotilde").catch(client.log.error))

          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
        } else {
          const notTicket = new client.Discord.MessageEmbed()
            .setColor("#E74C3C")
            .setDescription(client.starray.wrongRole)
          return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));

        }
        break;
      default:
        client.log.debug("No Role");
        const notTicket = new client.Discord.MessageEmbed()
          .setColor("#E74C3C")
          .setDescription(client.starray.noMulti)
        return message.channel.send(notTicket).then(r => r.delete({ timeout: 5000 }));
  }

  // command ends here
}