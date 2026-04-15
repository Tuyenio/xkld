'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import Link from 'next/link'
import { useState } from 'react'

export default function CostsPage() {
  const [salary, setSalary] = useState(2500)
  const [dependents, setDependents] = useState(0)

  // Calculate costs
  const accommodation = 800 // Monthly
  const food = 600
  const transport = 100
  const utilities = 150
  const phone = 30
  const insurance = 100
  const savings = 250
  const miscellaneous = 170

  const totalMonthly = accommodation + food + transport + utilities + phone + insurance + savings + miscellaneous
  const totalYearly = totalMonthly * 12

  const relocationCosts = {
    flight: 800,
    deposit: 1600, // 2 months deposit
    visaFees: 300,
    documentation: 200,
    initialSetup: 500,
  }

  const totalRelocation = Object.values(relocationCosts).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cost of Living Calculator</h1>
          <p className="text-xl opacity-90">Estimate your living costs in Taiwan</p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div>
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-8">Your Situation</h2>
                
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Expected Monthly Salary: ${salary.toLocaleString()}
                  </label>
                  <Slider
                    value={[salary]}
                    onValueChange={(value) => setSalary(value[0])}
                    min={1500}
                    max={5000}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Adjust to your expected salary range</p>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-4">
                    Number of Dependents: {dependents}
                  </label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((num) => (
                      <Button
                        key={num}
                        variant={dependents === num ? 'default' : 'outline'}
                        onClick={() => setDependents(num)}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Your salary will</p>
                  {salary >= totalMonthly ? (
                    <p className="text-green-600 font-bold text-lg">
                      ✓ Cover your living expenses
                    </p>
                  ) : (
                    <p className="text-red-600 font-bold text-lg">
                      ✗ Not be sufficient for your expenses
                    </p>
                  )}
                </div>
              </Card>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <Card className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Monthly Expenses Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Accommodation', amount: accommodation },
                    { label: 'Food & Dining', amount: food },
                    { label: 'Transportation', amount: transport },
                    { label: 'Utilities', amount: utilities },
                    { label: 'Phone & Internet', amount: phone },
                    { label: 'Health Insurance', amount: insurance },
                    { label: 'Savings', amount: savings },
                    { label: 'Miscellaneous', amount: miscellaneous },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">${item.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t border-border border-2">
                    <span className="font-bold text-foreground">Total Monthly</span>
                    <span className="font-bold text-lg text-primary">${totalMonthly}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">Total Yearly</span>
                    <span className="font-bold text-lg text-primary">${totalYearly.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-secondary text-primary">
                <h3 className="text-xl font-bold mb-4">Initial Relocation Costs</h3>
                <div className="space-y-3">
                  {Object.entries(relocationCosts).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold">${value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-primary/30 flex justify-between items-center font-bold text-lg">
                    <span>One-Time Total</span>
                    <span>${totalRelocation.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Breakdown */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Cost Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Accommodation',
                price: '$800/month',
                description: 'Average rent for a 1-bedroom apartment in central area. Can vary by location and size.',
                details: [
                  'Studio: $600-800',
                  '1 Bedroom: $800-1,200',
                  '2 Bedroom: $1,200-1,800',
                ],
              },
              {
                title: 'Food & Dining',
                price: '$600/month',
                description: 'Mix of eating out at restaurants and cooking at home. Taiwan has affordable food options.',
                details: [
                  'Restaurant meal: $3-8',
                  'Convenience store: $3-5',
                  'Groceries: $200-300/month',
                ],
              },
              {
                title: 'Transportation',
                price: '$100/month',
                description: 'Public transport pass covers buses and trains. Very affordable in Taiwan.',
                details: [
                  'Monthly pass: $50',
                  'Occasional taxi: $50',
                  'Very affordable system',
                ],
              },
              {
                title: 'Utilities',
                price: '$150/month',
                description: 'Electricity, water, and gas for apartment. Varies by usage and season.',
                details: [
                  'Electricity: $80-100',
                  'Water: $30-40',
                  'Gas: $20-30',
                ],
              },
              {
                title: 'Entertainment',
                price: '$200-300/month',
                description: 'Movies, dining out, activities, and hobbies. Taiwan has many affordable options.',
                details: [
                  'Movie: $8-10',
                  'Karaoke: $15-25/hour',
                  'Night market food: $2-5',
                ],
              },
              {
                title: 'Healthcare',
                price: '$100/month',
                description: 'National Health Insurance is affordable. Doctor visits are very cheap.',
                details: [
                  'NHI coverage: ~$50-80',
                  'Doctor visit: $3-10',
                  'Prescription: $1-5',
                ],
              },
            ].map((item, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-secondary font-bold text-lg mb-3">{item.price}</p>
                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground">• {detail}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Salary Guide */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Average Salaries by Industry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { industry: 'Software Engineer', salary: '$2,500 - $4,000', level: 'Senior' },
              { industry: 'Product Manager', salary: '$2,000 - $3,500', level: 'Mid-Level' },
              { industry: 'Designer', salary: '$1,800 - $2,800', level: 'Senior' },
              { industry: 'Sales Executive', salary: '$1,600 - $2,800', level: 'Senior' },
              { industry: 'Data Analyst', salary: '$1,700 - $2,600', level: 'Mid-Level' },
              { industry: 'Marketing Manager', salary: '$1,900 - $3,000', level: 'Senior' },
            ].map((item, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-foreground">{item.industry}</h3>
                  <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                    {item.level}
                  </span>
                </div>
                <p className="text-lg font-bold text-primary">{item.salary}/month</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Found a Job That Interests You?</h2>
          <p className="text-lg mb-8 opacity-90">Check out our job listings and apply today</p>
          <Link href="/jobs">
            <Button size="lg" variant="secondary">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
