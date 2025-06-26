import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  // Headers de performance critiques pour LCP et TBT
  const pathname = request.nextUrl.pathname;
  
  // Cache agressif pour les assets statiques
  if (pathname.startsWith('/_next/static/') || 
      pathname.startsWith('/assets/') ||
      pathname.includes('.')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  
  // Cache intelligent pour les pages
  else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400'
    );
  }
  
  // Headers de performance critiques
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Optimisations réseau
  if (!pathname.startsWith('/api/')) {
    response.headers.set(
      'Link',
      '</assets/images/horse_logo.png>; rel=preload; as=image; fetchpriority=high, ' +
      '<https://fonts.googleapis.com>; rel=preconnect; crossorigin, ' +
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    );
  }
  
  // CSP pour éviter les scripts bloquants
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
    "font-src 'self' fonts.gstatic.com; " +
    "img-src 'self' data: blob:; " +
    "connect-src 'self'"
  );
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
