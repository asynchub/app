import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EngineerTableForm from './engineer-table-form';

class EngineerTable extends Component {
  
  // tableData; // piece of state: 
  // EngineerTable data.
  
  // readSourceFileTree(files) // action creator (called on drag from SourceFileTree):
  // Reads files from SourceFileTree and writes selected data into tableData.

  // writeTableDataToDB() // action creator (called on: drop into EngineerTable):
  // Reads data from tableData and Writes it into db
  
  // fetchTable() // action creator (callback after writeTableDataToDB is done): 
  // Reads data from db to render it in EngineerTable
  
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
          {this.fetchTable()}
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
