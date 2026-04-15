'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X, MessageCircle, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function FloatingContactBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-40">
      {isOpen && (
        <Card className="mb-4 p-4 shadow-xl w-72">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-foreground">Get in Touch</h3>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} className="text-muted-foreground hover:text-foreground" />
            </button>
          </div>
          <div className="space-y-3">
            <a href="tel:+886-1234-5678" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
              <Phone size={20} className="text-secondary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Call Us</p>
                <p className="text-xs text-muted-foreground">+886-1234-5678</p>
              </div>
            </a>
            <a href="mailto:info@xkldvietdai.com" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
              <Mail size={20} className="text-secondary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">info@xkldvietdai.com</p>
              </div>
            </a>
            <Link href="/contact" className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
              <MessageCircle size={20} className="text-secondary flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Contact Form</p>
                <p className="text-xs text-muted-foreground">Send us a message</p>
              </div>
            </Link>
          </div>
        </Card>
      )}
      <Button
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  )
}
