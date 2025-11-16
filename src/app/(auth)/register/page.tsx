'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react'
import { GoogleButton } from '@/src/components/ui/google-button'
import { useToast } from '@/src/hooks/use-toast'
import Image from 'next/image' 

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleNextStep = () => {
    setError('')

    if (step === 1) {
      if (!email || !password) {
        setError('Please fill in all fields')
        return
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (!termsAccepted) {
        setError('Please accept the terms and conditions')
        return
      }
      handleSubmit()
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

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      // Simulate registration - replace with actual auth
      await new Promise(resolve => setTimeout(resolve, 800))
      router.push('/setup-profile')
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
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
        <Card className="border-border bg-card p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Crea tu cuenta</h1>
            <p className="text-muted-foreground text-sm">Paso {step} of 2</p>

            {/* Progress bar */}
            <div className="flex gap-2 mt-4">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium mb-2 block">Correo</Label>
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
                <Label htmlFor="password" className="text-sm font-medium mb-2 block">Contraseña</Label>
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
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Al menos 8 caracteres</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium mb-2 block">Confirmar contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded w-4 h-4 border-input mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  Acepto los <a href="#" className="text-primary hover:text-accent/90">Terminos y condiciones</a> y <a href="#" className="text-primary hover:text-accent/90">la política de privacidad.</a>
                </span>
              </label>
            </div>
          )}

          <Button
            onClick={handleNextStep}
            disabled={loading}
            className="w-full mt-6 bg-primary text-accent-foreground hover:opacity-90"
          >
            {loading ? 'Procesando...' : step === 1 ? 'Continuar' : 'Crear cuenta'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          {step === 1 && (
            <>
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">O regístrate con</span>
                </div>
              </div>

              <div>
                <GoogleButton
                  onClick={handleGoogleLogin}
                  loading={googleLoading}
                ></GoogleButton>
              </div>

            </>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-primary hover:text-accent/90 font-medium">
              Iniciar sesión
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
