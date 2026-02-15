"use client";

import useNotes from "@/hooks/useNotes";
import { Note } from "@/api/models/notes.Model";
import AddNoteDialog from "@/components/notes/AddNoteDialog";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Note>();

const columns = [
  columnHelper.accessor("title", {
    header: "العنوان",
    cell: (info) => (
      <span className="font-medium">{info.getValue() ?? "—"}</span>
    ),
  }),
  columnHelper.accessor("userId", {
    header: "البريد الإلكتروني",
    cell: (info) => {
      const user = info.getValue();
      const email =
        typeof user === "object" && user
          ? (user as { email?: string }).email
          : undefined;
      return <span className="text-muted-foreground">{email ?? "—"}</span>;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "تاريخ الإنشاء",
    cell: (info) => {
      const value = info.getValue();
      if (!value) return "—";
      return new Date(value).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  }),
];

export default function NotesTable() {
  const { data: notes, isLoading, error } = useNotes();

  const table = useReactTable({
    data: notes ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight">ملاحظاتي 📒</h2>
        <AddNoteDialog />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-start font-semibold text-muted-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  جاري التحميل...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-destructive"
                >
                  خطأ: {error.message}
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  لا توجد ملاحظات بعد. أضف ملاحظتك الأولى!
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
