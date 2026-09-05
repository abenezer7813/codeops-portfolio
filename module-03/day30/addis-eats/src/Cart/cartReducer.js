
export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];

    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}
