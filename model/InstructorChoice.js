const BadSquadConfig = require('./BadSquadConfig');

class InstructorChoice {
  constructor(leadCount, maxCount, allowRepeats) {
    this.leadCount = leadCount;
    this.leads = new Array(leadCount).fill(maxCount);
    this.allowRepeats = allowRepeats;
  }

  use(pos) {
    const r = (this.leads[pos] > 0) ? this.leads[pos] -= 1 : false;
    return r;
  }

  getNext() {
    let pos;
    // gen a random number
    while (this.leads.some(x => x > 0)) {
      pos = Math.floor(Math.random() * this.leadCount);
      // console.log(pos, this.leads);
      if (this.leads[pos]) break;
    }
    return pos;
  }

  getValidToken(student, n = 0) {
    const id = this.getNext();
    // console.log('getValidToken', student, n, id)
    if (n > 100) throw new BadSquadConfig();

    // if I disallow repeats and find a repeat, stop the presses!
    if (this.allowRepeats || !student.includes(id)) {
      this.use(id);
      return id;
    }

    return this.getValidToken(student, n + 1);
  }
}
module.exports = InstructorChoice;
