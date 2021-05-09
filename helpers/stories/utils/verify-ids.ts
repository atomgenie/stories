interface ResourceWithId {
  id: string
}

const validId = /^[A-Za-z0-9]+[A-Za-z0-9\-_]*$/

export const verifyIds = (items: ReadonlyArray<ResourceWithId>): void => {
  const idSet = new Set<string>()

  for (const item of items) {
    if (idSet.has(item.id)) {
      throw Error(`You can't have two stories with same id. ID: ${item.id}`)
    }

    if (!validId.test(item.id)) {
      throw Error(`${item.id} is not a valid id.`)
    }

    idSet.add(item.id)
  }
}
