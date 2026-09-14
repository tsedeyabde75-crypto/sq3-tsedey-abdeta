export function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.dish] };
    case "remove":
      return {
        ...state,
        items: state.items.filter((dish) => dish.id !== action.id),
      };
    case "clear":
      return { items: [] };
    default:
      throw new Error("Unknown action type: " + action.type);
  }
}