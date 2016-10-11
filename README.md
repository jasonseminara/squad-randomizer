# Squad Randomizer

Divides a classroom of students into squads with r rotations, limited by some max squad size and prevents students from visiting the same instructor across rotations.


## Generalization
Put more generally, this builds a matrix of `s` rows x `r` columns, where `s` is each student, and `r` is each rotation. The data at each cell represents one of each instructor. 

The matrix contains the following constraints: 
  1. no row can have a repeat (a student should not visit the same instructor twice)
  2. each column must maintain ceil(students.length/instructors) (each squad size should be limited) 
  3. *rows should not repeat (students should not travel together in sub-groups)

>note: 3 is not implemented and may not be possible.

###Warning!!
**Some numeric combinations below may not have a solution!!**

## Examples
```
// 1: outputs a csv file representing 55 students, 5 instructors, 4 rotations:
$ node randomizer.js 55 5 4 csv

// 2: outputs a txt file representing 60 students, 5 instructors, 3 rotations:
$ node randomizer.js 60 5 3

// 3: outputs a json file representing 30 students, 4 instructors, 4 rotations:
$ node randomizer.js 30 4 4 json
```
