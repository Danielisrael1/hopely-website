const MAX_SIDE = 1600; // px, longest edge
const SKIP_BELOW = 300 * 1024; // small files (icons) are uploaded untouched

/**
 * Appwrite's free plan blocks server-side image transformations (/preview returns 403),
 * so large photos are shrunk in the browser before upload instead.
 * Returns the original file if it is small, not a JPEG/PNG/WebP, or can't be decoded.
 */
export async function resizeImage(file: File): Promise<File> {
  if (file.size < SKIP_BELOW || !/^image\/(jpeg|png|webp)$/.test(file.type)) return file;

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file); // applies EXIF rotation from phone cameras
  } catch {
    return file;
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // PNG keeps transparency (logos, icons); everything else becomes JPEG
  const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.82));
  if (!blob || blob.size >= file.size) return file;

  const name = file.name.replace(/\.[^.]+$/, '') + (type === 'image/png' ? '.png' : '.jpg');
  return new File([blob], name, { type });
}
