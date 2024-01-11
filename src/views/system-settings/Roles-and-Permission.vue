<script setup>
import Table from '@/pages/components/table.vue';
import { useRoute } from 'vue-router';
import RoleDialogue from './dialog-forms/RolesDialog.vue';


const props = defineProps({
  roles: { type: Array, default: () => [] },
  loading: { type: Boolean, default: () => true },
})

const transfomRolesTab = (roles = []) => {
  let _ = []
  roles.forEach(role => {
    _.push({
      title: role.name.replaceAll('_', ' '),
      icon: 'tabler-use',
      tab: role.name.toLowerCase().replaceAll(' ', '-'),
    })
  })

  return _
}

const _roles = computed(() => props.roles)

const tabs = ref([])
const loading = ref(props.loading)

watch(_roles, () => {
  const _ = transfomRolesTab(_roles.value)

  tabs.value = _
  loading.value = false
})

const route = useRoute()
const activeTab = ref(route.params.tab)

const fetchData = () => {
}

const isRoleDialogVisible = ref(false)

const permissions = ref([
  {
    id: '1',
    name: 'View Raw Material Reports',
    value: true,
  },
  {
    id: '2',
    name: 'View Production Reports',
    value: true,
  },
  {
    id: '3',
    name: 'View Finished Goods Reports',
    value: true,
  },
  {
    id: '4',
    name: 'View Quality Control Reports',
    value: false,
  },
  {
    id: '5',
    name: 'Add Raw Material',
    value: false,
  },
  {
    id: '6',
    name: 'Add Raw Material Request',
    value: true,
  },
])

const header = [
  {
    id: 1,
    name: 'All Permissions',
    key: 'name',
  },
  {
    id: 1,
    name: 'Turn On / Off',
    key: 'value',
  },
]
</script>

<template>
  <VCard>
    <VCardText>
      <VRow>
        <VCol cols="3">
          <h5 class="text-uppercase my-4">
            All Roles
          </h5>
          <VTabs
            v-model="activeTab"
            direction="vertical"
          >
            <VTab
              v-for="item in tabs"
              :key="item.icon"
              :value="item.tab"
              :to="{ name: 'system-settings-tab', params: { tab: item.tab } }"
              @click="fetchData"
            >
              {{ item.title }}
            </VTab>
          </VTabs>
        </VCol>
        <VCol cols="9">
          <div class="d-flex justify-content-between mb-5">
            <VSpacer />
            <VBtn
              prepend-icon="tabler-plus"
              variant="outlined"
              @click="isRoleDialogVisible = true"
            >
              Add Role
            </VBtn>
          </div>
          <VWindow
            v-model="activeTab"
            class="mt-6 disable-tab-transition"
            :touch="false"
          >
            <template
              v-for="(role, i) in tabs"
              :key="i"
            >
              <VWindowItem :value="role.tab">
                <Table
                  :row-count="false"
                  :table-data="permissions"
                  :table-header="header"
                  :is-loading="loading"
                >
                  <template #cell-name="{ row: permission }">
                    {{ permission.name }}
                  </template>
                  <template #cell-value="{ row: permission }">
                    <VSwitch
                      :id="permission.id"
                      :key="permission.id"
                      v-model="permission.value"
                    />
                  </template>
                </Table>
              </VWindowItem>
            </template>
            <RoleDialogue v-model:isDialogVisible="isRoleDialogVisible" />
          </VWindow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<route lang="yaml">
meta:
  navActiveLink: system-settings-tab
</route>
