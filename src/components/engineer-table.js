import React, { Component } from 'react';

import EngineerTableForm from './engineer-table-form';

export default class EngineerTable extends Component {
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
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
