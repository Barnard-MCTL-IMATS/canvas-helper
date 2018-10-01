import React, { Component } from 'react';
import { Row, Col,  Button, Panel, PanelGroup, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';




class EmailList extends Component {
 constructor(props, context) {
    super(props, context);
    this.state = {
      data: null
    };
  }


  handleChange(e) {
    this.props.updateStudentEmails(e.target.value)
  }


  updateStudentEmails(course_id){
    // http://localhost:5000/names?course_id=63844
    var url = 'http://localhost:5000/names?course_id=' + course_id
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }


  renderNames(){
    var data  = this.props.emails

    if (data == null){
        return ''
    }else{
        var emails = data.map((d) => <li>{d}</li>); 
        return emails
    }
  }


  render() {
    return (
    
      <div>
          {this.renderNames()}
      </div>
    );
  }
}

export default EmailList;