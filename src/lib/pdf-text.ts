import { extractText, getDocumentProxy } from "unpdf";

/**
 * Native belge girişi olmayan sağlayıcılar (DeepSeek, yerel modeller) için
 * düşük seviye yedek: PDF'in düz metnini çıkarır. Şekiller, tablo düzeni ve
 * sayfa görselleri kaybolur — yalnızca metin katmanı kalır.
 */
export async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  return text;
}
