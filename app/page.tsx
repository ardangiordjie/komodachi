'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { StatCard } from '@/components/StatCard'
import { CallHistory } from '@/components/CallHistory'
import { Phone, Clock, CheckCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDuration } from '@/lib/utils'

interface Stats {
  total: number
  pending: number
  inProgress: number
  completed: number
  avgDuration: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    avgDuration: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-primary to-primary-light p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">
                Selamat Datang, Augi! 👋
              </h2>
              <p className="text-lg text-white/90">
                Dashboard Komodachi AI Notary Assistant
              </p>
              <p className="mt-2 text-sm text-white/75">
                Kelola pembentukan PT dengan mudah melalui voice AI assistant
              </p>
            </div>
            <div className="hidden md:block">
              <div className="rounded-full bg-white/20 p-6 backdrop-blur-sm">
                <Phone className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Panggilan"
            value={stats.total}
            icon={Phone}
            color="primary"
          />
          <StatCard
            title="Rata-rata Durasi"
            value={formatDuration(stats.avgDuration)}
            icon={Clock}
            color="accent"
          />
          <StatCard
            title="Selesai"
            value={stats.completed}
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            title="Sedang Proses"
            value={stats.inProgress}
            icon={TrendingUp}
            color="warning"
          />
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Call History - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CallHistory />
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => window.open('https://elevenlabs.io/app/conversational-ai', '_blank')}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Konfigurasi ElevenLabs Agent
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => alert('Fitur akan segera hadir!')}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Lihat Semua PT Formation
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardHeader>
                <CardTitle className="text-accent-dark">
                  Cara Kerja Komodachi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-accent" />
                  <p>Klien menelepon nomor yang terhubung dengan ElevenLabs</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-accent" />
                  <p>Komodachi mengumpulkan informasi PT secara conversational</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-accent" />
                  <p>Data otomatis tersimpan di dashboard</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-accent" />
                  <p>Ringkasan dokumen dibuat otomatis</p>
                </div>
              </CardContent>
            </Card>

            {/* Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-semibold">{stats.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dalam Proses</span>
                  <span className="font-semibold">{stats.inProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Selesai</span>
                  <span className="font-semibold text-green-600">{stats.completed}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

