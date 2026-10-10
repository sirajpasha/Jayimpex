import { NextResponse, type NextRequest } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { verifyBrochureToken } from "@/lib/brochure-token";

export async function GET(request: NextRequest) {
  if (!verifyBrochureToken(request.nextUrl.searchParams.get("token"))) {
    return NextResponse.json(
      { success: false, error: "This download link is invalid or has expired. Please request the brochure again." },
      { status: 403 }
    );
  }
  try {
    const file = await readFile(path.join(process.cwd(), "private", "Jay_Impex_Export_Brochure.pdf"));
    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Jay_Impex_Export_Brochure.pdf"',
        "Content-Length": String(file.length),
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("[BROCHURE_DOWNLOAD_ERROR]", err);
    return NextResponse.json({ success: false, error: "Brochure file is not available." }, { status: 500 });
  }
}
