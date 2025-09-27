<template>
  <v-container class="fill-height width-100" max-width="900">
    <v-row>
      <v-col>
        <div>
          <div class="d-flex align-center justify-center">
            <v-img
              class="mt-4"
              height="150"
              width="150"
              max-width="150"
              src="/diia.svg"
            />
            <div class="ml-4 text-h1 font-weight-black">злив</div>
          </div>
          <div class="mb-8 mt-8 text-center">
            <div class="text-h4 font-weight-light mb-n1">Завантаження свіжих дампів із "Дії"</div>
          </div>

          <div class="mb-8 text-center">
            <div class="text-h6 font-weight-light mb-n1">Визначіть скільки рядків даних ви хочете завантажити</div>
            <div class="mt-4 d-flex align-center justify-center w-100">
              <v-text-field
                v-model="rows"
                variant="outlined"
                max-width="300"
                class="text-center bg-grey-lighten-3 centered-input"
                hide-details
              />
            </div>
          </div>

          <div class="mb-8 text-center">
            <div class="text-h6 font-weight-light mb-n1">Ви збираєтеся завантажити близько <span class="text-h6 font-weight-black text-red">{{ formatBytes(355 * rows) }}</span>.</div>
            <div class="text-h6 font-weight-light mt-2 mb-n1">
              Це можна продати за <span class="text-h6 font-weight-black text-red">{{ (3 * rows / (20 * 10 ** 6)).toFixed(2) }} ETH</span>.
            </div>
          </div>

          <div class="mb-8 text-center">
            <v-btn @click="saveData" size="x-large" color="black">Завантажити</v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.centered-input input {
  text-align: center;
  font-size: 2em;
}
</style>

<script setup lang="ts">
import csvWorker from '@/plugins/generate-csv.ts?worker'
import streamSaver from 'streamsaver'

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const value = bytes / Math.pow(k, i)
  return `${value.toFixed(decimals)} ${sizes[i]}`
}

const rows = ref(1000)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
}
const csvGenerator = new csvWorker()

const saveData = async () => {
  const fileStream = streamSaver.createWriteStream('DIIA_users_DB_2025.csv')
  const writer = fileStream.getWriter()

  csvGenerator.onmessage = async e => {
    if (e.data.done) {
      await writer.close()
    } else {
      await writer.write(new Uint8Array(e.data.chunk))
    }
  }
  csvGenerator.postMessage({ rows: rows.value })
}

</script>
