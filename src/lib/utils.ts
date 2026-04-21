export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function parseLine(text: string): { title: string; desc: string } {
  const sep = text.indexOf(' — ')
  return sep >= 0
    ? { title: text.slice(0, sep), desc: text.slice(sep + 3) }
    : { title: text, desc: '' }
}
