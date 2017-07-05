import * as types from './actionTypes';
import courseApi from '../api/mockCoureseApi';
import { beginAjaxCall, errorAjaxCall } from './AjexStatusActions';

// export function createCourse(course) {
//   return {type:types.CREATE_COURSE,course:course};
// }

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSE_SUCCESS, courses};
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw (error);
    });
  };
}

export function saveCourses(course) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCoursesSuccess(savedCourse));
    }).catch(error => {
      dispatch(errorAjaxCall(error));
      throw(error);
    });
  };
}

export function createCoursesSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

