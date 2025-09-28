<template>
  <v-container class="fill-height width-100" max-width="900">
    <v-row>
      <v-col>
        <div>
          <div class="text-center">
            <div class="d-inline-flex align-center justify-center bg-black margin-auto rounded-xl">
              <v-img
                class="mt-4"
                height="150"
                width="150"
                max-width="150"
                src="/diia.svg"
              />
              <div class="mt-2 text-h2 font-weight-black pr-8">злив</div>
            </div>
          </div>
          <div class="mb-8 mt-8 text-center">
            <div class="text-h4 font-weight-light mb-n1">Перший недержавний сервіс<br/>з отримання завжди свіжих зливів із "Дії"</div>
            <div class="mt-2">Перед завантаженням або обуренням ознайомтеся із <v-chip @click="dialog = true" color="red-darken-2">політикою сервісу</v-chip></div>
          </div>

          <div class="mb-6 text-center">
            <div class="text-h6 font-weight-light mb-n1">Визначіть, скільки рядків даних ви хочете завантажити</div>
            <div class="mt-4 d-flex align-center justify-center w-100">
              <v-text-field
                v-model="rows"
                @blur="rows = parseInt(String(rows))"
                type="number"
                min="1"
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
    <v-dialog v-model="dialog" max-width="680">
      <v-card>
        <v-card-title>
          Політика сервісу
        </v-card-title>
        <v-card-text>
          <ul class="ml-8 mr-4 text-justify">
            <li class="mb-4">"<a target="_blank" href="https://www.facebook.com/mintsyfra/posts/1198099892359325">Дія не зберігає персональних даних</a> — система працює за принципом data-in-transit: інформація підтягується з державних реєстрів у момент запиту і не накопичується в застосунку чи на порталі".</li>
            <li class="mb-4">Даний сервіс є генератором випадкових записів, які зберігаються за структурою, яка відповідає наявним "зливам" додатку Дія, розповсюдженим у мережі (включаючи заголовки російською мовою).</li>
            <li class="mb-4">Дані генеруються на стороні користувача, жодних запитів до третіх сторін не здійснюється, жодні дані користувачів не зберігаються</li>
            <li class="mb-4">Для генерації випадкових записів використані набори відкритих даних Укрпошти (<a target="_blank" href="https://www.ukrposhta.ua/files/shares/out/houses.zip">"Довідник поштових адрес"</a>), Державної міграційної служби України (<a target="_blank" href="https://dmsu.gov.ua/assets/files/doc/n_2017_327_dod_2.xls">Довідник кодів та назв структурних підрозділів апарату, територіальних органів та територіальних підрозділів Державної міграційної служби України</a>), Міністерства внутрішніх справ України (<a target="_blank" href="https://zakon.rada.gov.ua/laws/show/730-2015-%D0%BF#Text">"Перелік територіальних органів Міністерства внутрішніх справ, що ліквідуються"</a>). Усі інші дані генеруються за допомогою бібліотеки faker або алгоритмів для генерації ідентифікаторів фізичних осіб та організацій у відповідності до чинного законодавства.</li>
            <li class="mb-4">Дані генеруються таким чином, щоб успішно проходити основні логічні перевірки (контрольні суми РНОКПП, кодів ЄДРПОУ, вік, стать особи, інформацію про видачу документів, тощо). При великому експорті даних не гарантується унікальність ідентифікаторів. Масив, що генерується, включатиме осіб від 14 до 100 років, проте кінцевий розподіл не відповідатиме фактичному демографічному розподілу. Дані про місце отримання документів та місце проживання особи можуть містити дані про різні населені пункти.</li>
            <li class="mb-4">Завантажені дані можуть бути вільно розповсюджені без жодних обмежень. Відповідальність за подальшу обробку даних зберігається за користувачами. Бажано не підпадати під ст. 190 ККУ.</li>
            <li>Безпеки вам та вашим персональним даним!</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialog = false" color="black" variant="tonal">Я зрозумів</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

const dialog = ref(false)
const rows = ref(1000)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
}
const csvGenerator = new csvWorker()

const saveData = async () => {
  const currentYear = new Date().getFullYear()
  const fileStream = streamSaver.createWriteStream(`DIIA_users_DB_${String(currentYear)}.csv`)
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
