"use client"

import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { GlassCard } from '@/components/glass-card'
import { SectionHeader } from '@/components/section-header'
import { DataTablePro } from '@/components/data-table-pro'
import { PremiumButton } from '@/components/premium-button'
import { Input } from '@/components/ui/input'
import { apiClient, type AdminReport } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'

export default function AdminReportsPage() {
  const [rows, setRows] = useState<AdminReport[]>([])
  const [name, setName] = useState('')
  const [period, setPeriod] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadReports = async () => {
    try {
      const result = await apiClient.admin.listReports()
      setRows(result)
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not load reports.'))
    }
  }

  useEffect(() => {
    void loadReports()
  }, [])

  const createReport = async () => {
    if (!name.trim() || !period.trim()) {
      setMessage('Report name and period are required.')
      return
    }

    setIsSubmitting(true)
    try {
      const created = await apiClient.admin.createReport({
        name: name.trim(),
        period: period.trim(),
      })
      setRows((prev) => [created, ...prev])
      setName('')
      setPeriod('')
      setMessage('Report created successfully.')
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not create report.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const cycleStatus = async (report: AdminReport) => {
    const statuses = ['Ready', 'Generating', 'Archived']
    const idx = statuses.indexOf(report.status)
    const next = statuses[(idx + 1) % statuses.length]

    try {
      const updated = await apiClient.admin.updateReport(report.id, { status: next })
      setRows((prev) => prev.map((row) => (row.id === report.id ? updated : row)))
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not update report status.'))
    }
  }

  const removeReport = async (id: string) => {
    try {
      await apiClient.admin.deleteReport(id)
      setRows((prev) => prev.filter((row) => row.id !== id))
      setMessage(`Deleted report #${id}`)
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not delete report.'))
    }
  }

  const columns = useMemo<Array<{ key: keyof AdminReport; label: string; render?: (row: AdminReport) => ReactNode }>>(
    () => [
      { key: 'name', label: 'Report Name' },
      { key: 'period', label: 'Period' },
      {
        key: 'status',
        label: 'Status',
        render: (row: AdminReport) => (
          <button type="button" onClick={() => void cycleStatus(row)} className="rounded-full border border-border px-3 py-1 text-xs">
            {row.status}
          </button>
        ),
      },
      {
        key: 'generatedAt',
        label: 'Generated',
        render: (row: AdminReport) => (
          <span className="text-xs text-muted-foreground">
            {row.generatedAt ? new Date(row.generatedAt).toLocaleString() : '—'}
          </span>
        ),
      },
      {
        key: 'id',
        label: 'Action',
        render: (row: AdminReport) => (
          <PremiumButton variant="ghost" size="sm" onClick={() => void removeReport(row.id)}>
            Delete
          </PremiumButton>
        ),
      },
    ],
    []
  )

  return (
    <div className="bg-background p-6 space-y-6">
      <SectionHeader title="Reports" subtitle="Generate and review business performance reports." />

      {message && <GlassCard className="p-3 text-sm text-muted-foreground">{message}</GlassCard>}

      <GlassCard className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Weekly Placement Summary" />
        <Input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="April 2026" />
        <div className="flex justify-end">
          <PremiumButton variant="primary" isLoading={isSubmitting} onClick={createReport}>
            Create Report
          </PremiumButton>
        </div>
      </GlassCard>

      <GlassCard className="p-4">
        <DataTablePro rows={rows} columns={columns} emptyMessage="No reports generated yet." />
      </GlassCard>
    </div>
  )
}
