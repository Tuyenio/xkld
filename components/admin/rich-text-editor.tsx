"use client"

import { useRef, useState } from 'react'
import { Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { sanitizeHtml } from '@/lib/html-sanitize'

type RichTextEditorProps = {
  value: string
  onChange: (next: string) => void
  minHeightClassName?: string
  allowLists?: boolean
  allowCaseTransform?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  minHeightClassName = 'min-h-[140px]',
  allowLists = true,
  allowCaseTransform = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const insertHtmlAtCursor = (html: string) => {
    const target = editorRef.current
    if (!target) return

    target.focus()
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      target.innerHTML += html
      onChange(sanitizeHtml(target.innerHTML))
      return
    }

    const range = selection.getRangeAt(0)
    range.deleteContents()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = html
    const fragment = document.createDocumentFragment()
    let node: ChildNode | null
    while ((node = wrapper.firstChild)) {
      fragment.appendChild(node)
    }
    range.insertNode(fragment)
    onChange(sanitizeHtml(target.innerHTML))
  }

  const wrapSelection = (before: string, after: string) => {
    const target = editorRef.current
    if (!target) return

    target.focus()
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selected = range.toString() || 'text'
    range.deleteContents()
    insertHtmlAtCursor(`${before}${selected}${after}`)
  }

  const insertList = (ordered: boolean) => {
    insertHtmlAtCursor(ordered ? '<ol><li>List item</li></ol>' : '<ul><li>List item</li></ul>')
  }

  const applyCase = (mode: 'lower' | 'upper') => {
    if (!editorRef.current) return
    editorRef.current.innerText = mode === 'lower'
      ? editorRef.current.innerText.toLowerCase()
      : editorRef.current.innerText.toUpperCase()
    onChange(sanitizeHtml(editorRef.current.innerHTML))
  }

  return (
    <div className="border border-border rounded-md bg-white">
      <div className="flex flex-wrap items-center gap-2 p-2 border-b border-border/60 bg-muted/5">
        <button type="button" onClick={() => wrapSelection('<strong>', '</strong>')} className="px-2 py-1 rounded text-sm">B</button>
        <button type="button" onClick={() => wrapSelection('<em>', '</em>')} className="px-2 py-1 rounded text-sm">I</button>
        <button type="button" onClick={() => wrapSelection('<u>', '</u>')} className="px-2 py-1 rounded text-sm">U</button>
        {allowLists && (
          <>
            <button type="button" onClick={() => insertList(true)} className="px-2 py-1 rounded text-sm">OL</button>
            <button type="button" onClick={() => insertList(false)} className="px-2 py-1 rounded text-sm">UL</button>
          </>
        )}

        <div className="relative">
          <button type="button" onClick={() => { setShowLinkInput((v) => !v); setShowImageInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
            <LinkIcon size={14} />
            <span className="sr-only">Insert link</span>
          </button>
          {showLinkInput && (
            <div className="absolute z-20 mt-2 bg-white border border-border rounded-md p-2 shadow-md w-64">
              <div className="text-xs text-muted-foreground mb-1">Insert link URL</div>
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-2 py-1 border border-border rounded-md mb-2"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setShowLinkInput(false); setLinkUrl('') }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                <button
                  type="button"
                  onClick={() => {
                    if (!linkUrl) return
                    wrapSelection(`<a href="${linkUrl}" target="_blank" rel="noreferrer">`, '</a>')
                    setShowLinkInput(false)
                    setLinkUrl('')
                  }}
                  className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm"
                >
                  Insert
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button type="button" onClick={() => { setShowImageInput((v) => !v); setShowLinkInput(false) }} className="px-2 py-1 rounded text-sm flex items-center gap-1">
            <ImageIcon size={14} />
            <span className="sr-only">Insert image</span>
          </button>
          {showImageInput && (
            <div className="absolute z-20 mt-2 bg-white border border-border rounded-md p-3 shadow-md w-72">
              <div className="text-xs text-muted-foreground mb-1">Insert image URL</div>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-2 py-1 border border-border rounded-md mb-2"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setShowImageInput(false); setImageUrl('') }} className="px-2 py-1 rounded border text-sm">Cancel</button>
                <button
                  type="button"
                  onClick={() => {
                    if (!imageUrl) return
                    insertHtmlAtCursor(`<img src="${imageUrl}" alt="embedded" />`)
                    setShowImageInput(false)
                    setImageUrl('')
                  }}
                  className="px-2 py-1 rounded bg-primary text-primary-foreground text-sm"
                >
                  Insert
                </button>
              </div>
            </div>
          )}
        </div>

        {allowCaseTransform && (
          <>
            <div className="ml-2 text-xs text-muted-foreground">Case:</div>
            <button type="button" onClick={() => applyCase('lower')} className="px-2 py-1 rounded text-sm">lower</button>
            <button type="button" onClick={() => applyCase('upper')} className="px-2 py-1 rounded text-sm">UPPER</button>
          </>
        )}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange(sanitizeHtml((e.target as HTMLDivElement).innerHTML))}
        className={`${minHeightClassName} p-3`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }}
      />
    </div>
  )
}

