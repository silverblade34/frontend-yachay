'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/src/components/ui/button'
import { GoogleButton } from '@/src/components/ui/google-button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/src/hooks/use-toast'
import Image from 'next/image' 

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Obtener error de la URL si existe
  const error = searchParams.get('error')

  // Mostrar error si existe (useEffect correcto)
  useState(() => {
    if (error === 'OAuthAccountNotLinked') {
      toast({
        title: 'Error de autenticación',
        description: 'Este email ya está registrado con otro método.',
        variant: 'destructive',
      })
    } else if (error === 'AccessDenied') {
      toast({
        title: 'Acceso denegado',
        description: 'No tienes permisos para acceder.',
        variant: 'destructive',
      })
    } else if (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error al iniciar sesión.',
        variant: 'destructive',
      })
    }
  })

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implementar login con email/password
      await new Promise(resolve => setTimeout(resolve, 800))

      if (email && password) {
        router.push('/dashboard')
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudo iniciar sesión.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)

    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: true,
      })
    } catch (err) {
      console.error('Google login error:', err)
      toast({
        title: 'Error',
        description: 'No se pudo iniciar sesión con Google.',
        variant: 'destructive',
      })
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo - Usando imagen PNG */}
        <Link href="/">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-2xl font-bold text-foreground">YachayFlow</span>
            <Image
              src="/yachay-logo-frente.png"
              alt="LearnFlow Logo"
              width={40}
              height={40}
            />
          </div>
        </Link>
        <Card className="border-border border-2 bg-card p-8">
          <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
          <p className="text-muted-foreground mb-2">
            Inicia sesión en tu cuenta para continuar aprendiendo.
          </p>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Correo
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded w-4 h-4 border-input" />
                <span className="text-muted-foreground">Recuérdame</span>
              </label>
              <Link href="#" className="text-primary hover:text-primary/90">
                Has olvidado tu contraseña?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">O continuar con</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div>
            <GoogleButton
              onClick={handleGoogleLogin}
              loading={googleLoading}
            ></GoogleButton>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            No tengo una cuenta?{' '}
            <Link href="/register" className="text-primary hover:text-primary/90 font-medium">
              Registrarse
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}