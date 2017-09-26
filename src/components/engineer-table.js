import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import '../app.css';


import {
  fetchPartsFromDB,
  findPartsFromFiles,
  writePartsToDB,
  fetchMaterialsFromDB,
  addPart,
  removePart,
  copyPart_UI,
  pasteParts_UI,
  removePart_UI,
  cleanClipBoard_UI,
  editCell
} from '../actions/index';

import { generateId } from './idGenerator';

// import EngineerTableForm from './engineer-table-form';
import TableRow from './engineer-table-row';
// import TableCell from './engineer-table-cell';

// import { partsTree } from '../actions/fake-db2';


class EngineerTable extends Component {

  constructor(props) {
    super(props);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDelButtonClick = this.handleDelButtonClick.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    // this.clearCheckBoxes = this.clearCheckBoxes.bind(this);
    // this.generateId = this.generateId.bind(this);
  }

  componentDidMount() {
    this.props.fetchPartsFromDB();
  }


  // one way is to make checkIn checkOut property in each part and
  // render part row under edit or not if they are checkedOut.
  // another idea is to replace parts
  // third idea is to make blank part and render this
  // fourth idea is to make new parts cells as inputs with default values and
  // then user edits them and it is writing the cell value into db.


  renderRows() {

    // this.props.fetchPartsFromDB();
    const { parts } = this.props;
    if (!parts) { return null; }
    const { byId } = this.props.parts;
    const { clipBoard_UI } = this.props;
    
    console.log(parts);
    console.log(this.props.clipBoard_UI);
    // this.props.fetchMaterialsFromDB(parts);
    // console.log(this.props.materials);

    // do we still need it here?
    // if (!byId) { return; }

    return _.map(parts.allIds, id => {
      let part = byId[id];
      return (
        <TableRow 
          key={id} 
          part={part} 
          id={id} 
          onCheckBoxClick={this.handleCheckBoxClick}
          isChecked={clipBoard_UI.allIds.length}
        />
      );
    });
  }
  
  // lifted from engineer-table-row
  handleCheckBoxClick(event) {
    console.log(event.target.id);
    const { parts } = this.props;
    const { id } = event.target;
    const part = parts.byId[id];
    const { clipBoard_UI } =  this.props;
    if (event.target.checked) {
      this.props.copyPart_UI(part, id);
    }
    if (!event.target.checked) {
      this.props.removePart_UI(id);
    }
  }
  
  
  handleAddButtonClick(event) {
    // console.log(event.target);
    const { clipBoard_UI } = this.props;
    const partsToPaste = clipBoard_UI.byId;
    const partIdsToPaste = clipBoard_UI.allIds;
    // console.log(!clipBoard_UI.allIds.length);
    if (!partIdsToPaste.length) {
      this.props.addPart();
      return;
    } else {
      _.map(partIdsToPaste, id => {
        let newId = generateId();
        let part = { ...partsToPaste[id], id: newId };
        this.props.addPart(part);
      });
      
      // to implement with generation of new ids and new parts with new id's
      // in reducer, and then can use one liner action creator:
      // this.props.pasteParts_UI(partIdsToPaste, partIdsToPaste);
      this.props.cleanClipBoard_UI();
    }
  }


  handleDelButtonClick(event) {
    const { clipBoard_UI } = this.props;
    const { allIds } = clipBoard_UI;
    _.map(allIds, id => {
      this.props.removePart(id);
    })
    this.props.cleanClipBoard_UI();
  }

  render() {

    // const { parts } = this.props;
    // const products = parts.byId;

    // const { parts } = this.props;
    // const byId = parts;
    // const part = parts[byId]

    // if (!parts) { return null }

    // EngineerTable displays and maintains main parts table.
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleAddButtonClick}>Add</button>
        <button className="btn btn-danger" onClick={this.handleDelButtonClick}>Del</button>
        <div className="tableWindow">
          <table className="table table-condensed table-hover table-responsive">
            <thead>
              <tr>
                <th>+ -</th>
                <th>Nr.</th>
                <th>Drawing Nr.</th>
                <th>Description.</th>
                <th>Qty Total</th>
                <th>Material</th>
                <th>Standard</th>
                <th>Profile</th>
                <th>Profile Size</th>
                <th>Profile Size Standard</th>
                <th>Lenght</th>
                <th>Width</th>
                <th>Weight</th>
                <th>Processes</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }


}

function mapStateToProps({ parts, materials, clipBoard_UI }) {
  return { parts, materials, clipBoard_UI };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    // findPartsFromFiles,
    // writePartsToDB,
    addPart,
    removePart,
    copyPart_UI,
    pasteParts_UI,
    removePart_UI,
    cleanClipBoard_UI,
    editCell,
    fetchPartsFromDB,
    fetchMaterialsFromDB
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(EngineerTable);

// the form to be rendered with default input values from db
// map over row cells, using id, of sort,
// and write <td></td>, referring column name
// onClick or Ctr+E reduxForm appears out of row.

// findPartsFromFiles(files) // action creator:
// (called on drag from SourceFileTree):
// promise to: read files from SourceFileTree
// and then to write selected data into tableData Redux state;
// promise to execute just before drop of this drag.

// writePartsToDB() // action creator:
// (called on: drop into EngineerTable):
// executes findPartsFromFiles promise;
// promise to: reads data from tableData Redux state
// and then to write this data into db;
// promise to execute on drop of this drag.

// fetchTable() // helper / action creator:
// (passed as callback to execute after writePartsToDB is done):
// (also called before first render / rerender of EngineerTable):
// Reads data from db to render / rerender it in EngineerTable

// Further: to render real time changes throughout all users,
// RethinkDB, Express, react-rethinkdb and socket.io  to be used.

// requested: part category and type is proposed to be generated and confirmed
// by user for
// making estimations more precise in automated time and cost estimations by
// normatives db input and values of these, considering part complexity by type
// and category

// requested: part contour length and qty of cut-ins are considered to be read
// automatically from files to estimate time and cost of parts

// requested: workload by persons, workshops and machines to be generated from
// db data, also schedules to be generated, using start time and
// process normatives matched to processes from db data
