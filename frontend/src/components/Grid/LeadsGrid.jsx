import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Stack, Pagination } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import { GridDrawer } from "../Drawer/Drawer";
import { MuiNavbar } from "../Navbar/navbar";
import Footer from "../Dashboard/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
  const [personId, setPersonId] = useState("");
  const [pageLimit, setPageLimit] = useState({
    pageSize: 10,
    page: 0,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [gridLoading, setGridLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [totalEntries, setTotalEntries] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleModelClick = (params) => {
    setDrawer(true);
    setPersonId(params?.id);
  };

  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      width: 170,
    },
    { field: "last_name", headerName: "LAST NAME", width: 170 },
    { field: "address", headerName: "ADDRESS", width: 170 },
    { field: "county", headerName: "COUNTY", width: 170 },
    { field: "income_range", headerName: "INCOME RANGE", width: 170 },
    { field: "gender", headerName: "GENDER", width: 120 },
    {
      field: "technology_entertainment",
      headerName: "TECHNICAL INTEREST",
      width: 170,
      renderCell: (vv) => {
        return (
          <>{vv?.formattedValue == "" ? "Not Available" : vv?.formattedValue}</>
        );
      },
    },
    {
      field: "hobbies",
      headerName: "HOBBIES",
      width: 140,
      renderCell: (vv) => {
        return (
          <>{vv?.formattedValue == "" ? "Not Available" : vv?.formattedValue}</>
        );
      },
    },
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

  const handleNameSearch = _.debounce(async (e) => {
    try {
      const apiUrl = `http://127.0.0.1:8000/api/persons?limit=${pageLimit?.pageSize}&page=${pageNumber}&name=${searchName}`;
      const response = await fetch(apiUrl);
      const { error, result, success, ...vv } = await response.json();
      console.log(result?.[0])
      setGridLoading(false);
      if (!success) {
        setRows([]);
        toast.error(`${error?.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      } else {
        setRows(result);
        setTotalEntries(vv?.info?.total_entries);
        setPageLimit((pageLimit) => ({
          ...pageLimit,
          ...{ page: vv?.info?.total_pages },
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, 500);

  useEffect(() => {
    setGridLoading(true);
    handleNameSearch();
  }, [pageLimit?.pageSize, pageNumber, searchName]);

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
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            {/* <img src={data_axle_genie} alt="logo"></img> */}
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              placeholder="Search By First Name "
              sx={{ width: 525 }}
              onChange={(e) => setSearchName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Stack paddingRight={"20px"}>
                    <SearchIcon color="disabled" fontSize="medium" />
                  </Stack>
                ),
              }}
            />
            <Typography fontSize="22px" color="black">
              Total records: {totalEntries}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <DataGrid
        sx={{ marginTop: 16 }}
        columns={columns}
        rows={rows}
        loading={gridLoading}
        pageSizeOptions={[10, 25, 100]}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
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
      <ToastContainer />
    </Paper>
  );
}
