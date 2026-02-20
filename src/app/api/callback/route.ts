import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
      client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error) {
    const content = JSON.stringify(data);
    return new NextResponse(
      `<!DOCTYPE html><html><body><script>
        window.opener.postMessage('authorization:github:error:${content}', '*');
      </script></body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const token = data.access_token;
  const content = JSON.stringify({ token, provider: "github" });

  return new NextResponse(
    `<!DOCTYPE html><html><body><script>
      (function() {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:success:${content}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
