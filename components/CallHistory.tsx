'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Clock, Calendar, ChevronRight, FileText } from 'lucide-react'
import { formatDateTime, formatDuration, formatCurrency } from '@/lib/utils'
import Link from 'next/link'

interface Formation {
  id: string
  createdAt: string
  companyName: string
  status: string
  callDuration?: number
  registeredCapital: number
  contactPhone: string
  shareholders: any[]
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

export function CallHistory() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFormations()
  }, [])

  const fetchFormations = async () => {
    try {
      const response = await fetch('/api/formations?limit=10')
      const data = await response.json()
      setFormations(data)
    } catch (error) {
      console.error('Error fetching formations:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Panggilan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 animate-shimmer rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-primary" />
          <span>Riwayat Panggilan</span>
        </CardTitle>
        <Button variant="ghost" size="sm">
          Lihat Semua
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {formations.length === 0 ? (
            <div className="py-12 text-center">
              <Phone className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-sm text-gray-500">
                Belum ada panggilan masuk
              </p>
            </div>
          ) : (
            formations.map((formation) => (
              <Link href={`/formation/${formation.id}`} key={formation.id}>
                <div className="group flex items-center justify-between rounded-lg border border-gray-100 p-4 transition-all hover:border-primary hover:shadow-md">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary">
                        {formation.companyName}
                      </h4>
                      <Badge variant={statusColors[formation.status as keyof typeof statusColors]}>
                        {statusLabels[formation.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDateTime(new Date(formation.createdAt))}</span>
                      </div>
                      
                      {formation.callDuration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formatDuration(formation.callDuration)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3.5 w-3.5" />
                        <span>{formation.shareholders?.length || 0} Pemegang Saham</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Modal: {formatCurrency(formation.registeredCapital)}
                    </p>
                  </div>
                  
                  <ChevronRight className="ml-4 h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

