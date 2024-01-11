<script setup>
import { avatarText, formatDate } from '@/@core/utils/formatters';
import { useAdminStore } from '@/stores';
import Loader from "@/pages/components/Loader.vue";
import { useRouter } from 'vue-router';

const props = defineProps({
  openModal: {
    type: Function,
    default: () => { },
  },
  loading: {
    type: Boolean,
    default: () => { },
  },
  userList: {
    type: Array,
    default: () => { },
  },
  metaData: {
    type: Object,
    default: () => { },
  },
})

const emits = defineEmits(['paginationData', 'page'])

const router = useRouter()


const resolveUserStatusVariant = stat => {
  if (stat === true)
    return 'success'
  if (stat === false)
    return 'error'

  return 'primary'
}

const loading = computed(() => {
  return props.loading
})

const userList = computed(() => {
  return props.userList
})

const metaData = computed(() => {
  return props.metaData
})

const header = [
  {
    id: 1,
    name: '#',
    key: 'index',
  },
  {
    id: 2,
    name: 'Name',
    key: 'name',
  },
  {
    id: 7,
    name: 'Role',
    key: 'Role',
  },
  {
    id: 3,
    name: 'Phone Number',
    key: 'Phone',
  },
  {
    id: 4,
    name: 'Date Joined',
    key: 'date',
  },
  {
    id: 5,
    name: 'Status',
    key: 'status',
  },
]

const paginationData = computed(() => {
  return `Showing ${(metaData.value?.page - 1) * metaData.value?.page_size + 1} to 
  ${userList?.value?.length >= metaData?.value?.page_size ? metaData?.value?.page_size * metaData.value?.page : metaData.value?.total_items} of 
  ${metaData.value?.total_items} entries`
})

const retrievePage = e => {
  emits('page', e)
}
</script>

<template>
  <VCardText>
    <div v-if="loading" class="empty_state mt-10 mb-10">
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
          <tr v-for="(user, index) in userList" :key="user.id" style="height: 3.75rem;" class=""
            @click.prevent="() => router.push({ name: 'admin-systems-settings-users-list-id', params: { id: user?.id } })">
            <td>{{ index + 1 }}</td>
            <!-- 👉 User -->
            <td>
              <div class="d-flex align-center">
                <VAvatar variant="tonal" color="primary" class="me-3" size="38">
                  <VImg v-if="user.avatar" :src="user.avatar" />
                  <span v-else>{{ avatarText(`${user.first_name} ${user.last_name}`) }}</span>
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-base">
                    <RouterLink :to="{ name: '', params: { id: user.id } }" class="font-weight-medium user-list-name">
                      {{ `${user.first_name} ${user.last_name}` }}
                    </RouterLink>
                  </h6>
                  <span class="text-sm text-disabled">@{{ user.email }}</span>
                </div>
              </div>
            </td>

            <!-- 👉 Role -->
            <td>
              <small v-for="role in user.groups" :key="role.id">
                <span class="text-capitalize text-subtitle-2">{{ role.name }}</span>
              </small>
            </td>
            <!-- 👉 Phone -->
            <td class="d-grid items-center gap-4">
              <VIcon icon="tabler-phone" color="success" />
              <span class="text-capitalize text-subtitle-2">{{ user.phone_number }}</span>
            </td>
            <!-- 👉 Date -->
            <td>
              <span class="text-capitalize text-subtitle-2">{{ formatDate(user.created_at)
              }}</span>
            </td>

            <!-- 👉 Status -->
            <td>
              <VChip label :color="resolveUserStatusVariant(user.is_active)" size="small" class="text-capitalize">
                {{ user.is_active === true ? 'active' : 'inactive' }}
              </VChip>
            </td>
          </tr>
        </tbody>

        <!-- 👉 table footer  -->
        <tfoot v-show="!userList?.length">
          <tr>
            <td colspan="7" class="text-center">
              No data available
            </td>
          </tr>
        </tfoot>
      </VTable>
      <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3">
        <!-- 👉 Pagination meta -->
        <span class="text-sm text-disabled">{{ paginationData }}</span>

        <!-- 👉 Pagination -->
        <VPagination v-model="metaData.page" size="small" :total-visible="metaData.page_size"
          :length="metaData.total_pages" @next="retrievePage" @update:model-value="retrievePage" />
      </VCardText>
    </template>
  </VCardText>
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
