import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/response";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Protéger la route /admin
    if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    // Protéger la route /dashboard (déjà couvert par withAuth, mais on peut ajouter une logique spécifique)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
