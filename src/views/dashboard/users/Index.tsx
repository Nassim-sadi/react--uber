import React, { useState } from "react";
import { useAxiosFetch } from "@/hooks/useAxiosFetch";
import { DataTable } from "./Table";
import type { ColumnDef } from "@tanstack/react-table";
import { Filters, type StatusOption } from "@/components/filters";

const removeEmptyParams = (obj: Record<string, any> = {}) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== null &&
        value !== undefined &&
        value !== "" &&
        (typeof value !== "string" || value.trim() !== "")
    )
  );

type User = {
  id: number;
  name: string;
  email: string;
  role: { id: number; name: string };
  status: StatusOption;
  createdAt: string;
  updatedAt: string;
};

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "email", header: "Email" },
];

type FiltersState = {
  search: string;
  createdStart: Date | null;
  createdEnd: Date | null;
  status: StatusOption;
  page: number;
  limit: number;
};

const Index = () => {
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    createdStart: null,
    createdEnd: null,
    status: "",
    page: 1,
    limit: 10,
  });

  const { data, error, loading } = useAxiosFetch(
    "/admin/users",
    removeEmptyParams({
      search: filters.search,
      createdStart: filters.createdStart?.toISOString(),
      createdEnd: filters.createdEnd?.toISOString(),
      status: filters.status,
      page: filters.page,
      limit: filters.limit,
    })
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="admin-service">
      <h1>Users</h1>

      <Filters
        showSearch
        search={filters.search}
        onSearchChange={(val) => setFilters({ ...filters, search: val })}
        showCreatedStart
        createdStart={filters.createdStart}
        onCreatedStartChange={(val) =>
          setFilters({ ...filters, createdStart: val })
        }
        showCreatedEnd
        createdEnd={filters.createdEnd}
        onCreatedEndChange={(val) =>
          setFilters({ ...filters, createdEnd: val })
        }
        showStatus
        status={filters.status}
        onStatusChange={(val) => setFilters({ ...filters, status: val })}
      />

      {data?.data && <DataTable columns={columns} data={data.data} />}
    </div>
  );
};

export default Index;
