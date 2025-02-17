"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

export default function DataTable({
  data,
  columns,
  searchField = "name",
  onRowClick,
  meta,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    meta,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder={`Rechercher par ${searchField}...`}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border bg-background focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left text-sm font-medium text-muted-foreground p-4 border-b"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() ? "cursor-pointer" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <div className="flex flex-col">
                            <ChevronUp
                              className={`w-3 h-3 ${
                                header.column.getIsSorted() === "asc"
                                  ? "text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                            <ChevronDown
                              className={`w-3 h-3 -mt-1 ${
                                header.column.getIsSorted() === "desc"
                                  ? "text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                className="hover:bg-muted/50 transition-colors cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-4 border-b text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            className="bg-card border rounded-lg p-4 space-y-3 hover:border-primary/50 transition-colors cursor-pointer"
          >
            {row.getVisibleCells().map((cell, index) => {
              // Skip the actions column in the card body
              if (cell.column.id === "actions") return null;

              const header = table
                .getHeaderGroups()[0]
                .headers.find((h) => h.id === cell.column.id);

              return (
                <div key={cell.id} className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    {header
                      ? flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      : ""}
                  </span>
                  <div className="text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              );
            })}
            {/* Actions at the bottom of the card */}
            <div className="pt-2 mt-2 border-t flex justify-end">
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === "actions") {
                  return (
                    <div key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            Premier
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 text-sm rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            Précédent
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            Suivant
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 text-sm rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            Dernier
          </button>
        </div>
        <span className="text-sm text-muted-foreground text-center sm:text-right w-full sm:w-auto">
          Page {table.getState().pagination.pageIndex + 1} sur{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
