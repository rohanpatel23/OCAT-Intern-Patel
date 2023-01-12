import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';
import '../../scss/form.scss';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
    }
  );

  // Render the UI for your table
  return (
    <>
      <div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups && headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column =>
                  <th {...column.getHeaderProps()}>{column.render(`Header`)}</th>)}
              </tr>)}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows && rows.map(row => {
              console.log(data, `inside row page map`);
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell =>
                    <td {...cell.getCellProps()}>{cell.render(`Cell`)}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
    </>
  );
}

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js

  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
      // console.log(await AssessmentService.getList());
      // console.log(assessments, `assessments`);
    };
    fetchAssessments();
  }, [ ]);
  console.log(assessments, `assessments`);
  const columns = React.useMemo(
    () => [
      {
        Header: ` `,
        columns: [
          {
            Header: `Assessment Type`,
            accessor: `instrumentType`,
          },
          {
            Header: `Score`,
            accessor: `score`,
          },
          {
            Header: `Risk Level`,
            accessor: `riskLevel`,
          },
          {
            Header: `Cat Name`,
            accessor: `catName`,
          },
          {
            Header: `Birth Date`,
            accessor: `catDateOfBirth`,
          },

        ],
      },

    ],
    []
  );

  return (
    <div >
      <h1>Assessment List</h1>
      <hr />
      <div className="tableContainer">
        <Table columns={columns} data={assessments} />
      </div>
    </div>
  );
};
