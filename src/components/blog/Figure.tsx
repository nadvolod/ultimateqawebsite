import Image from 'next/image'

// MDX passes attributes as strings (JS expressions are blocked in post content)
interface FigureProps {
  src: string
  width: number | string
  height: number | string
  alt: string
  caption?: string
}

export function Figure({ src, width, height, alt, caption }: FigureProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        width={Number(width)}
        height={Number(height)}
        alt={alt}
        sizes="(min-width: 768px) 720px, 100vw"
        className="mx-auto h-auto max-w-full rounded-lg border border-uqa-gray-light"
      />
      {caption && <figcaption className="mt-3 text-center text-sm text-uqa-gray-mid">{caption}</figcaption>}
    </figure>
  )
}
