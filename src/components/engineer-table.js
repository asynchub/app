import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EngineerTableForm from './engineer-table-form';

class EngineerTable extends Component {
  
  // tableData; // piece of state: 
  // EngineerTable data.
  
  // readSourceFileTree(files) // action creator: 
  // (called on drag from SourceFileTree):
  // promise to: read files from SourceFileTree 
  // and then to write selected data into tableData Redux state;
  // promise to execute just before drop of this drag.

  // writeTableDataToDB() // action creator:
  // (called on: drop into EngineerTable):
  // executes readSourceFileTree promise;
  // promise to: reads data from tableData Redux state 
  // and then to write this data into db;
  // promise to execute on drop of this drag.
  
  // fetchTable() // helper / action creator:
  // (passed as callback to execute after writeTableDataToDB is done):
  // (also called before first render / rerender of EngineerTable):
  // Reads data from db to render / rerender it in EngineerTable
  
  // Further: to render real time changes throughout all users,
  // RethinkDB, Express, react-rethinkdb and socket.io  to be used.
  
  renderRows() {
    // the form to be rendered with default input values from db
    // map over row cells, using id, of sort, 
    // and write <td></td>, referring column name
    // onClick or Ctr+E reduxForm appears out of row.
    return (
      <tr>
        {}
      </tr>
    );
  }
  
  render() {
    // EngineerTable displays and maintains main product table.
    return (
      <table className="table table-hover">
        <thead>
          <th>Nr.</th>
          <th>Descr.</th>
          <th>Weight</th>
          <th>Qty</th>
          <th>Material</th>
        </thead>
        <tbody>
          {this.props.tableData.map(this.renderRows)}
        </tbody>
      </table>
    );
  }
  
  
}

function mapStateToProps({ tableData }) {
  return { tableData: tableData };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ readSourceFileTree, writeTableDataToDB, fetchTable }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EngineerTable);
