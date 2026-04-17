"use client"

import { useEffect, useMemo, useState } from 'react'
import { GlassCard } from '@/components/glass-card'
import { PremiumButton } from '@/components/premium-button'
import { ImagePlus, Trash2, Link2, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { apiClient, type AdminMediaAsset } from '@/lib/api-client'
import { toApiErrorMessage } from '@/lib/api-errors'

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<AdminMediaAsset[]>([])
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState('general')
  const [altText, setAltText] = useState('')

  const loadAssets = async () => {
    try {
      const result = await apiClient.admin.listMedia()
      setAssets(result)
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not load media assets.'))
    }
  }

  useEffect(() => {
    void loadAssets()
  }, [])

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : ''), [file])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const createAsset = async () => {
    if (!file) {
      setMessage('Please select a file to upload.')
      return
    }

    setIsSubmitting(true)
    try {
      const created = await apiClient.admin.createMediaUpload({
        file,
        category,
        altText: altText.trim() || undefined,
      })
      setAssets((prev) => [created, ...prev])
      setFile(null)
      setCategory('general')
      setAltText('')
      setMessage('Media asset uploaded successfully.')
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not upload media asset.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const removeAsset = async (id: string) => {
    try {
      await apiClient.admin.deleteMedia(id)
      setAssets((prev) => prev.filter((item) => item.id !== id))
      setMessage(`Removed asset #${id}`)
    } catch (error) {
      setMessage(toApiErrorMessage(error, 'Could not remove media asset.'))
    }
  }

  return (
    <div className="bg-background p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Media Library</h1>
        <p className="text-muted-foreground">Upload and manage campaign/media assets with backend storage.</p>
      </div>

      {message && <GlassCard className="p-3 text-sm text-muted-foreground">{message}</GlassCard>}

      <GlassCard className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-muted-foreground">File upload</label>
          <label className="mt-1 flex items-center gap-2 border border-dashed border-border rounded-md px-3 py-2 cursor-pointer hover:bg-muted/30">
            <Upload size={16} className="text-muted-foreground" />
            <span className="text-sm truncate">{file?.name || 'Select an image...'}</span>
            <input
              className="sr-only"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Category</label>
          <select className="w-full rounded-md border border-border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="general">general</option>
            <option value="blog">blog</option>
            <option value="campaign">campaign</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Alt text (optional)</label>
          <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image" />
        </div>
        <div className="lg:col-span-3 flex justify-end">
          <PremiumButton variant="primary" icon={<ImagePlus size={16} />} isLoading={isSubmitting} onClick={createAsset}>
            Upload Asset
          </PremiumButton>
        </div>
      </GlassCard>

      {previewUrl && (
        <GlassCard className="p-4">
          <p className="text-sm text-muted-foreground mb-2">Preview</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="preview" className="max-h-56 rounded-lg border border-border object-cover" />
        </GlassCard>
      )}

      <GlassCard className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-border/70">
                <th className="text-left py-3 px-3 font-semibold">Name</th>
                <th className="text-left py-3 px-3 font-semibold">Category</th>
                <th className="text-left py-3 px-3 font-semibold">URL</th>
                <th className="text-left py-3 px-3 font-semibold">Created</th>
                <th className="text-left py-3 px-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="border-b border-border/50">
                  <td className="py-3 px-3">{asset.fileName}</td>
                  <td className="py-3 px-3">{asset.category}</td>
                  <td className="py-3 px-3 text-sm text-muted-foreground">
                    <a href={asset.fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                      <Link2 size={14} /> Open
                    </a>
                  </td>
                  <td className="py-3 px-3 text-sm text-muted-foreground">{new Date(asset.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <button type="button" onClick={() => void removeAsset(asset.id)} className="rounded-md p-2 hover:bg-muted" aria-label="Delete asset">
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </td>
                </tr>
              ))}
              {assets.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">No media assets yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}
