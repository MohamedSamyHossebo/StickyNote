import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 1. تعريف المسارات
    const protectedRoutes = ["/notes", "/profile", "/settings"];
    const authRoutes = ["/login", "/register"];

    // 2. قراءة التوكن والمسار الحالي
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // 3. هل المسار الحالي محمي؟ (بنتأكد لو بيبدأ بأي مسار من المصفوفة)
    // .some() دي بتلف عليهم وتشوف لو واحد فيهم موجود
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // 4. هل المسار الحالي هو صفحة دخول/تسجيل؟
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // --- السيناريو الأول: حماية الرواتس ---
    // لو رايح مكان محمي ومعهوش توكن -> اطرده للوجين
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // --- السيناريو الثاني: لو مسجل دخول ---
    // لو معاه توكن وبيحاول يروح للوجين -> وديه على النوتس
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/notes', request.url))
    }

    // كمل يا بطل
    return NextResponse.next()
}

// الـ Config زي ما هو ممتاز
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

export default middleware;