import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";
import { ContentActionsTable, KardexStore, Pagination, v } from "../../../index.js";
import { device } from "../../../Styles/Breackpoints.jsx";
import Swal from "sweetalert2";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useState } from "react";

export const KardexTable = ({ data, setOpenRegister, setDataSelect, setAction }) => {
  const { deleteKardex } = KardexStore();
  const [pages, setPages] = useState(1);

  const updateTable = (data) => {
    if (data.description === "Generic") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This record cannot be updated!",
      });
      return;
    }

    setOpenRegister(true);
    setDataSelect(data);
    setAction("Update");
  };

  const deleteTable = (params) => {
    if (params.status === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This record has already been deleted!",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteKardex({ id: params.id });
      }
    });
  };

  const columns = [
    {
      accessorKey: "description",
      header: "Product",
      cell: (info) => (
        <div className="contentCell" data-title="Product">
          <span
            style={{
              textDecoration: info.row.original.status === 0 ? "line-through" : "none",
            }}
          >
            {info.getValue()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: (info) => (
        <div className="contentCell" data-title="Date">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: (info) => (
        <div className="contentCell" data-title="Type">
          {info.getValue() === "output" ? (
            <ContentColor $color="#d70000">{info.getValue()}</ContentColor>
          ) : (
            <ContentColor $color="#008b05">{info.getValue()}</ContentColor>
          )}
        </div>
      ),
    },
    {
      accessorKey: "details",
      header: "Details",
      cell: (info) => (
        <div className="contentCell" data-title="Details">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "User",
      cell: (info) => (
        <div className="contentCell" data-title="User">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "cuantity",
      header: "Cuantity",
      cell: (info) => (
        <div className="contentCell" data-title="Cuantity">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: (info) => (
        <div className="contentCell" data-title="Stock">
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      cell: (info) => (
        <div className="contentCell">
          <ContentActionsTable
            handlerUpdate={() => updateTable(info.row.original)}
            handlerDelete={() => deleteTable(info.row.original)}
          />
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Container>
      <table className="responsive-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <span>
                      <CgArrowsExchangeAltV
                        className="iconArrows"
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    </span>
                  )}
                  {
                    { asc: <TiArrowSortedUp />, desc: <TiArrowSortedDown /> }[
                      header.column.getIsSorted()
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((item) => (
            <tr key={item.id}>
              {item.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        table={table}
        initialPage={() => table.setPageIndex(0)}
        pageSize={table.getState().pagination.pageIndex + 1}
        setPage={setPages}
        maxPeges={table.getPageCount()}
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
    /* max-width: ${v.bphomer}; */
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
        .iconArrows {
          cursor: pointer;
          margin-left: 5px;
          width: 20px;
          height: 20px;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .contentCell {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
      }
      div[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;

const ContentColor = styled.div`
  color: ${(props) => props.$color};
  border-radius: 8px;
  border: 1px solid ${(props) => props.$color};
  text-align: center;
  padding: 3px;
  width: 70%;
  font-weight: bold;
  @media ${device.tablet} {
    width: 100%;
  }
`;
