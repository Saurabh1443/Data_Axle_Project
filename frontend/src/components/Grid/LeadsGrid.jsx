import React, { useState, useEffect, useCallback } from "react";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Pagination } from "@mui/material";
//import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import { GridDrawer } from "../Drawer/Drawer";
import { MuiNavbar } from "../Navbar/navbar";
import Footer from "../Dashboard/Footer";

export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [personId, setPersonId] = useState("");

  const [pageLimit, setPageLimit] = useState({
    pageSize: 10,
    page: 0,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [gridLoading, setGridLoading] = useState(true);
  const [drawer, setDrawer] = useState(false);

  const searchBasedApi = (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  const handleModelClick = (params) => {
    setDrawer(true);
    setPersonId(params?.id);
  };

  const columns = [
    {
      field: "first_name",
      headerName: "FIRST NAME",
      width: 170,
      // valueGetter: (params) => {
      //   return `${params?.row?.first_name + " " + params?.row?.last_name} `;
      // },
    },
    { field: "last_name", headerName: "LAST NAME", width: 170 },
    {
      field: "phone",
      headerName: "PHONE",
      width: 170,
      valueGetter: (params) => {
        return `Not Available`;
      },
    },
    { field: "address", headerName: "ADDRESS", width: 170 },
    { field: "county", headerName: "COUNTY", width: 170 },
    { field: "age_range", headerName: "AGE RANGE", width: 170 },
    { field: "income_range", headerName: "INCOME RANGE", width: 170 },
    { field: "gender", headerName: "GENDER", width: 140 },
    {
      field: "ai",
      headerName: "GENIE AI",
      width: 170,
      data: "Hii",
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleModelClick(params)}
        >
          AI-AutoMailer
        </Button>
      ),
    },
  ];

  const debouncedFetchDataFromAPI = useCallback(
    _.debounce(async (searchQuery) => {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/persons?limit=${pageLimit?.pageSize}&page=${pageNumber}&name=${searchQuery}`;
        const response = await fetch(apiUrl);
        const responseJson = await response.json();
        setRows(responseJson?.results);
        setPageLimit((pageLimit) => ({
          ...pageLimit,
          ...{ page: responseJson?.info?.total_pages },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 1000),
    [pageNumber, pageLimit?.pageSize]
  );

  // useEffect(() => {
  //   debouncedFetchDataFromAPI(searchQuery);

  //   return () => {
  //     debouncedFetchDataFromAPI.cancel();
  //   };
  // }, [searchQuery, debouncedFetchDataFromAPI]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const apiUrl = `http://127.0.0.1:8000/api/persons?limit=${pageLimit?.pageSize}&page=${pageNumber}`;
        const response = await fetch(apiUrl);
        const responseJson = await response.json();
        setRows(responseJson?.results);
        setPageLimit((pageLimit) => ({
          ...pageLimit,
          ...{ page: responseJson?.info?.total_pages },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, [pageLimit?.pageSize, pageNumber]);

  const handleClick = () => {};

  const handlePageChange = (e, value) => {
    setPageNumber(value);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageLimit((pageLimit) => ({
      ...pageLimit,
      ...{ pageSize: event?.pageSize },
    }));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MuiNavbar />
      <Box>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "white",
            marginTop: 8.8,
            borderBottom: 1,
            borderColor: "#C5C5C5",
          }}
          elevation={0}
        >
          <Toolbar>
            {/* <img src={data_axle_genie} alt="logo"></img> */}
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Search By First Name "
              sx={{ width: 600 }}
              onChange={searchBasedApi}
              InputProps={{
                startAdornment: (
                  <Stack paddingRight={"20px"}>
                    <SearchIcon color="disabled" fontSize="medium" />
                  </Stack>
                ),
              }}
            />
          </Toolbar>
        </AppBar>
      </Box>
      <DataGrid
        sx={{ marginTop: 16 }}
        columns={columns}
        rows={rows}
        loading={false}
        // hideFooterPagination
        columnBuffer={1}
        pageSizeOptions={[10, 25, 100]}
        disableRowSelectionOnClick
        pagination={pageLimit}
        onPaginationModelChange={handleChangeRowsPerPage}
      />
      <GridDrawer
        personId={personId}
        open={drawer}
        handleClose={() => setDrawer(false)}
      />

      <Stack alignItems={"end"}>
        <Pagination count={pageLimit?.page} onChange={handlePageChange} />
      </Stack>
      <Footer />
    </Paper>
  );
}
