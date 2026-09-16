import { serverConfiguredProviders } from "@/lib/server-provider-keys";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * İstemcinin hangi sağlayıcı anahtar alanlarını gizleyebileceğini söyler.
 * Anahtarların kendisi asla dönmez — yalnızca "sunucuda zaten var" bayrağı.
 */
export function GET() {
  return Response.json({ serverConfiguredProviders: serverConfiguredProviders() }, {
    headers: { "Cache-Control": "no-store" },
  });
}
