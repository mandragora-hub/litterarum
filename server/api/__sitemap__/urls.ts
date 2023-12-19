function basicFetch(url: string) {
  const config = useRuntimeConfig();

  return $fetch(url, {
    baseURL: `${config.public.apiBaseUrl}/${config.public.apiVersion}`,
    pick: ["basename", "updatedAt"],
  });
}

export default defineSitemapEventHandler(
  async () => {
    const [
      books,
      //   pages,
      //   products
    ] = await Promise.all([
      basicFetch("books") as any,
      //   $fetch('/api/v1/pages'),
      //   $fetch('/api/v1/products')
    ]);

    return [...books.data].map((p) => {
      return {
        loc: `/books/${p.slug}`,
        lastmod: p.updatedAt,
      };
    });
  }
);
