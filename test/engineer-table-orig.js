import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import '../app-engineer-sortabletree-driving.css';

// mports for ScrollSync:
import { ScrollSyncPane, ScrollSync } from 'react-scroll-sync'

// import EngineerTreebeard from './engineer-treebeard';
import EngineerSortableTree from './engineer-sortabletree-driving'; // './engineer-sortabletree'
import DropdownMulti from './engineer-table-dropdown-multi';
// import ButtonGroup from './engineer-button-group';  // to test vivibility of style

import {
  fetchPartsFromDB,
  fetchMaterialsFromDB,
  fetchProcessesFromDB,
  addPart,
  removePart,
  copyPart_UI,
  pasteParts_UI,
  removePart_UI,
  cleanClipBoard_UI,
  editCell,
  buildPartsTreeOfPartsFromDB
} from '../actions/index';

import TableRow from './engineer-table-row';


class EngineerTable extends Component {

  constructor(props) {
    super(props);
    /* // implemented in engineer-sortabletree-driving
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDelButtonClick = this.handleDelButtonClick.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    */
  }

  componentDidMount() {
    // implemented in engineer-sortabletree-driving
    // this.props.fetchPartsFromDB();

    this.props.fetchMaterialsFromDB();
    this.props.fetchProcessesFromDB();
  }


  // one way is to make checkIn checkOut property in each part and
  // render part row under edit or not if they are checkedOut.
  // another idea is to replace parts
  // third idea is to make blank part and render this
  // fourth idea is to make new parts cells as inputs with default values and
  // then user edits them and it is writing the cell value into db.


  renderRows() {
    const { parts, partsToRender } = this.props;

    if (!parts) { return null; }
    const { byId } = this.props.parts;

    const { clipBoard_UI } = this.props;
    // console.log(partsToRender)
    return _.map(partsToRender, id => { // return _.map(parts.allIds, id => {
      let part = byId[id];
      // console.log(part);
      let isChecked = clipBoard_UI.byId[id];
      return (
        <TableRow
          key={id}
          part={part}
          id={id}
          onCheckBoxClick={this.handleCheckBoxClick}
          checked={isChecked} />
      );
    });
  }

  /* // implemented in engineer-sortabletree-driving
  handleCheckBoxClick(event) {
    const { parts } = this.props;
    const { id } = event.target;
    const part = parts.byId[id];
    if (event.target.checked) {
      this.props.copyPart_UI(part, id);
    }
    if (!event.target.checked) {
      this.props.removePart_UI(id);
    }

  }


  handleAddButtonClick(event) {
    const { clipBoard_UI, parts } = this.props;
    const partsToPaste = clipBoard_UI.byId;
    const partIdsToPaste = clipBoard_UI.allIds;
    if (!partIdsToPaste.length) {
      this.props.addPart();
      return;
    } else {

      _.map(partIdsToPaste, id => {
        let part = partsToPaste[id];
        this.props.addPart(parts.byId, part);
      });

      this.props.cleanClipBoard_UI();
    }
  }

  handleDelButtonClick(event) {
    const { clipBoard_UI, parts } = this.props;
    const { allIds } = clipBoard_UI;
    _.map(allIds, id => {
      this.props.removePart(parts.byId, parts.allIds, id);
    })
    this.props.cleanClipBoard_UI();
  }
  */


  /*
  componentWillReceiveProps(nextProps) {
    console.log('props received:', nextProps.parts);
    if (this.props.parts.allIds.length !== nextProps.parts.allIds.length) {
      this.forceUpdate();
    }
  }
  */


  render() {
    const { parts } = this.props;
    if (!parts) {
      return <div>loading</div>
    }
    // console.log(ScrollSyncPane, ScrollSync)
    // EngineerTable displays and maintains main parts table.

    /* // implemented in engineer-sortabletree-driving
    <button className="btn btn-primary" onClick={this.handleAddButtonClick}>+</button>
    <button className="btn btn-danger" onClick={this.handleDelButtonClick}>-</button>
    */

    // because of engineer-sortabletree-driving these first columns are omitted from table:
    /*
    <th>v</th>
    <th>Nr.</th>
    <th>Drawing Nr.</th>

    <th>from Assembly</th>
    <th>Description</th>
    <th>Qty Total</th>
    */
    return (

      <div style={{ height: 520 }}>
        <ScrollSync proportional={false} horizontal={false} >
          <div className='row' style={{ height: 520 }}>

            <ScrollSyncPane>
              <div className="col-md-4" style={{overflow: 'auto'}}>
                <section style={{ height: 52000 }}>
                  <EngineerSortableTree initialData={parts} />
                </section>
              </div>
            </ScrollSyncPane>


            <ScrollSyncPane>
              <div className="col-md-8" style={{overflow: 'auto'}}>
                <section style={{ height: 52000 }}>
                  <table className="table partsTable table-condensed table-hover table-responsive">
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Standard</th>
                        <th>Profile</th>
                        <th>Size</th>
                        <th>Standard</th>
                        <th>Surface</th>
                        <th>Class</th>
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
                </section>
              </div>
            </ScrollSyncPane>
          </div>
        </ScrollSync>
      </div>

    );
  }


}

function mapStateToProps({ parts, partsToRender, clipBoard_UI, processes, partsTree }) {
  return { parts, partsToRender, clipBoard_UI, processes, partsTree };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addPart,
    removePart,
    copyPart_UI,
    pasteParts_UI,
    removePart_UI,
    cleanClipBoard_UI,
    editCell,
    fetchPartsFromDB,
    fetchMaterialsFromDB,
    fetchProcessesFromDB,
    buildPartsTreeOfPartsFromDB
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



    /*

    renderLeft() {
      const { parts } = this.props;
      if (!parts) {
        return <div>loading</div>
      }
      console.log(parts);
      return(
        <div style={{overflow: 'auto'}}>

          <EngineerSortableTree initialData={parts} />
        </div>
      )
    }

    renderRight() {
      return(
        <div style={{overflow: 'auto'}}>
          {this.renderRows()}
        </div>
      )
    }

    //
    <div>
      <button className="btn btn-primary" onClick={this.handleAddButtonClick}>+</button>
      <button className="btn btn-danger" onClick={this.handleDelButtonClick}>-</button>
      <div>
        <ScrollSync>
          <div className='row'>

            <ScrollSyncPane>
              <div className="treeWindow col-md-3">

                  <EngineerSortableTree initialData={parts} />

              </div>
            </ScrollSyncPane>


            <ScrollSyncPane>
              <div className="tableWindow col-md-9">
                <table className="table table-condensed table-hover table-responsive">
                  <thead>
                    <tr>
                      <th>v</th>
                      <th>Nr.</th>
                      <th>Drawing Nr.</th>
                      <th>Description</th>
                      <th>from Assembly</th>
                      <th>Qty Total</th>
                      <th>Material</th>
                      <th>Standard</th>
                      <th>Profile</th>
                      <th>Size</th>
                      <th>Standard</th>
                      <th>Surface</th>
                      <th>Class</th>
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
            </ScrollSyncPane>

          </div>
      </ScrollSync>
    </div>
    */

    /*
      <div>
        <button className="btn btn-primary" onClick={this.handleAddButtonClick}>+</button>
        <button className="btn btn-danger" onClick={this.handleDelButtonClick}>-</button>
        <DropdownMulti />
        <div>
          <div className="row">
            <div className="treeWindow col-md-3">
              <div className="header-for-tree">
                Drawing Nr.
              </div>
              <EngineerSortableTree initialData={parts} />
            </div>

            <div className="tableWindow col-md-9">
              <table className="table table-condensed table-hover table-responsive">
                <thead>
                  <tr>
                    <th>v</th>
                    <th>Nr.</th>
                    <th>Drawing Nr.</th>
                    <th>Description</th>
                    <th>from Assembly</th>
                    <th>Qty Total</th>
                    <th>Material</th>
                    <th>Standard</th>
                    <th>Profile</th>
                    <th>Size</th>
                    <th>Standard</th>
                    <th>Surface</th>
                    <th>Class</th>
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
        </div>
      </div>
      */
