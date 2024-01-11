<script setup>
import avatar1 from '@images/_logo_velma.png'


const props = defineProps({
  companyData: {
    type: Object,
    default: () => {},
  },
  refetch: {
    type: Function,
    default: () => {},
  },
})


const refInputEl = ref()
const avatarImg = ref(avatar1)

const refForm = ref()

const accountDataLocal = computed(() => {
  return props.companyData
})

console.log(accountDataLocal.value)

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        avatarImg.value = fileReader.result
    }
  }
}

const resetAvatar = () => {
  avatarImg.value = avatar1
}
</script>

<template>
  <VCardText
    class="d-flex"
  >
    <!-- 👉 Avatar -->
    <VAvatar
      rounded
      size="100"
      class="me-6"
      :image="avatarImg"
    />

    <!-- 👉 Upload Photo -->
    <form
      ref="refForm"
      class="d-flex flex-column justify-center gap-4"
    >
      <div class="d-flex flex-wrap gap-2">
        <VBtn
          color="primary"
          @click="refInputEl?.click()"
        >
          <VIcon
            icon="tabler-cloud-upload"
            class="d-sm-none"
          />
          <span class="d-none d-sm-block">Upload Company Logo</span>
        </VBtn>

        <input
          ref="refInputEl"
          type="file"
          name="file"
          accept=".jpeg,.png,.jpg,GIF"
          hidden
          @input="changeAvatar"
        >

        <VBtn
          type="reset"
          color="secondary"
          variant="tonal"
          @click="resetAvatar"
        >
          <span class="d-none d-sm-block">Reset</span>
          <VIcon
            icon="tabler-refresh"
            class="d-sm-none"
          />
        </VBtn>
      </div>

      <p class="text-body-1 mb-0">
        Allowed JPG, GIF or PNG. Max size of 800K
      </p>
    </form>
  </VCardText>
</template>
