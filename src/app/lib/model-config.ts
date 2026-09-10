export function getOpenRouterModel(): string {
  const model = process.env.OPEN_ROUTER_MODEL;

  if (!model) {
    throw new Error("OPEN_ROUTER_MODEL is not configured.");
  }

  return model;
}
