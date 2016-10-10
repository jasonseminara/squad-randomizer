class BadSquadConfig extends Error {
  constructor() {
    super('Could Not find a suitable squad layout');
  }
}

class InstructorChoice {
  constructor(leadCount, maxCount) {
    this.leadCount = leadCount;
    this.leads = new Array(leadCount).fill(maxCount);
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

    if (!student.includes(id)) {
      this.use(id);
      return id;
    }

    return this.getValidToken(student, n + 1);
  }
}

class Squads {
  constructor(students, leaderCount, r) {
    this.leaderCount = leaderCount;
    this.rotations = r;
    this.studentRotations = new Array(students).fill(9).map(() => []);
    this.MAX_SQUAD_SIZE = Math.ceil(students / leaderCount);
  }

  randomize() {
    while (this.rotations > 0) {
      this.rotations -= 1;
      const leaderTokenCounter = new InstructorChoice(this.leaderCount, this.MAX_SQUAD_SIZE);

      this.studentRotations = this.studentRotations.map((student) => {
        const id = leaderTokenCounter.getValidToken(student);
        student.push(id);
        // console.log(i,student)
        return student;
      });
    }

    return this.studentRotations;
  }
}


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
      try {
        results = new Squads(s, l, r).randomize();
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


console.log(new StudentRandomizer().execute(56, 5, 4));
