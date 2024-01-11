<script setup>
const showDialog = ref(true)
</script>

<template>
  <VRow justify="center">
    <VDialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <VBtn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </VBtn>
      </template>
      <VCard>
        <VCardTitle>
          <span class="text-h5">User Profile</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  label="Legal first name*"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
                md="4"
              >
                <VTextField
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  label="Email*"
                  required
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  label="Password*"
                  type="password"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VSelect
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                />
              </VCol>
              <VCol
                cols="12"
                sm="6"
              >
                <VAutocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                />
              </VCol>
            </VRow>
          </VContainer>
          <small>*indicates required field</small>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="blue darken-1"
            text
            @click="showDialog = false"
          >
            Close
          </VBtn>
          <VBtn
            color="blue darken-1"
            text
            @click="showDialog = false"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>
