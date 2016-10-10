# Squad Randomizer

Divides a classroom of students into squads with r rotations, limited by some max squad size and prevents students from visiting the same instructor across rotations.


## Generalization
Put more generally, this builds a matrix of `s` rows x `r` columns, where `s` is each student, and `r` is each rotation. The data at each cell represents one of each instructor. 

The matrix contains the following constraints: 
  1. no row can have a repeat (a student should not visit the same instructor twice)
  2. each column must maintain ceil(students.length/instructors) (each squad size should be limited) 
  3. *rows should not repeat (students should not travel together in sub-groups)

>note: 3 is not implemented and may not be possible.
