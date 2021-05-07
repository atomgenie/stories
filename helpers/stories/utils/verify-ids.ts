interface ResourceWithId {
  id: string
}

export const verifyIds = (items: ReadonlyArray<ResourceWithId>): void => {
  const idSet = new Set<string>()

  for (const item of items) {
    if (idSet.has(item.id)) {
      throw Error(`You can't have two stories with same id. ID: ${item.id}`)
    }

    idSet.add(item.id)
  }
}
