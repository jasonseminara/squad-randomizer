function studentRandomizer(f = 0) {
  let failures = f;
  /* Self-contained closure that keeps track of how many times an instructor was chosen */
  function instructorChoice(leadCount, maxCount) {
    const leads = new Array(leadCount).fill(maxCount);

    const use = (pos) => {
      const r = (leads[pos] > 0) ? leads[pos] -= 1 : false;
      return r;
    };

    const getNext = () => {
      let pos;
      // gen a random number
      while (leads.some(x => x > 0)) {
        pos = Math.floor(Math.random() * leadCount);
        // console.log(pos, this.leads);
        if (leads[pos]) break;
      }
      return pos;
    };

    const getValidToken = (student, n = 0) => {
      const id = getNext();
      // console.log('getValidToken', student, n, id)
      if (n > 100) {
        failures += 1;
        return 9;
      }

      if (!student.includes(id)) {
        use(id);
        return id;
      }

      return getValidToken(student, n + 1);
    };

    /* Once a number is chosen, we're free to use it */
    return { getNext, getValidToken };
  }

  function randomizeSquads(students, leaderCount, rotations) {
    let r = rotations;
    let studentRotations = new Array(students).fill(9).map(() => []);
    const MAX_SQUAD_SIZE = Math.floor(students / leaderCount);

    while (r > 0) {
      r -= 1;
      const leaderTokenCounter = instructorChoice(leaderCount, MAX_SQUAD_SIZE);

      studentRotations = studentRotations.map((student) => {
        const id = leaderTokenCounter.getValidToken(student);
        student.push(id);
        // console.log(i,student)
        return student;
      });
    }

    return studentRotations;
  }

  function execute(s, l, r) {
    let results;
    do {
      failures = 0;
      results = randomizeSquads(s, l, r);
    } while (failures);

    return results.sort((a, b) => (+a.join('') - +b.join('')));
  }

  return { execute };
}


console.log(studentRandomizer().execute(55, 5, 4));
