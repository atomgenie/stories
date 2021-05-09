export const renderMultilineString = (value: string | undefined) => {
  if (!value) {
    return null
  }

  return value.split("\n").map((line, i) => <div key={i}>{line}</div>)
}
