import React, { Component } from 'react';
import { Row, Col,  Button, Panel, PanelGroup, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import SubmitCourseID from './SubmitCourseID'
import EmailList from './EmailList'


class App extends Component {
  constructor(props, context) {
    super(props, context);
    // <EmailList updateStudentEmails = {this.updateStudentEmails} emails = {this.state.data} />
    this.updateCourseID = this.updateCourseID.bind(this);
    this.updateStudentEmails = this.updateStudentEmails.bind(this)
    this.state = {
      course_id: '',
      data: null
    };
  }

  updateCourseID(course_id){
    this.setState({ course_id: course_id})
  }

  updateStudentEmails(course_id){
    // http://localhost:5000/names?course_id=63844
    var url = 'http://localhost:5000/emails?course_id=' + course_id
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data }));  
  }

  componentDidUpdate(prevProps){
    var id = this.state.course_id
    this.updateStudentEmails(id)
  }


  render(){
    return (
      <div className="App" class="col-md-6">
          <SubmitCourseID updateCourseID = {this.updateCourseID} />
          <EmailList updateStudentEmails = {this.updateStudentEmails} emails = {this.state.data} />
      </div>
    );
  }
}

export default App;
