import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
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
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("mobile", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("DOB", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gmail", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("password", {
      cell: (info) => info.getValue(),
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
  if (isLoading) {
    return <Typography>Loading... </Typography>;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  const UserName = localStorage.getItem("firstName");
  const queryClient = useQueryClient();

  const handleSaveClick = (id) => {
    axios
      .patch(
        `http://localhost:3005/api/user/update`,
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
        queryClient.invalidateQueries("allUser");
        setEditingCell(null);
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
      <Header userName={UserName} />
      <Typography
        sx={{ my: 5, textAlign: "center", fontSize: 20, fontWeight: 600 }}
      >
        Login User Data
      </Typography>
      <Typography
        sx={{ px: 5, width: "95%", display: "flex", justifyContent: "center" }}
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
                      fontWeight: "bold",
                      textAlign: "center",
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
                      if (cell.column.id === "firstName") {
                        if (!toggleEditing) {
                          setEditedValue(cell.row.original.firstName);
                          setEditingCell(cell.id);
                          setToggleEditing(true);
                        }
                      }
                    }}
                  >
                    {cell.column.id === "firstName" ? (
                      !toggleEditing || cell.id !== editingCell ? (
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
                            onClick={() =>
                              handleSaveClick(cell.row.original._id)
                            }
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
                      )
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Typography>
    </>
  );
};

export default Dashboard;
