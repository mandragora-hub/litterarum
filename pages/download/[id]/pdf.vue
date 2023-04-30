<script setup lang="ts">
// const runtime = useRuntimeConfig();

const route = useRoute();
const bookId = route.params.id as string;
const TYPE_FILE = "pdf";
const book = await getBook(bookId);
//
const link = $ref<HTMLAnchorElement>();
// const { t } = useI18n();
const { isReady, isLoading } = useAsyncState(
  async () => {
    const result = await downloadBook(bookId, TYPE_FILE);
    const blobURL = URL.createObjectURL(result);
    if (!link) return;
    link.href = blobURL;
    link.download = book.data.pdfFile!;
    return blobURL;
  },
  null
  // { immediate: false }
);

// function onSubmit(token) {
//   console.log(token);
// }

// pointer-events: none;
definePageMeta({
  layout: false,
});
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <nav class="bg-white border-b dark:bg-gray-900">
      <Container>
        <Logo class="p-4 text-2xl" />
      </Container>
    </nav>

    <main class="flex-1 mx-auto w-full h-full bg-slate-50">
      <Container class="flex flex-col">
        <div
          class="flex flex-col items-center text-center space-y-6 bg-white border shadow-lg py-8 my-8 mx-auto"
        >
          <h1 class="text-xl font-bold text-blue-400">
            {{ `${book.data.title} - ${book.data.author.name}` }}
          </h1>

          <div class="flex flex-col space-y-2">
            <p>Libro en espanol | tamano 8MB</p>
            <p>Descargas 8</p>
            <a
              ref="link"
              class="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center font-bold"
            >
              <div v-if="isLoading">
                <Icon
                  name="svg-spinners:blocks-wave"
                  class="inline w-4 h-4 mr-2"
                />
                Preparing you download...
              </div>
              <div v-if="isReady">
                <Icon name="mdi:download" class="inline w-4 h-4 mr-2" />
                Download
              </div>
            </a>
          </div>
          <!-- <div>
            <p>Por favor, completa el capcha para continuar.</p>
            <button
              class="g-recaptcha text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 inline-flex items-center font-bold"
              :data-sitekey="runtime.public.recaptchaSiteKey"
              data-callback="onSubmit"
              data-action="submit"
            >
              Continuar
            </button>
          </div> -->

          <div class="bg-yellow-100 w-full py-4 border space-y-2">
            <p>
              <span class="font-bold">¿Ha funcionado la descarga?</span> Puedes
              apoyar este proyecto haciendo un donativo a través de PayPal.
              Ayúdanos a alcanzar los objetivos para seguir en funcionamiento y
              llegar a más usuarios.
              <NuxtLink class="text-blue-500" to="/donate">Ver más</NuxtLink>
            </p>
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
            >
              <input
                type="hidden"
                name="hosted_button_id"
                value="SXF5G5QGHJEUN"
              />
              <input
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                border="0"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypal.com/en_DO/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </div>
        </div>
      </Container>
    </main>
    <Footer />
  </div>
</template>
