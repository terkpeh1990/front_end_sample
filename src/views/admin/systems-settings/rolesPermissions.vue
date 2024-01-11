<script setup>
import { avatarText } from '@/@core/utils/formatters';
import { useRolesComposable } from "@/@core/composable/useFetchRoles"
import Loader from "@/pages/components/Loader.vue";
import PermissionsDrawer from "./permissionModal.vue"

// import AddRoleForm from "./addRoleForm.vue"
import { useRoleStore } from '@/stores';


const props = defineProps({
  openModal: {
    type: Function,
    default: () => { },
  },
})


const header = [
  {
    id: 1,
    name: '#',
    key: 'index',
  },
  {
    id: 2,
    name: 'Role Name',
    key: 'name',
  },
  {
    id: 3,
    name: 'Permissions',
    key: 'permissions',
  },
  {
    id: 4,
    name: 'Actions',
    key: 'actions',
  },
]

const roles = [
  { id: 1, name: 'Raw Mategiral', perms: [], permissions: [{ id: 180, codename: 'view' }, { id: 170, codename: 'add' }] },
  { id: 2, name: 'Quality Assurance', perms: [], permissions: [{ id: 181, codename: 'view' }, { id: 171, codename: 'add' }] },
]


const { loading, userGroups } = useRolesComposable();

const userRoles = computed(() => {
  return userGroups.value
})

const isLoading = computed(() => {
  return loading.value
})

const isLocalDialogVisible = ref(false)
const showAdd = ref(false)
const editingRole = ref('')

const formData = ref({
  roles: roles,
})

// const { fetchPermissions } = useRoleStore()

// const fetchPerm = async  () => {
//   try {
//     const res = await fetchPermissions();

//     console.log(res);
//   } catch (error) {
//     console.log(error)
//   }
// }

// watchEffect(fetchPerm);

const toggleAddModal = () => {
  showAdd.value = !showAdd.value
}

const toggleModal = val => {
  editingRole.value = val;
  isLocalDialogVisible.value = true
}

const closePermissionModal = val => {
  isLocalDialogVisible.value = false
}

const dialogModelValueUpdate = val => {
  isLocalDialogVisible.value = false
}


const resolveUserRoleVariant = role => {
  if (role === 'admin')
    return {
      color: 'success',
      icon: 'tabler-user',
    }

  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

function handlePermissionChange(role, permission, i, j) {
  const initArray = formData.value.roles[i].perms

  formData.value.roles[i].name = role.name;
  initArray.includes(permission.id) ? initArray.splice(j, 1) : initArray.push(permission.id)

}
</script>

<template>
  <VCardText>
    <div class="d-flex justify-end mb-2">
      <VBtn @click="props.openModal">
        <small>
          Add new role
        </small>
      </VBtn>
    </div>
    <div v-if="isLoading" class="empty_state mt-10 mb-10">
      <Loader />
    </div>
    <template v-else>
      <VTable hover class="text-no-wrap">
        <!-- 👉 table head -->
        <thead>
          <tr>
            <th v-for="head in header" :key="head.id" scope="col">
              {{ head.name }}
            </th>
          </tr>
        </thead>
        <!-- 👉 table body -->
        <tbody>
          <tr v-for="(role, index) in userRoles" :key="role.id" style="height: 3.75rem;" class=""
            @click="toggleModal(role.name)">
            <td>{{ index + 1 }}</td>
            <!-- 👉 User -->
            <td>
              <div class="d-flex align-center">
                <VAvatar variant="tonal" :color="resolveUserRoleVariant(role.role).color" class="me-3" size="38">
                  <VImg v-if="role.avatar" :src="role.avatar" />
                  <span v-else>{{ avatarText(role.name) }}</span>
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-base font-weight-semibold">
                    {{ role.name }}
                  </h6>
                  <span class="text-sm text-disabled">{{ role.totalUsers }}5 total users</span>
                </div>
              </div>
            </td>

            <!-- 👉 Role -->
            <td>
              <small>
                <span class="text-capitalize text-subtitle-2">{{ role.permissionsCount }}8 Permissions</span>
              </small>
            </td>
            <!-- 👉 Actions -->
            <td>
              <VBtn icon variant="text" color="default" size="x-small" @click="toggleModal(role.name)">
                <VIcon :size="22" icon="tabler-eye" />
              </VBtn>
            </td>
          </tr>
        </tbody>

        <!-- 👉 table footer  -->
        <tfoot v-show="!userRoles.length">
          <tr>
            <td colspan="7" class="text-center">
              No data available
            </td>
          </tr>
        </tfoot>
      </VTable>
    </template>
  </VCardText>
  <PermissionsDrawer :editing-role="editingRole" :toggle-modal="closePermissionModal" :roles="roles"
    :handle-change="handlePermissionChange" :is-local-dialog-visible="isLocalDialogVisible"
    :dialog-model-value-update="dialogModelValueUpdate" />
</template>

<style lang="scss" scoped>
table {
  tbody {
    tr {
      cursor: pointer;

      &:hover {
        // background-color: rgba(var(--v-theme-primary), 0.1) !important;
      }
    }
  }
}
</style>
