module.exports = (client, role) => {
  var roleLength = [];
    role.guild.roles.cache.forEach(role => roleLength.push(`${role.name}`) );
    client.log.info(`Position: ${roleLength.length}`);
    role.setPosition(roleLength.length - 4).then(updated => console.log(`Role position: ${updated.position}`))
    .catch(console.error);
  };