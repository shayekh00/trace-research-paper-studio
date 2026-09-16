import { providerCatalog, type ProviderId } from "./model-providers";

/**
 * Sağlayıcı başına sunucu ortam değişkeni adı: DEEPSEEK_API_KEY,
 * ANTHROPIC_API_KEY, vb. Yerel sağlayıcıda "anahtar" bir adres olduğu için
 * bu mekanizmanın dışında tutuluyor.
 */
function serverEnvKeyName(providerId: ProviderId): string {
  return `${providerId.toUpperCase()}_API_KEY`;
}

/**
 * `.env.local` (veya konteynerin ortam değişkenleri) üzerinden sağlanmış bir
 * anahtar varsa döner. İstemci o sağlayıcı için anahtar göndermezse burası
 * yedek olarak kullanılır — bkz. parseInput.
 */
export function serverConfiguredApiKey(providerId: ProviderId): string | undefined {
  const provider = providerCatalog.find((item) => item.id === providerId);
  if (!provider || provider.local) return undefined;
  const value = process.env[serverEnvKeyName(providerId)]?.trim();
  return value || undefined;
}

/** İstemcinin hangi sağlayıcılar için anahtar alanını gizleyebileceğini söyler. */
export function serverConfiguredProviders(): ProviderId[] {
  return providerCatalog
    .filter((provider) => !provider.local)
    .map((provider) => provider.id)
    .filter((providerId) => serverConfiguredApiKey(providerId) !== undefined);
}
