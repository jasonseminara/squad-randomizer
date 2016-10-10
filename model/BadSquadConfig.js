class BadSquadConfig extends Error {
  constructor() {
    super('Could Not find a suitable squad layout');
  }
}

module.exports = BadSquadConfig;
