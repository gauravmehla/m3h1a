export default function imageLoader({
    src,
    width,
    quality,
  }: {
    src: string
    width: number
    quality?: number
  }) {
    return `https://firebasestorage.googleapis.com${src}`
}
