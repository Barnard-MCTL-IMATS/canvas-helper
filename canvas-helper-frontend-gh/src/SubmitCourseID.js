import React, { Component } from 'react';
import { Row, Col,  Button, Panel, PanelGroup, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';


class SubmitCourseID extends Component {
 constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.props.updateCourseID(e.target.value)
  }

  render() {
    return (
        <form>
        <br/>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Enter Course ID</ControlLabel>
            <FormControl placeholder="Enter text" onChange={this.handleChange} />
          </FormGroup>
         </form>        
    );
  }
}

export default SubmitCourseID;
