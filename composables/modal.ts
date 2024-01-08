const searchModalOpen = ref(false);
const setSearchModal = (open: boolean) => {
  searchModalOpen.value = open;
};

export const useModal = () => {
  return {
    searchModalOpen,
    setSearchModal,
  };
};
