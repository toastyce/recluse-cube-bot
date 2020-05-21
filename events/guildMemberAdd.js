module.exports = (client, member) => {
  const welcomeMessage = client.config.welcomeMessage.replace("{{user}}", member.user.tag);
  };