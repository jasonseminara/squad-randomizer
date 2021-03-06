const InvalidConfiguration = require('./InvalidConfiguration');
const BadSquadConfig = require('./BadSquadConfig');
const makeSquads = require('./makeSquads');

class StudentRandomizer {
  constructor(f = 0) {
    this.failures = f;
  }
  /* Self-contained closure that keeps track of how many times an instructor was chosen */

  execute(s, l, r) {
    const sort2DArray = (a, b) => +a.join('') - +b.join('');

    let results;
    let attempts = 0;

    do {
      this.failures = 0;
      attempts += 1;

      // check to see if we've gone crazy.
      if (attempts > 1000) throw new InvalidConfiguration();

      try {
        results = makeSquads(s, l, r);
      } catch (e) {
        if (!(e instanceof BadSquadConfig)) {
          throw e;
        }
        this.failures += 1;
      }
    } while (this.failures);

    console.log('attempts', attempts);
    return results.sort(sort2DArray);
  }
}

module.exports = StudentRandomizer;
