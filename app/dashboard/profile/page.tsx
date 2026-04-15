'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: 'Nguyễn',
    lastName: 'Văn Nam',
    email: 'nguyenvannam@email.com',
    phone: '+84 98 123 4567',
    jobTitle: 'Software Engineer',
    location: 'Ho Chi Minh City, Vietnam',
    workExperience: '5 years',
    bio: 'Experienced software engineer with expertise in full-stack development and cloud technologies.',
    skills: 'React, Node.js, AWS, TypeScript, Docker',
    education: 'Bachelor in Computer Science',
    university: 'University of Science, HCMC',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', profile)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Edit Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Profile Picture</h2>
            <div className="flex items-center gap-8">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-5xl">👤</span>
              </div>
              <div>
                <Button type="button" size="lg" variant="outline" className="mb-2">
                  <Upload size={20} className="mr-2" />
                  Upload Photo
                </Button>
                <p className="text-sm text-muted-foreground">JPG or PNG, up to 5MB</p>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
                <Input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
                <Input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                <Textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell employers about yourself"
                  rows={4}
                />
              </div>
            </div>
          </Card>

          {/* Professional Information */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Professional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Current Job Title</label>
                <Input
                  type="text"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
                <Input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Work Experience</label>
                <Input
                  type="text"
                  name="workExperience"
                  value={profile.workExperience}
                  onChange={handleChange}
                  placeholder="e.g., 5 years"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Skills (comma separated)</label>
                <Input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, AWS..."
                />
              </div>
            </div>
          </Card>

          {/* Education */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Degree</label>
                <Input
                  type="text"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  placeholder="Bachelor in Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">University</label>
                <Input
                  type="text"
                  name="university"
                  value={profile.university}
                  onChange={handleChange}
                  placeholder="University name"
                />
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Privacy Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">Public Profile</p>
                  <p className="text-sm text-muted-foreground">Allow employers to see your profile</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive job recommendations</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-semibold text-foreground">Show Contact Information</p>
                  <p className="text-sm text-muted-foreground">Let employers contact you directly</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
            <Button type="submit" size="lg">
              Save Changes
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
