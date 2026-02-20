import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "OAuth not configured" },
      { status: 500 }
    );
  }

  const origin = request.nextUrl.origin;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/api/callback`,
    scope: "repo,user",
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`
  );
}
