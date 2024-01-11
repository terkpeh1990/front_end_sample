<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { avatarText } from '@/@core/utils/formatters';

const props = defineProps({
  toggleModal: {
    type: Function,
    default: () => {},
  },
  handleChange: {
    type: Function,
    default: () => {},
  },
  dialogModelValueUpdate: {
    type: Function,
    default: () => {},
  },
  roles: {
    type: Array,
    default: () => {[]},
  },
  editingRole: {
    type: String,
    default: '',
  },
  isLocalDialogVisible: {
    type: Boolean,
    default: false,
  },
})


const editingRole = computed(() => {
  return props.editingRole
})

const isFormValid = ref(false)
const refForm = ref()

const permissions =['read', 'write', 'create']
</script>

<template>
  <VDialog
    max-width="600"
    :model-value="props.isLocalDialogVisible"
    :height="$vuetify.display.smAndUp ? '550' : '100%'"
    :fullscreen="$vuetify.display.width < 600"
    class="d-flex justify-center"
    @update:model-value="props.dialogModelValueUpdate"
  >
    <PerfectScrollbar
      :options="{ wheelPropagation: false, suppressScrollX: true }"
      class="h-100"
    >
      <VCard>
        <VCardText class="flex d-flex align-center justify-space-between pa-4">
          <div>
            <p class="mb-0">
              Update Role
            </p>
          </div>
          <VBtn
            icon
            variant="text"
            color="default"
            size="x-small"
            @click="props.toggleModal"
          >
            <VIcon
              size="22"
              icon="tabler-x"
            />
          </VBtn>
        </VCardText>
        <VDivider />
        <VCardText>
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="() => {}"
          >
            <VCol
              class="mb-2"
              cols="12"
            >
              <p class="text-sm text-capitalize mb-4">
                Role Name
              </p>
              <VTextField
                v-model="editingRole"
                label="Role Name"
                type="text"
                readonly
              />
            </VCol>
            <VCol
              class="mb-12"
              cols="12"
            >
              <p class="text-sm text-capitalize mb-4">
                Role Permissions
              </p>
              <div
                v-for="(role, i) in props.roles"
                :key="role.name"
                class=""
              >
                <p class="mb-0 whitespace-no-wrap">
                  {{ role.name }}
                </p>
            
                <div
                  v-for="(permission, j) in role.permissions"
                  :key="permission.id"
                  class="d-flex align-center gap-4"
                >
                  <VCol class="pa-0">
                    <VLabel
                      class="text-capitalize"
                    >
                      {{ `${permission.codename} ${avatarText(role.name)}` }}
                    </VLabel>
                  </VCol>
                  <VCol class="pa-0">
                    <VCheckbox
                      :value="permission.id"
                      @change="props.handleChange(role, permission, i, j)"
                    />
                  </VCol>
                </div>
              </div>
            </VCol>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VDialog>
</template>
