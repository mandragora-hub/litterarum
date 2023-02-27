export const isSearchBarOnNavbar = ref(false);
export const setSearchBarOnNavbar = (newValue: boolean) => {
  if (newValue !== isSearchBarOnNavbar.value)
    isSearchBarOnNavbar.value = newValue;
};
