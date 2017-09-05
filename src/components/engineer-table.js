import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EngineerTableForm from './engineer-table-form';

class EngineerTable extends Component {
  
  // tableData; // piece of state: 
  // Data from db
  
  // generateTable // action creator: 
  // Generates EngineerTable rows on drag-drop from SourceFolderTree

  // writeTable
  
    
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
          {this.generateTable()}
        </tbody>
      </table>
    );
  }
  
  
}



export default connect(mapStateToProps)(EngineerTable);
