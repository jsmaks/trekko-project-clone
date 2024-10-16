import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',
  '/organization(.*)',
  '/select-org',
]);

export default clerkMiddleware((auth, request) => {
  const { userId, orgId } = auth();

  // Если пользователь зарегистрирован (userId существует) и у него есть orgId
  if (userId && orgId) {
    // Проверяем, что пользователь не на странице /organization/${orgId}
    if (!request.nextUrl.pathname.startsWith(`/organization/${orgId}`)) {
      return NextResponse.redirect(
        new URL(`/organization/${orgId}`, request.url)
      );
    }
  }

  // Если пользователь зарегистрирован (userId существует), но нет orgId
  if (userId && !orgId && !request.nextUrl.pathname.startsWith('/select-org')) {
    return NextResponse.redirect(new URL('/select-org', request.url));
  }

  // Защита маршрутов
  if (isProtectedRoute(request)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
