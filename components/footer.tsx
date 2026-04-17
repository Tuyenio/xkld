'use client'

import Link from 'next/link'
import { Facebook, Linkedin, Mail, Phone } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'

const socialLinks = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || '',
}

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <BrandLogo compact className="text-primary-foreground" textClassName="text-primary-foreground" />
            </div>
            <p className="text-sm opacity-90">
              Connecting Vietnamese professionals with premium opportunities in Taiwan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-secondary transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-secondary transition-colors">
                  Application Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/costs" className="hover:text-secondary transition-colors">
                  Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+886-1234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@xkldvietdai.com" className="hover:text-secondary transition-colors">
                  info@xkldvietdai.com
                </a>
              </div>
              <div className="flex gap-3 mt-4">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-90">
            <p>&copy; 2024 XKLD VietDai. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="hover:text-secondary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-secondary transition-colors">
                Terms
              </Link>
              <Link href="/sitemap.xml" className="hover:text-secondary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
