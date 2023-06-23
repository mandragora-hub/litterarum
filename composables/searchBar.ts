export const isSearchBarOnNavbar = ref(true);
export const setSearchBarOnNavbar = (newValue: boolean) => {
  if (newValue !== isSearchBarOnNavbar.value)
    isSearchBarOnNavbar.value = newValue;
};