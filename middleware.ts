import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Aquí puedes agregar lógica adicional si necesitas
    console.log('Token:', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

// Proteger estas rutas
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/quiz/:path*',
    '/profile/:path*',
    '/onboarding/:path*',
  ]
}