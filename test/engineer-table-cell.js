import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import _ from 'lodash';

import DropdownMulti from './engineer-table-dropdown-multi';

import {
  editCell,
  fetchPartsFromDB,
  buildPartsTreeOfPartsFromDB
} from '../actions/index';


class Input extends Component {

  constructor(props) {
    super(props);
    this.moveCaretAtEndWithDefaultValue = this.moveCaretAtEndWithDefaultValue.bind(this);
  }

  moveCaretAtEndWithDefaultValue(event) {
    event.target.value = '';
    event.target.value = this.props.defaultValue;
  }

  render() {
    const defaultValue = this.props.defaultValue;
    return (
      <input
        autoFocus
        onFocus={this.moveCaretAtEndWithDefaultValue}
        type={this.props.type}
        style={ { width: this.props.width ? this.props.width :  64 } }
        size={(!defaultValue) ? 10 : (defaultValue.length * 1.2) }
        onChange={this.props.handleChange}
        onKeyUp={this.props.handleSubmitEdit}
        onClick={this.props.handleActivateEdit}
        defaultValue={defaultValue}>
      </input>
    );
  }

}



function Select(props) {
  const options = props.options.map(option => {
    return <option key={option} value={option}>{option}</option>
  });

  return (
    <select
      autoFocus
      onClick={props.handleActivateEdit}
      onKeyUp={props.handleSubmitEdit}
      defaultValue={props.defaultValue}
      onChange={props.handleSubmitEdit}>
      {options}
    </select>
  )
}


// for use from engineer-sortabletree-driving: // not used, develop as buttons group futher?
function TreeNodeButton(props) {
  return (
    <button
      // autoFocus
      onClick={props.handleActivateEdit}
      onKeyUp={props.handleSubmitEdit}
      defaultValue={props.defaultValue}
      onChange={props.handleSubmitEdit} >
    </button>
  )
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
    this.setState({ value: event.target.value, edit: true });
  }

  deactivateEdit(event) {
    this.setState({ value: event.target.value, edit: false });
  }

  submitEdit(event, data) {

    const {
      partId,
      partProperty,
      partInflProp, partInflPropCriterion,
      partInflProp2, partInflPropCriterion2,
    } = this.props;

    var value = null;
    if (data && data.placeholder === "Processes") {
      value = data.value;
      this.props.editCell(partId, partProperty, /*event.target.*/value);
    } else {
      value = event.target.value;
    }

    if (event.key === 'Enter' ||
        event.key === 'tab' ||
        event.target.type === 'select-one' ||
        event.type === 'mouseleave') {
      this.props.editCell(partId, partProperty, value);

      if (partInflProp) {
        this.props.editCell(
          partId,
          partInflProp,
          (partInflPropCriterion[value].length === 1) ?
          partInflPropCriterion[value][0] : ''
        );
      }
      if (partInflProp2) {
        this.props.editCell(
          partId,
          partInflProp2,
          (partInflPropCriterion2[value].length === 1) ?
          partInflPropCriterion2[value][0] : ''
        );
      }
      this.setState({ edit: false });
    }

    if (event.key === 'Backspace' && event.target.type === "select-one") {
      this.props.editCell(partId, partProperty, ''); // this.props.row, this.props.column, "hi"
      this.setState({ edit: false });
    }
    // console.log("submitEdit called, buildPartsTreeOfPartsFromDB called");
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  render() {
    const { parts, partId, partProperty } = this.props;
    const part = parts.byId[partId];

    var cellValue = part[partProperty];

    if (Array.isArray(cellValue)) {
      cellValue = cellValue.join(', ');
    }

    if (!this.state.edit) {
      // for use from engineer-sortabletree-driving: repeated because of td -> div only
      if (this.props.type === "treeNodeInput") {
        return (
          <div onClick={this.activateEdit}>{cellValue}</div>
        );
      }
      if (this.props.type === "number") {
        const width = this.props.width ? this.props.width : null; // is null ok here?
        return (
          <td
          onClick={this.activateEdit}
          style={{ width: width }}
          >
            {cellValue}
          </td>
        );
      }

      return (
        <td onClick={this.activateEdit}>{cellValue}</td>
      );
    }


    if (this.props.type === "select") {
      const options = this.props.options;
      return (
        <td
        onMouseLeave={this.deactivateEdit}>
          <Select
            handleDeactivateEdit={this.deactivateEdit}
            handleChange={this.handleChange}
            handleSubmitEdit={this.submitEdit}
            handleActivateEdit={this.activateEdit}
            defaultValue={cellValue}
            options={options} />
        </td>
      );
    }

    if (this.props.type === "drpdwn") {
      return (
        <td
        onMouseLeave={this.deactivateEdit}>
          <DropdownMulti
            handleDeactivateEdit={this.deactivateEdit}
            handleChange={this.handleChange}
            handleSubmitEdit={this.submitEdit}
            handleActivateEdit={this.activateEdit}
            defaultValue={part[partProperty]}
            options={this.props.options} />
        </td>
      );
    }

    // for use from engineer-sortabletree-driving: repeated because of td -> div only
    if (this.props.type === "treeNodeInput") {
      return (
        <div
        onMouseLeave={this.deactivateEdit} >
          <Input
            type={this.props.type}
            handleDeactivateEdit={this.deactivateEdit}
            handleChange={this.handleChange}
            handleSubmitEdit={this.submitEdit}
            handleActivateEdit={this.activateEdit}
            defaultValue={cellValue}/>
        </div>
      );
    }
    if (this.props.type === "number") {
      return (
        <td
        onMouseLeave={this.deactivateEdit} >
          <Input
            type={this.props.type}
            width={this.props.width}
            handleDeactivateEdit={this.deactivateEdit}
            handleChange={this.handleChange}
            handleSubmitEdit={this.submitEdit}
            handleActivateEdit={this.activateEdit}
            defaultValue={cellValue}/>
        </td>
      );
    }

    return (
      <td
      onMouseLeave={this.deactivateEdit} >
        <Input
          type={this.props.type}
          width={this.props.width}
          handleDeactivateEdit={this.deactivateEdit}
          handleChange={this.handleChange}
          handleSubmitEdit={this.submitEdit}
          handleActivateEdit={this.activateEdit}
          defaultValue={cellValue}/>
      </td>
    );
  }

}


function mapStateToProps({ parts, materials }) {
  return { parts, materials };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editCell,
    fetchPartsFromDB,
    buildPartsTreeOfPartsFromDB
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableCell);
