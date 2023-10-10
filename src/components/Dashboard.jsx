import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import useStore from "../../zustand/Index";
import {
  EditLocation,
  EditNotifications,
  MenuBook,
  ModeEdit,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const columnHelper = createColumnHelper();

const Dashboard = () => {
  const [editedValue, setEditedValue] = useState("");
  const [data, setData] = React.useState([]);
  const token = localStorage.getItem("token");
  const { setEditingCell, toggleEditing, setToggleEditing, editingCell } =
    useStore();

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => (
        <Typography sx={{ width: "10rem" }}>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => (
        <Typography sx={{ width: "10rem" }}>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("mobile", {
      cell: (info) => (
        <Typography sx={{ width: "10rem" }}>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("email", {
      cell: (info) => (
        <Typography sx={{ width: "15rem" }}>{info.getValue()}</Typography>
      ),
    }),
    columnHelper.accessor("password", {
      cell: (info) => (
        <Typography sx={{ width: "10rem", overflow: "hidden" }}>
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor("DOB", {
      cell: (info) => (
        <Typography sx={{ width: "10rem" }}>{info.getValue()}</Typography>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { tabeldata, error, isLoading } = useQuery("allUser", async () => {
    const response = await axios.get("http://localhost:3005/api/user/allUser", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.result);
    return response.data;
  });
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  const queryClient = useQueryClient();

  const handleSaveClick = (id) => {
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}update`,
        {
          id: id,
          firstName: editedValue,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("User updated successfully");
        }
        localStorage.setItem("firstName", editedValue);
        setEditingCell(null);
        queryClient.invalidateQueries("allUser");
        setEditedValue("");
        setToggleEditing(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ pt: 15 }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography
              sx={{ my: 5, textAlign: "center", fontSize: 20, fontWeight: 600 }}
            >
              Login User Data
            </Typography>
            <Typography
              sx={{
                px: 5,
                width: "95%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <table style={{ width: "50%", borderCollapse: "collapse" }}>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            background: "#f2f2f2",
                            textAlign: "center",
                            textTransform: "uppercase",
                            fontSize: "14px",
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center",
                          }}
                          onClick={() => {
                            if (cell.column.id) {
                              if (!toggleEditing) {
                                setEditedValue(cell.column.id);
                                setEditingCell(cell.id);
                                setToggleEditing(true);
                              }
                            }
                          }}
                        >
                          {!toggleEditing || cell.id !== editingCell ? (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <TextField
                                type="text"
                                value={editedValue}
                                sx={{ width: "10rem" }}
                                onChange={(e) => {
                                  setEditedValue(e.target.value);
                                }}
                              />
                              <IconButton
                                onClick={() => handleSaveClick(cell.row.id)}
                              >
                                <ModeEdit
                                  size="large"
                                  edge="start"
                                  color="inherit"
                                  aria-label="menu"
                                  sx={{ mr: 2 }}
                                />
                              </IconButton>
                            </Box>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
