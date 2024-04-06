const colors = [
  'rgb(75, 192, 192)',
  'rgb(192, 75, 192)',
  'rgb(192, 192, 75)',
  'rgb(75, 75, 192)',
  'rgb(75, 192, 75)',
  'rgb(192, 75, 75)',
  'rgb(75, 134, 192)',
  'rgb(192, 75, 134)',
  'rgb(134, 192, 75)',
  'rgb(192, 134, 75)',
  'rgb(134, 75, 192)',
  'rgb(75, 192, 134)',
]

export function getColor(index: number) {
  return colors[index % colors.length]
}
