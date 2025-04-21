
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WebsiteAnalytics } from '@/services/analyticsService';
import { format } from 'date-fns';

interface WebsiteAnalyticsTableProps {
  data: WebsiteAnalytics[];
  isLoading?: boolean;
}

export function WebsiteAnalyticsTable({ data, isLoading }: WebsiteAnalyticsTableProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Page Views</TableHead>
          <TableHead className="text-right">Unique Visitors</TableHead>
          <TableHead className="text-right">Bounce Rate</TableHead>
          <TableHead className="text-right">Avg. Session</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{format(new Date(row.date), 'MMM dd, yyyy')}</TableCell>
            <TableCell className="text-right">{row.views.toLocaleString()}</TableCell>
            <TableCell className="text-right">{row.unique_visitors.toLocaleString()}</TableCell>
            <TableCell className="text-right">{row.bounce_rate}%</TableCell>
            <TableCell className="text-right">
              {Math.floor(row.avg_session_duration / 60)}m {Math.floor(row.avg_session_duration % 60)}s
            </TableCell>
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
              No analytics data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
