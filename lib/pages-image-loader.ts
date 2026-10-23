// ponytail: GitHub Pages has no image optimizer; serve the originals under the repo's basePath
export default function pagesImageLoader({ src }: { src: string; width: number }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH}${src}`;
}
