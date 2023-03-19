function basicFetch(url: string) {
  const config = useRuntimeConfig();

  return $fetch(url, {
    baseURL: `${config.public.apiBaseUrl}/${config.public.apiVersion}`,
    pick: ["basename", "updatedAt"],
    headers: {
      Authorization: `Bearer ${config.public.apiToken}`,
    },
  });
}

export default cachedEventHandler(
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
      return { loc: `/books/${p._id}`, lastmod: p.updatedAt };
    });
  },
  {
    name: "sitemap-dynamic-urls",
    maxAge: 60 * 10, // cache URLs for 10 minutes
  }
);
