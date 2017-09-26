import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  editCell,
  fetchPartsFromDB
} from '../actions/index';


function Input(props) {
  const defaultValue = props.defaultValue
  return (
    <input
      type={props.type}
      size={(!defaultValue) ? 10 : (defaultValue.length * 1.2) }

      onMouseLeave={props.handleDeactivateEdit}
      onChange={props.handleChange}
      onKeyUp={props.handleSubmitEdit}
      onClick={props.handleActivateEdit}

      defaultValue={defaultValue}>
    </input>
  );
}


class TableCell extends Component {
  constructor(props) {
    super(props);
    this.submitEdit = this.submitEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.activateEdit = this.activateEdit.bind(this);
    this.deactivateEdit = this.deactivateEdit.bind(this);
    this.state = {
      edit: false,
      value: ''
    }
  }

  activateEdit(event) {
    // console.log("activateEdit called", event.target.value);
    this.setState({ value: event.target.value, edit: true });
  }

  deactivateEdit(event) {
    this.setState({ value: event.target.value, edit: false });
  }

  submitEdit(event) {
    if (event.key === 'Enter') {
      const { partId, partProperty } = this.props;
      // console.log("handleEdit called");
      this.props.editCell(partId, partProperty, this.state.value); // this.props.row, this.props.column, "hi"
      this.setState({ edit: false });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  render() {
    // console.log("rendered TableCell");
    // console.log(this.state.edit);
    const { parts, partId, partProperty } = this.props;
    const part = parts.byId[partId];
    const cellValue = part[partProperty];
    if (!this.state.edit) {
      return (
        <td onClick={this.activateEdit}>{cellValue}</td>
      );
    }
    console.log(this.props.type);
    return (
      <td >
        <Input
        type={this.props.type}

        handleDeactivateEdit={this.deactivateEdit}
        handleChange={this.handleChange}
        handleSubmitEdit={this.submitEdit}
        handleActivateEdit={this.activateEdit}

        defaultValue={cellValue}/>
      </td>
    );
  }

}

function mapStateToProps({ parts }) {
  return { parts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editCell,
    fetchPartsFromDB
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);
