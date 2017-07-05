import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursePage extends React.Component{

  constructor(props, context){
    super(props, context);

    this.state={
      course:{title:""}
    };

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);

    // this.onTitleChange = this.onTitleChange.bind(this); // this can be done  in render and work as well be there is one
    // this.onClickSave = this.onClickSave.bind(this);     // down side that caouse performance issue
  }

  // onClickSave(){
  //   //alert(`Saving ${this.state.course.title}`); since we have not injected that second param in connect so
  //   // along with prop there is dispatch also available
  //   //this.props.dispatch(courseActions.createCourse(this.state.course));
  //   this.props.actions.createCourse(this.state.course); // if we use two parameter
  // }

  // onTitleChange(e){
  //
  //   const course = this.state.course;
  //   course.title = e.target.value;
  //   this.setState({course:course});
  // }

  courseRow(course, index){
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage(){
    browserHistory.push('/course');
  }

  render() {
    const {courses} =this.props;
    return (
      <div>

        <h1>Courses</h1>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={courses}/>


        {/*<h1>Course List</h1>*/}
        {/*{this.props.courses.map(this.courseRow)}*/}
        {/*<h2>Add Course</h2>*/}
        {/*<input type="text" onChange={this.onTitleChange} value={this.state.course.title}/>*/}
        {/*<input type="submit" value="save" onClick={this.onClickSave}/>*/}

      </div>
    );
  }
}

CoursePage.propTypes = {
  //dispatch: PropTypes.func.isRequired, if we use two parameter then this is no more required
  //actions:PropTypes.object.isRequired,
  courses:PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    courses:state.courses
  };
}

function mapDispatchToProps(dispatch){
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course))
    actions:bindActionCreators(courseActions,dispatch)
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(CoursePage);

//export default connect(mapStateToProps)(CoursePage);
