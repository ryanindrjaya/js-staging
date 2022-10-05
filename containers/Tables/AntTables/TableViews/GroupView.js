import React from 'react';
import TableWrapper from '../AntTables.styles';

export default function GroupView(props) {
  return (
    <TableWrapper
      columns={props.tableInfo.columns}
      dataSource={props.dataList.getAll()}
      className="isoGroupTable"
    />
  );
}
