'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Building2,
  Users,
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText,
  Download,
  Clock,
} from 'lucide-react'
import { formatDateTime, formatCurrency, formatDuration } from '@/lib/utils'

interface Formation {
  id: string
  createdAt: string
  updatedAt: string
  status: string
  companyName: string
  businessActivities: string
  companyAddress: string
  registeredCapital: number
  contactPhone: string
  contactEmail: string
  preferredDate?: string
  callDuration?: number
  recordingUrl?: string
  transcript?: string
  summaryDocument?: string
  shareholders: Array<{
    id: string
    fullName: string
    idNumber: string
    sharePercentage: number
  }>
  directors: Array<{
    id: string
    fullName: string
  }>
}

const statusColors = {
  PENDING: 'secondary',
  IN_PROGRESS: 'warning',
  COMPLETED: 'success',
  CANCELLED: 'danger',
} as const

const statusLabels = {
  PENDING: 'Pending',
  IN_PROGRESS: 'Sedang Berlangsung',
  COMPLETED: 'Selesai',
  CANCELLED: 'Dibatalkan',
}

export default function FormationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [formation, setFormation] = useState<Formation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchFormation(params.id as string)
    }
  }, [params.id])

  const fetchFormation = async (id: string) => {
    try {
      const response = await fetch(`/api/formations/${id}`)
      const data = await response.json()
      setFormation(data)
    } catch (error) {
      console.error('Error fetching formation:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadSummary = () => {
    if (!formation?.summaryDocument) return
    
    const blob = new Blob([formation.summaryDocument], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PT-${formation.companyName}-Summary.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 w-1/3 bg-gray-200 rounded" />
            <div className="h-96 bg-gray-200 rounded-xl" />
          </div>
        </main>
      </div>
    )
  }

  if (!formation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Formation tidak ditemukan</h2>
            <Button onClick={() => router.push('/')} className="mt-4">
              Kembali ke Dashboard
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Dashboard
        </Button>

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {formation.companyName}
            </h1>
            <p className="mt-1 text-gray-600">
              Dibuat pada {formatDateTime(new Date(formation.createdAt))}
            </p>
          </div>
          <Badge variant={statusColors[formation.status as keyof typeof statusColors]} className="text-base px-4 py-2">
            {statusLabels[formation.status as keyof typeof statusLabels]}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Info - 2 columns */}
          <div className="space-y-6 lg:col-span-2">
            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span>Informasi Perusahaan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Nama Perusahaan
                    </label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formation.companyName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Modal Dasar
                    </label>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {formatCurrency(formation.registeredCapital)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Bidang Usaha
                  </label>
                  <p className="mt-1 text-gray-900">
                    {formation.businessActivities}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600 flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>Alamat</span>
                  </label>
                  <p className="mt-1 text-gray-900">
                    {formation.companyAddress}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shareholders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Pemegang Saham</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {formation.shareholders.map((shareholder, index) => (
                    <div
                      key={shareholder.id}
                      className="rounded-lg border border-gray-100 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {index + 1}. {shareholder.fullName}
                          </p>
                          <p className="text-sm text-gray-600">
                            NIK/Paspor: {shareholder.idNumber}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {shareholder.sharePercentage}%
                          </p>
                          <p className="text-xs text-gray-500">Kepemilikan</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Directors */}
            <Card>
              <CardHeader>
                <CardTitle>Direktur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formation.directors.map((director, index) => (
                    <div
                      key={director.id}
                      className="flex items-center space-x-2 rounded-lg border border-gray-100 p-3"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <p className="font-medium text-gray-900">
                        {director.fullName}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            {formation.transcript && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Transkrip Percakapan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-96 overflow-y-auto rounded-lg bg-gray-50 p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {formation.transcript}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - 1 column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Telepon</p>
                    <p className="font-medium text-gray-900">
                      {formation.contactPhone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">
                      {formation.contactEmail}
                    </p>
                  </div>
                </div>
                {formation.preferredDate && (
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Jadwal Konsultasi</p>
                      <p className="font-medium text-gray-900">
                        {formatDateTime(new Date(formation.preferredDate))}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Call Info */}
            {formation.callDuration && (
              <Card>
                <CardHeader>
                  <CardTitle>Info Panggilan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-600">Durasi</p>
                      <p className="font-medium text-gray-900">
                        {formatDuration(formation.callDuration)}
                      </p>
                    </div>
                  </div>
                  {formation.recordingUrl && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(formation.recordingUrl, '_blank')}
                    >
                      Dengarkan Rekaman
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Summary Document */}
            {formation.summaryDocument && (
              <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-accent-dark">
                    <FileText className="h-5 w-5" />
                    <span>Dokumen Ringkasan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600">
                    Dokumen ringkasan telah dibuat otomatis oleh Komodachi
                  </p>
                  <Button
                    onClick={downloadSummary}
                    className="w-full"
                    variant="secondary"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Ringkasan
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Edit Status
                </Button>
                <Button variant="outline" className="w-full">
                  Tambah Catatan
                </Button>
                <Button variant="destructive" className="w-full">
                  Hapus
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

