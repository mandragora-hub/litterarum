<script setup lang="ts">
import ePub from "epubjs";
const route = useRoute();
const router = useRouter();
const filename = route.params.filename as string;
const runtime = useRuntimeConfig();

const ePubUrl = $computed(
  () =>
    `${runtime.public.apiBaseUrl}/${runtime.public.apiVersion}/files/${filename}`
);

const book = ePub(ePubUrl);
const rendition = book.renderTo("viewer", {
  flow: "scrolled-doc",
});
const hash = window.location.hash.slice(2);
rendition.display(hash || undefined);

const next = $ref<HTMLAnchorElement>();
next?.addEventListener(
  "click",
  function (e) {
    rendition.next();
    e.preventDefault();
  },
  false
);

const prev = $ref<HTMLAnchorElement>();
prev?.addEventListener(
  "click",
  function (e) {
    rendition.prev();
    e.preventDefault();
  },
  false
);

rendition.on("rendered", function (section: any) {
  const nextSection = section.next();
  const prevSection = section.prev();

  if (nextSection) {
    const nextNav = book.navigation.get(nextSection.href);
    const nextLabel = nextNav ? nextNav.label : "next";
    next!.textContent = nextLabel + " »";
  } else {
    next!.textContent = "";
  }

  if (prevSection) {
    const prevNav = book.navigation.get(prevSection.href);
    const prevLabel = prevNav ? prevNav.label : "previous";
    prev!.textContent = "« " + prevLabel;
  } else {
    prev!.textContent = "";
  }

  // Add CFI fragment to the history
  router.replace({ hash: `#/${section.href}` });
});

rendition.on("relocated", function (location: string) {
  console.log(location);
});

book.loaded.navigation.then(function (toc) {
  const nav = document.getElementById("toc");
  const docFrag = document.createDocumentFragment();

  const addTocItems = function (parent: any, tocItems: any) {
    const ul = document.createElement("ul");
    tocItems.forEach(function (chapter: any) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = chapter.label;
      link.href = chapter.href;
      item.appendChild(link);

      if (chapter.subitems) {
        addTocItems(item, chapter.subitems);
      }

      link.onclick = function () {
        const url = link.getAttribute("href");
        rendition.display(url!);
        return false;
      };

      ul.appendChild(item);
    });
    parent.appendChild(ul);
  };

  addTocItems(docFrag, toc);

  nav!.appendChild(docFrag);

  if (nav!.offsetHeight + 60 < window.innerHeight) {
    nav!.classList.add("fixed");
  }
});

book.loaded.metadata.then(function (meta) {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const cover = document.getElementById("cover");

  title!.textContent = meta.title;
  author!.textContent = meta.creator;
  if (book.archive) {
    book.archive.createUrl(book.cover).then(function (url) {
      cover.src = url;
    });
  } else {
    cover.src = book.cover;
  }
});

// const params =
//   URLSearchParams && new URLSearchParams(document.location.search.substring(1));
// const currentSectionIndex =
//   params && params.get("loc") ? params.get("loc") : undefined;

// const book = Epub(ePubUrl);
// const rendition = book.renderTo("viewer", {
//   manager: "continuous",
//   flow: "scrolled",
//   width: "100%",
//   height: "100%",
// });
// // const rendition = book.renderTo("render", { width: 600, height: 400 });
// const displayed = rendition.display(currentSectionIndex!);

// displayed.then(function (renderer) {
//   // -- do stuff
// });

// Navigation loaded
// book.loaded.navigation.then(function (toc) {
//   console.log(toc);
// });

// const book = await getBook(bookId);

useHead(() => ({
  title: filename,
  // meta: [
  //   {
  //     name: "description",
  //     content: book.data.description || "",
  //   },
  // ],
}));

definePageMeta({
  layout: false,
});
</script>

<template>
  <div id="content">
    <div id="navigation">
      <h1 id="title">...</h1>
      <image id="cover" width="150px" />
      <h2 id="author">...</h2>
      <div id="toc"></div>
    </div>
    <div id="main">
      <div id="viewer"></div>
      <div id="pagination">
        <a ref="prev" href="#prev" class="arrow">...</a>
        <a ref="next" href="#next" class="arrow">...</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  margin: 0;
  background: #aba6a6;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

#navigation {
  width: 300px;
  position: absolute;
  overflow: auto;
  top: 60px;
  left: 1000px;
}

#navigation.fixed {
  position: fixed;
}

#navigation h1 {
  width: 200px;
  font-size: 16px;
  font-weight: normal;
  color: #777;
  margin-bottom: 10px;
}

#navigation h2 {
  font-size: 14px;
  font-weight: normal;
  color: #b0b0b0;
  margin-bottom: 20px;
}

#navigation ul {
  padding-left: 18px;
  margin-left: 0;
  margin-top: 12px;
  margin-bottom: 12px;
}

#navigation ul li {
  list-style: decimal;
  margin-bottom: 10px;
  color: #cccddd;
  font-size: 12px;
  padding-left: 0;
  margin-left: 0;
}

#navigation ul li a {
  color: #ccc;
  text-decoration: none;
}

#navigation ul li a:hover {
  color: #777;
  text-decoration: underline;
}

#navigation ul li a.active {
  color: #000;
}

#viewer {
  overflow: hidden;
  width: 800px;
  margin: 0 50px;
  background: url("ajax-loader.gif") center center no-repeat;
}

#viewer .epub-view {
  background: white;
  box-shadow: 0 0 4px #ccc;
  /*margin: 10px;*/
  /*padding: 40px 80px;*/
}

#main {
  position: absolute;
  top: 50px;
  left: 50px;
  width: 800px;
  z-index: 2;
  transition: left 0.15s cubic-bezier(0.55, 0, 0.2, 0.8) 0.08s;
}

#main.open {
  left: 0;
}

#pagination {
  text-align: center;
  margin-left: 80px;
  /*padding: 0 50px;*/
}

.arrow {
  margin: 14px;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  color: #ccc;
}

.arrow:hover {
  color: #777;
}

.arrow:active {
  color: #000;
}

#prev {
  float: left;
}

#next {
  float: right;
}

#toc {
  display: block;
  margin: 10px auto;
}
</style>
