export const ellipsisAccount = (account?: string) => {
  if (!account) return ''
  const firstPhase = account.slice(0, 5)
  const lastPhase = account.slice(account.length - 4)
  return `${firstPhase}...${lastPhase}`
}
