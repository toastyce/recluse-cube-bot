module.exports = (client, message) => {
  client.log.warn(`Potential error detected\n(likely Discord API connection issue)\n`);
  client.log.error(`Client error:\n${error}`);
  };