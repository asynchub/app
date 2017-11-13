import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableCell from './engineer-table-cell';

import {
  addPart,
  copyPart_UI,
  removePart_UI
} from '../actions/index';


class TableRow extends Component {
  constructor(props) {
    super(props);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  handleCheckBoxClick(event) {
    this.props.onCheckBoxClick(event);
  }

  render() {

    const { parts, materials, processes, id } = this.props;

    if (!parts) { return null; }

    const part = parts.byId[id];
    if (!part) { return null; }

    return (
      // on type="select" drop value if it does not comply to filter option value
      // can pass partInflProp to change the value of that cell accordingly
      //
      // because of engineer-sortabletree-driving these first columns are omitted from table:
      /*
      <td><input type="checkbox" id={id} onClick={this.handleCheckBoxClick} checked={this.props.checked} /></td>
      <td>nr</td>
      <TableCell partId={id} partProperty="title" />

      <TableCell
        partId={id}
        options={parts.allIds.map(id => {
          if (parts.byId[id]) { return parts.byId[id].title; }
          return ""
        })}
        partProperty="parentId" // from Assembly
        type="select" />
      <TableCell partId={id} partProperty="description" />

      <TableCell
        partId={id}
        partProperty="qtyInParentAssembly"
        type="number" />
      */
      <tr>


        <TableCell
          partId={id}
          options={
            materials.gradesByGradeStd[part.materialStd] ?
            materials.gradesByGradeStd[part.materialStd] : materials.allGrades
          }
          partProperty="material"
          partInflProp="materialStd"
          partInflPropCriterion={materials.gradeStdsByGrade}
          part={part}
          type="select"/>

        <TableCell
          partId={id}
          options={materials.allGradesStds}
          partProperty="materialStd"
          partInflProp="material"
          partInflPropCriterion={materials.gradesByGradeStd}
          part={part}
          type="select" />

        <TableCell partId={id} options={
          materials.profilesByToleranceStds[part.profileStd] ?
          materials.profilesByToleranceStds[part.profileStd] : materials.allProfiles}
          partProperty="profile"
          partInflProp="profileStd"
          partInflPropCriterion={materials.toleranceStdsByProfile}
          partInflProp2="surfaceStd"
          partInflPropCriterion2={materials.surfaceStdsByProfiles}
          part={part}
          type="select" />

        <TableCell
          partId={id}
          options={
            materials.sizesByProfile[part.profile] ?
            materials.sizesByProfile[part.profile] : materials.allSizes
          }
          partProperty="profileSize"
          type="select" />

        <TableCell
          partId={id}
          options={
            materials.allToleranceStds
          }
          partProperty="profileStd"
          partInflProp="profile"
          partInflPropCriterion={materials.profilesByToleranceStds}
          part={part}
          type="select" />

        <TableCell
          partId={id}
          options={materials.allSurfaceStds}
          partProperty="surfaceStd" type="select" />

        <TableCell
          partId={id}
          options={materials.allSurfaceClasses}
          partProperty="surfaceClass" type="select" />

        <TableCell partId={id} partProperty="length" type="number" />
        <TableCell partId={id} partProperty="width" type="number" />
        <TableCell partId={id} partProperty="weightOfEach" type="number" />
        <TableCell
          partId={id}
          options={processes.allProcesses}
          partProperty="processes"
          type="drpdwn" />

        <td>notenote</td>
      </tr>
    );

  }

}

function mapStateToProps( { parts, materials, processes } ) {
  return { parts, materials, processes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPart,
    copyPart_UI,
    removePart_UI
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
