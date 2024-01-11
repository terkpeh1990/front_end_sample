<script setup>
import { avatarText, formatDate } from '@/@core/utils/formatters';
import Loader from "@/pages/components/Loader.vue";

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
    name: 'Last Login',
    key: 'location',
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
];

const resolveUserStatusVariant = stat => {
  if (stat === true)
    return 'success'
  if (stat === false)
    return 'error'

  return 'primary'
};

const userList = [
  // {
  //   id: 1,
  //   first_name: 'Sam',
  //   last_name: 'Smith',
  //   email: 'sam@gmail.com',
  //   is_active: true,
  //   groups: [{ name: 'admin' }],
  // },
];
</script>

<template>
  <div>
    <div v-if="!userList.length" class="empty_state mt-5 text-center">
      <img src="@images/empy_state.svg" alt="">
      <p class="mt-0">
        No Users Added yet
      </p>
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
          <tr v-for="(user, index) in userList" :key="user.id" style="height: 3.75rem;" class="">
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
            <!-- 👉 last login -->
            <td>
              <span class="text-capitalize text-subtitle-2">{{ user.lastLogin }}</span>
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
        <tfoot v-show="!userList.length">
          <tr>
            <td colspan="7" class="text-center">
              No data available
            </td>
          </tr>
        </tfoot>
      </VTable>
    </template>
  </div>
</template>
