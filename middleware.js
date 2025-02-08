import { NextResponse } from "next/server";

export function middleware(req) {
    const url = req.nextUrl;
    if (url.pathname === "/tool" && url.searchParams.has("id")) {
        const id = url.searchParams.get("id");
        return NextResponse.redirect(new URL(`/tool/${id}`, req.url));
    }
    return NextResponse.next();
}
