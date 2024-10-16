import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',
  '/organization(.*)',
  '/select-org',
]);

export default clerkMiddleware((auth, request) => {
  const { userId, orgId } = auth();



  // Если пользователь зарегистрирован (userId существует) и у него есть orgId, редиректим на /organization/${orgId}
  if (userId && orgId) {
    return NextResponse.redirect(
      new URL(`/organization/${orgId}`, request.url)
    );
  }

  // Если пользователь зарегистрирован (userId существует), но это не страница /select-org и нет orgId, редиректим на /select-org
  if (userId && !orgId && !request.nextUrl.pathname.startsWith('/select-org')) {
    return NextResponse.redirect(new URL('/select-org', request.url));
  }



  if (isProtectedRoute(request)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
