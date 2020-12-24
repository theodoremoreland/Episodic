// React
import React, { useEffect, useMemo, useState } from 'react';

// Material UI
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
// Icons
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';

// Custom Components
import Alert from '../Alert';

// Custom styles
import './Table.css';

// Has to be named 'width' for third party component to recognize in current implementation.
const width = 150;

// Used to put answers to questions with slightly different wording into same column
const columnConversions = {
  "Old Question 1" : "New Question 1",
  "Old Question 2" : "New Question 2",
};

export default function ReviewHistoryTable() {
  const [columns, setColumns] = useState(undefined);
  const [rows, setRows] = useState(undefined);

  const [seriesFilterOptions, setSeriesFilterOptions] = useState(new Set());
  const [seriesFilterValue, setSeriesFilterValue] = useState("All");
  const [userFilteOptions, setUserFilterOptions] = useState(new Set());
  const [userFilterValue, setUserFilterValue] = useState("All");

  const [alertMessageObj, setAlertMessageObj] = useState({severity: "", text: "", "duration": 0});
  const [alertIsActive, setAlertIsActive] = useState(false);


  const transformRowData = (entries) => {
    const isDate = /^\d{4}-\d{2}-\d{2}.*$/;
    const isNumber = /^\d+$/;
    try {
      for (const entry of entries) {
        for (let [question, answer] of Object.entries(entry)) {

          // Checks to see if question exists with slightly different wording...
          // ...then deletes duplicate question and assigns answer to one version.
          if (columnConversions[question]) {
            delete entry[question];
            question = columnConversions[question];
          }
          if (answer === null) {
            continue;
          }
          else if (String(answer).match(isDate)) {
            // entry[question] = new Date(answer); // Conversion results in Date that is one day off / before actual date
          }
          else if (String(answer).match(isNumber)) {
            entry[question] = Number(answer);
          }
          // If answer features key/value pairs, logic below will delete corresponding question...
          // ...in favor of splitting said question into various questions for each key (if that makes sense)
          else if (typeof(answer) === "object") {
            delete entry[question];
            const nestedObject = answer;
            
            for (const [nestedKey, nestedValue] of Object.entries(nestedObject)) {
              const newQuestion = `${question} (${nestedKey})`
              entry[newQuestion] = nestedValue;
            }
          }
        }
      }
    }
    catch {
      setAlertMessageObj({severity: "warning" ,
        text: "Failed to convert data types. Sorting will not work properly. Export data to sort externally.",
        "duration": 6_000
      });
      setAlertIsActive(true);
    }
    const transformedRows = entries.map((entry, index) => ({ "id": index + 1, ...entry})); // Key: "id" is needed for DataGrid to function properly
    return transformedRows;
  };


  const transformColumnData = (transformedRows) => {
    const transformedColumns = [];
    let columnNames = [];
    
    for (let row of transformedRows) {
        const rowKeys = Object.keys(row);
        columnNames = new Set([...columnNames, ...rowKeys]);
    }

    columnNames = [...columnNames];

    for (let columnName of columnNames) {
      const transformedColumn = { field: columnName, headerName: columnName, width };
      transformedColumns.push(transformedColumn);
    };
  
    return transformedColumns;
  };


  const getEntries = async () => {
    const requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await fetch("http://localhost:5000/absences-history", requestOptions)
      .then(function (response) {
        if (response.status !== 200) {
            return Promise.reject(`${response.status} ${response.statusText}`);
        };

        return response.json();
      })
      .then(response => {
          console.log(response);
          const entries = response; 
          if (entries.length === 0) {
            const text = "No data"
            setColumns([]);
            setRows([]);
            setAlertMessageObj({severity: "warning" , text, "duration": 6_000})
            setAlertIsActive(true);
          }
          else {
            const transformedRows = transformRowData(entries);
            setRows(transformedRows);
            const transformedColumns = transformColumnData(transformedRows);
            setColumns(transformedColumns);
          }
      })
      .catch(error => {
          setAlertMessageObj({severity: "error" , text: error.toString(), "duration": 10_000});
          setAlertIsActive(true);
      });
  };


  const addSeries = () => {
    if (rows === undefined) { return undefined; }
    const seriesInEntries = rows.map((row) => row["Series"]);
    const usersInEntries = rows.map((row) => row["Users"]);
    setSeriesFilterOptions(new Set(seriesInEntries));
    setUserFilterOptions(new Set(usersInEntries));
  };


  const filterRows = useMemo(() => {
    let filteredRows = rows;

    filteredRows = seriesFilterValue !== "All"
      ? filteredRows.filter((row) => row["Series"] === seriesFilterValue || (row["Series"] === null && seriesFilterValue === "null"))
      : filteredRows;

    filteredRows = userFilterValue !== "All"
      ? filteredRows.filter((row) => row["User"] === userFilterValue || (row["User"] === null && userFilterValue === "null"))
      : filteredRows;

    return filteredRows
  }, [seriesFilterValue, userFilterValue, rows]);

  
  const createCSV = (filteredRows) => {
    let csvString = "data:text/csv;charset=utf-8, "; // Trailing space is necessary.

    if (filteredRows[0] === undefined) { return csvString += "No data"; };
    
    let csvColumns = [];
    
    for (let row of filteredRows) {
        const rowKeys = Object.keys(row);
        csvColumns = new Set([...csvColumns, ...rowKeys]);
    }

    csvColumns = [...csvColumns];
    csvString += csvColumns.join(",") + "\n";

    for (let row of filteredRows) {
      let rowData = [];
      for (let csvColumn of csvColumns) {
        rowData.push(row[csvColumn]); 
      }
      csvString += rowData.join(",") + "\n";
    };

    return csvString;
  };


  // Fetch entries on load
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of page.
    getEntries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Add districts and schools to state for filter options after rows have been fetched.
  useEffect(() => {
    addSeries();
  }, [rows]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <section id="reviewHistoryTableContainer">
        <Typography className="pageTitle" variant="h2">
            Review History
        </Typography>
        { columns === undefined || rows === undefined 
          ? <Skeleton height={1_500} width={"100%"} style={{marginTop: "-325px"}}/>
          : <>
            {/* Filter Controls */}
            <div className="filterContainer">
              <FormControl className="tableFilter" variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Filter By Series</InputLabel>
                <Select
                  native
                  value={seriesFilterValue}
                  onChange={(event) => setSeriesFilterValue(event.target.value)}
                  label="Series"
                >
                  {["All", ...seriesFilterOptions].map((series) => <option key={series || "null"} value={series}>{series || "null"}</option>)}
                </Select>
              </FormControl>

              <FormControl className="tableFilter" variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Filter By User</InputLabel>
                <Select
                  native
                  value={userFilterValue}
                  onChange={(event) => setUserFilterValue(event.target.value)}
                  label="Users"
                >
                  {["All", ...userFilteOptions].map((user) => <option key={user || "null"} value={user}>{user || "null"}</option>)}
                </Select>
              </FormControl>

              {/* Download Button */}
              <div className="link">
                <a href={createCSV(filterRows())} download="episodic-review-history.csv">
                  <Button
                    className="downloadButton"
                    variant="text"
                    color="secondary"
                    startIcon={<GetAppSharpIcon style={{marginRight : '-4px'}}/>}
                  >
                    Export
                  </Button>
                </a>
              </div>
            </div>

            {/* Table */}
            <DataGrid id="reviewHistoryTable" rows={filterRows()} columns={columns} autoHeight pageSize={15} rowsPerPageOptions={[15, 30, 50]}/>
            </> }
      </section>

      <Alert 
        alertMessageObj={alertMessageObj}
        alertIsActive={alertIsActive}
        setAlertIsActive={setAlertIsActive}
      />
    </>
  );
}