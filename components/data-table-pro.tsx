import { ReactNode } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface DataTableProProps<T> {
  columns: Array<{ key: keyof T; label: string; render?: (row: T) => ReactNode }>
  rows: T[]
  emptyMessage?: string
}

export function DataTablePro<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyMessage = 'No data available.',
}: DataTableProProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={String(col.key)}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIdx) => (
          <TableRow key={rowIdx}>
            {columns.map((col) => (
              <TableCell key={String(col.key)}>
                {col.render ? col.render(row) : String(row[col.key] ?? '')}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
