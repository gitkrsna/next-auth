import createStudents from './createStudents.ts';
import createTeachers from './createTeachers.ts';

const ACTIONS = {
  BULK_CREATE_TEACHER: createTeachers,
  BULK_CREATE_STUDENT: createStudents,
};

export default ACTIONS;
