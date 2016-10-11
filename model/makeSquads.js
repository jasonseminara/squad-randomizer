const InstructorChoice = require('./InstructorChoice');

function makeSquads(students, leaderCount, rotations) {
  const maxSquadSize = Math.ceil(students / leaderCount);

  // We must allow repeats if there are more rotations than leaders
  const allowRepeats = leaderCount < rotations;

  // If we just fill([]), each student will get a pointer to the same ONE array (fail)
  let studentRotations = new Array(students).fill(9).map(() => []);

  for (let r = rotations; r > 0; r -= 1) {
    const leaderTokens = new InstructorChoice(leaderCount, maxSquadSize, allowRepeats);

    // go over each student and assign them a random instructor for this rotation
    studentRotations = studentRotations.map((student) => {
      const id = leaderTokens.getValidToken(student);
      student.push(id);
      return student;
    });
  }

  return studentRotations;
}

module.exports = makeSquads;
