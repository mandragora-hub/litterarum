export default defineNuxtRouteMiddleware((_to, from) => {
  if (from.path === "/") setSearchBarOnNavbar(true);
  //   if (to.path === "/") setSearchBarOnNavbar(false);
});
