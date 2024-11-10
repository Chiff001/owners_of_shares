export const ROUTES = {
  HOME: "/",
  PERSONALITIES: "/personalities",
}
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: {[key in RouteKeyType]: string} = {
  HOME: "Компания",
  PERSONALITIES: "Лица",
};