import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Pagination } from "@mui/material";

export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [pageLimit, setPageLimit] = useState({
    pageSize: 10,
    page: 0,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const columns = [
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
        >
          Open
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        
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

  const handlePageChange = (e, value) => {
    
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
        pageSizeOptions={[10, 25, 100]}
        disableRowSelectionOnClick
        paginationMode={pageLimit}
        onPaginationModelChange={handleChangeRowsPerPage}
      />
      <Stack alignItems={"end"}>
        <Pagination count={pageLimit?.page} onChange={handlePageChange} />
      </Stack>
    </Paper>
  );
}