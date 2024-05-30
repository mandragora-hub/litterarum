const pendingOperation = ref<number>(0);

export const useGlobalFetchLoading = () => {
  const loading = ref<boolean>(false);

  watch(
    () => pendingOperation.value,
    () => {
      loading.value = pendingOperation.value > 0;
    }
  );

  const addOperation = () => {
    pendingOperation.value++;
  };
  const removeOperation = () => {
    pendingOperation.value--;
  };
  const reset = () => {
    pendingOperation.value = 0;
  };

  return { loading, addOperation, removeOperation, reset };
};
