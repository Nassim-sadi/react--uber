import * as React from "react";
import { DatePicker } from "./ui/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";

export type StatusOption = true | false | "";

interface FiltersProps {
  showSearch?: boolean;
  search?: string;
  onSearchChange?: (val: string) => void;

  showCreatedStart?: boolean;
  createdStart?: Date | null;
  onCreatedStartChange?: (date: Date | null) => void;

  showCreatedEnd?: boolean;
  createdEnd?: Date | null;
  onCreatedEndChange?: (date: Date | null) => void;

  showStatus?: boolean;
  status?: StatusOption;
  onStatusChange?: (val: StatusOption) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  showSearch = false,
  search = "",
  onSearchChange,

  showCreatedStart = false,
  createdStart = null,
  onCreatedStartChange,

  showCreatedEnd = false,
  createdEnd = null,
  onCreatedEndChange,

  showStatus = false,
  status = "",
  onStatusChange,
}) => {
  return (
    <div className="flex gap-4 flex-wrap mb-4">
      {showSearch && onSearchChange && (
        <div className="flex flex-col gap-3">
          <Label htmlFor="search">Search</Label>
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-64"
          />
        </div>
      )}

      {showCreatedStart && onCreatedStartChange && (
        <DatePicker
          label="From"
          selected={createdStart}
          onChange={onCreatedStartChange}
          placeholder="Start date"
        />
      )}

      {showCreatedEnd && onCreatedEndChange && (
        <DatePicker
          label="To"
          selected={createdEnd}
          onChange={onCreatedEndChange}
          placeholder="End date"
        />
      )}

      {showStatus && onStatusChange && (
        <div className="flex flex-col gap-3">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={status === "" ? undefined : status ? "true" : "false"}
            onValueChange={(val) => {
              if (val === "true") onStatusChange(true);
              else if (val === "false") onStatusChange(false);
              else onStatusChange("");
            }}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Active</SelectItem>
              <SelectItem value="false">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
