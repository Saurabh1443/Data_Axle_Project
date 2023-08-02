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
import { GridDrawer } from "../components/Drawer";

export default function StickyHeadTable() {
  const [rows, setRows] = useState([]);
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

  const handleModelClick = () => {
    setDrawer(true);
    console.log(drawer);
  };

  const columns = [
    {
      field: "first_name",
      headerName: "CONTACT INFO",
      width: 170,
      valueGetter: (params) => {
        return `${params.row.first_name + " " + params.row.last_name} `;
      },
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
    { field: "gender", headerName: "GENDER", width: 170 },
    {
      field: "ai",
      headerName: "GENIE AI",
      width: 170,
      data: "Hii",
      renderCell: (params) => (
        <Button variant="contained" size="small" onClick={handleModelClick}>
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
      <Box>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "white", marginTop: 8 }}
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
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              
            </Typography> */}
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
      <GridDrawer open={drawer} handleClose={() => setDrawer(false)} />

      {/* <Drawer
        variant="persistent"
        PaperProps={{
          elevation: 50,
          sx: {
            width: "30%",
            top: "128px",
          },
        }}
        anchor={"right"}
        open={drawer}
        //style={{ width: "60%" }}
        // onClose={}
      >
        You think water moves fast? You should see ice. Also this is a dumb
        filler sentence.You think water moves fast? You should see ice. Also
        this is a dumb filler sentence.You think water moves fast? You should
        see ice. Also this is a dumb filler sentence.You think water moves fast?
        You should see ice. Also this is a dumb filler sentence
      </Drawer> */}

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
