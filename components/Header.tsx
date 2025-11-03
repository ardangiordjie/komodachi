'use client'

import { Phone, User, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-gradient-to-br from-primary to-primary-light p-2">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Komodachi</h1>
              <p className="text-xs text-gray-500">AI Notary Assistant</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent" />
          </Button>
          
          <div className="flex items-center space-x-3 rounded-lg border border-gray-200 px-4 py-2">
            <User className="h-5 w-5 text-gray-600" />
            <div className="text-sm">
              <p className="font-semibold text-gray-900">Augi Nugroho</p>
              <p className="text-xs text-gray-500">Notaris</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

