import React, { Component } from 'react';

import EngineerTable from './engineer-table';
import SyncFileTree from './sync-file-tree';
import SourceFileTree from './source-file-tree';
import Organizer from './organizer';

export default class Engineer extends Component {
  render() {
    return (
      <div>
        <p>Engineer is routed component to insert data and includes:</p>
        <EngineerTable />
        <Organizer />
        <SyncFileTree />
        <SourceFileTree />
      </div>
    );
  }
}
