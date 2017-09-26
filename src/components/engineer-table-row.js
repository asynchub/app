import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableCell from './engineer-table-cell';
import _ from 'lodash';

import {
  addPart,
  copyPart_UI,
  removePart_UI
} from '../actions/index';


/* // if i can use event.target value of input HTML element, then not needed to
// make CheckBox component to get id of selected part in table
function CheckBox(props) {
  return (
    <input type="checkbox" id={props.partId} onClick={event => handleCheckBoxClick(event)} />
  );
}

function handleCheckBoxClick(event) {
  console.log(event.target.id);
}
*/


class TableRow extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   checkedParts: {}
    // }
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  handleCheckBoxClick(event) {
    this.props.onCheckBoxClick(event);
  }

  render() {

    const { parts } = this.props;
    if (!parts) { return null; }

    const { id } = this.props;
    const part = parts.byId[id];
    if (!part) { return null; } // for asyncronosity of removePart action

    const { editable } = this.props;
    // console.log("from TableRow:", parts);

    if (this.props.editable) {
      return (
        <tr>
          <td><input type="checkbox" id={id} onClick={this.handleCheckBoxClick} /></td>
          <td>nr</td>
          <TableCell partId={id} editable={editable} partProperty="title" />
          <TableCell partId={id} editable={editable} partProperty="description" />
          <TableCell partId={id} editable={editable} partProperty="qtyTotal" />
          <TableCell partId={id} editable={editable} partProperty="material" />
          <TableCell partId={id} editable={editable} partProperty="materialStd" />
          <TableCell partId={id} editable={editable} partProperty="profile" />
          <TableCell partId={id} editable={editable} partProperty="profileSize" />
          <TableCell partId={id} editable={editable} partProperty="profileStd" />
          <TableCell partId={id} editable={editable} partProperty="length" />
          <TableCell partId={id} editable={editable} partProperty="width" />
          <TableCell partId={id} editable={editable} partProperty="weightOfEach" />
          <TableCell partId={id} editable={editable} partProperty="processes" />
          <td>notenote</td>
        </tr>
      );
    }
    return (
      <tr>
        <td><input type="checkbox" id={id} onClick={this.handleCheckBoxClick} checked={this.props.checkBoxChecked} /></td>
        <td>nr</td>
        <TableCell partId={id} partProperty="title" />
        <TableCell partId={id} partProperty="description" />
        <TableCell type="number" partId={id} partProperty="qtyTotal" />
        <TableCell partId={id} partProperty="material" />
        <TableCell partId={id} partProperty="materialStd" />
        <TableCell partId={id} partProperty="profile" />
        <TableCell partId={id} partProperty="profileSize" />
        <TableCell partId={id} partProperty="profileStd" />
        <TableCell partId={id} partProperty="length" />
        <TableCell partId={id} partProperty="width" />
        <TableCell partId={id} partProperty="weightOfEach" />
        <TableCell partId={id} partProperty="processes" />
        <td>notenote</td>
      </tr>
    );

  }

}

function mapStateToProps( { parts, clipBoard_UI } ) {
  return { parts, clipBoard_UI };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPart,
    copyPart_UI,
    removePart_UI
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
