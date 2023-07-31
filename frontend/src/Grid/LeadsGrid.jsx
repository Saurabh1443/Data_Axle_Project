import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import { columnGroupsStateInitializer } from "@mui/x-data-grid/internals";
import { Stack, TextField, Pagination } from "@mui/material";

export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [pageLimit, setPageLimit] = useState({
    pageSize: 10,
    page: 0,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const columns = [
    // { id: "contact_Info", label: "Contact Info", minWidth: 170 },
    // { id: "last_name", label: "Last Name", minWidth: 100 },
    // {
    //   id: "phone",
    //   label: "Phone",
    //   minWidth: 170,
    //   align: "right",
    //   format: (value) => value.toLocaleString("en-US"),
    // },
    // {
    //   id: "address",
    //   label: "Address",
    //   minWidth: 170,
    //   align: "right",
    //   format: (value) => value.toLocaleString("en-US"),
    // },
    // {
    //   id: "county",
    //   label: "County",
    //   minWidth: 170,
    //   align: "right",
    //   format: (value) => value.toFixed(2),
    // },
    // {
    //   id: "age_range",
    //   label: "Age Range",
    //   minWidth: 170,
    //   align: "right",
    //   format: (value) => value.toFixed(2),
    // },
    // {
    //   id: "income_range",
    //   label: "Income Range",
    //   minWidth: 170,
    //   align: "right",
    //   format: (value) => value.toFixed(2),
    // },
    // {
    //   id: "ai",
    //   label: "AI Genie",
    //   minWidth: 170,
    //   align: "",
    //   format: (value) => value.toFixed(2),
    // },
    {
      field: "first_name",
      headerName: "First Name",
      width: 170,
      valueGetter: (params) => {
        return `${params.row.first_name + " " + params.row.last_name} `;
      },
    },
    { field: "last_name", headerName: "Last Name", width: 170 },
    {
      field: "phone",
      headerName: "Phone",
      width: 170,
      valueGetter: (params) => {
        return `Not Available`;
      },
    },
    { field: "address", headerName: "Address", width: 170 },
    { field: "county", headerName: "County", width: 170 },
    { field: "age_range", headerName: "Age Range", width: 170 },
    { field: "income_range", headerName: "Income Range", width: 170 },
    { field: "gender", headerName: "Gender", width: 170 },
    {
      field: "ai",
      headerName: "Genie Ai",
      width: 170,
      data: "Hii",
      renderCell: (params) => (
        <Button
          variant="contained"
          size="large"
          // style={{ marginLeft: 16 }}
          // tabIndex={params.hasFocus ? 0 : -1}
        >
          Open
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        console.log(pageLimit?.pageSize);
        const apiUrl = `http://127.0.0.1:8000/api/persons/?limit=${pageLimit.pageSize}&page=${pageNumber}`;
        const response = await fetch(apiUrl);
        const responseJson = await response.json();
        setRows(responseJson?.results);
        setPageLimit({
          ...pageLimit?.pageSize,
          page: responseJson?.info?.total_pages,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [pageLimit.pageSize, pageNumber]);

  const handleClick = () => {};

  const handlePageChange = (e, value) => {
    console.log(value, "hhhhh");
    setPageNumber(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageLimit({ ...pageLimit, pageSize: event?.pageSize });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        loading={false}
        // hideFooterPagination
        pageSizeOptions={[10, 25, 100]}
        disableRowSelectionOnClick
        paginationMode={pageLimit}
        onPaginationModelChange={handleChangeRowsPerPage}
      />
      {/* <TableContainer sx={{ maxHeight: 440, position: "relative" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <>
                  <TableRow
                    hover
                    key={row.first_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.first_name}
                    </TableCell>
                    <TableCell align="right">{row?.last_name}</TableCell>
                    <TableCell align="right">Not Available</TableCell>
                    <TableCell align="right">
                      {row?.address}, {row?.city}
                    </TableCell>
                    <TableCell align="right">{row?.county}</TableCell>
                    <TableCell align="right">{row?.age_range}</TableCell>
                    <TableCell align="right">{row?.income_range}</TableCell>
                    <TableCell align="right">
                      <Button onClick={handleClick}>Generate</Button>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Stack alignItems={"end"}>
        <Pagination count={pageLimit?.page} onChange={handlePageChange} />
      </Stack>
    </Paper>
  );
}
