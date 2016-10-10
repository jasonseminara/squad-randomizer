const InstructorChoice = require('./InstructorChoice');

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
module.exports = Squads;
