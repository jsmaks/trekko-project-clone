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
//  if (orgId && !request.nextUrl.pathname.startsWith(`/organization`)) {
//    if (request.nextUrl.pathname === '/') {
//      return NextResponse.redirect(
//        new URL(`/organization/${orgId}`, request.url)
//      );
//    }


//    // return NextResponse.redirect(
//    //   new URL(`/organization/${orgId}`, request.url)
//    // );
//   }
  if (
    orgId &&
    !request.nextUrl.pathname.startsWith(`/organization`) &&
    !request.nextUrl.pathname.startsWith(`/board`)
  ) {
    return NextResponse.redirect(
      new URL(`/organization/${orgId}`, request.url)
    );
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
