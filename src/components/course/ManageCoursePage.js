import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving:false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.course.id != nextProps.course.id){
      this.setState({course:Object.assign({},nextProps.course)});
    }
  }

  courseFormIsValid(){
    let formIsValid = true;
    let errors = {};

    if(this.state.course.title.length < 5){
      errors.title = 'Title must be at least 5 Charectors';
      formIsValid = false;
    }

    this.setState({errors:errors});
    return formIsValid;
  }
  saveCourse(event){
    if (!this.courseFormIsValid()) {
      return;
    }
    event.preventDefault();
    this.setState({saving:true});
    this.props.actions.saveCourses(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving:false});
      });

  }

  redirect(){
    this.setState({saving:false});
    toastr.success('Course Saved');
    this.context.router.push('/courses');
  }

  updateCourseState(event){
    const field = event.target.name;
    let course = this.state.course;
    course[field]= event.target.value;
    return this.setState({course:course});
  }

  render() {
    return (
      <CourseForm course={this.state.course}
                  errors={this.state.errors}
                  allAuthors={this.props.authors}
                  onSave={this.saveCourse}
                  onChange={this.updateCourseState}
                  saving={this.state.saving}
        />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions:PropTypes.object.isRequired

};

ManageCoursePage.contextTypes={
  router:PropTypes.object
};

function getCoursesById(courses, id) {
  const course = courses.filter(course => {
    return course.id == id;
  });

  if(course.length){
    return course[0];
  } else {
    return null;
  }
}

function mapStateToProps(state, ownProps) {

  // data transformation goes here some time in api data have diffrent structure but to use that we need to
  // transform that so it is the good place to do that

  const courseId=ownProps.params.id; // from the path course/:id

  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    length: '',
    category: ''
  };

  if(courseId && state.courses.length > 0){
    course = getCoursesById(state.courses, courseId);
  }

  const authorsFormatedForDropDown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormatedForDropDown

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
