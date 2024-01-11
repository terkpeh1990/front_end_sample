<!-- eslint-disable import/no-unresolved -->
<script setup>
import { avatarText, formatDate, getRandomColor } from '@/@core/utils/formatters';
import Table from '@/pages/components/table.vue';

const props = defineProps({
  openWaitlistModal: { type: Function, default: () => { } },
  handleRowClick: { type: Function, default: () => { } },
  waitlist: {
    type: Array,
    default: () => { },
  },
  meta: {
    type: Object,
    default: () => { },
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([, 'pageChange', 'editCompany', 'deactivateCompany'])

const header = [
  {
    id: 2,
    name: 'Name',
    key: 'name',
  },
  {
    id: 7,
    name: 'Industry',
    key: 'industry',
  },
  {
    id: 3,
    name: 'Location',
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
]

const loading = computed(() => props.loading);
const waitlist = computed(() => props.waitlist);
const meta = computed(() => props.meta);

const fetchPageData = page => {
  emit('pageChange', page)
}

const resolveDataStatusVariant = status => {
  if (status === 'Approved')
    return {
      variant: 'success',
      icon: 'tabler-circle-half-2',
    }
  if (status === 'Pending')
    return {
      variant: 'warning',
      icon: 'tabler-chart-pie',
    }

  return {
    variant: 'secondary',
    icon: 'tabler-x',
  }
};
</script>

<template>
  <Table :table-header="header" :table-data="waitlist" :meta-data="meta" :is-loading="loading" handle-click
    :click-action="(id) => props.handleRowClick(id)" @page="fetchPageData">
    <template #cell-name="{ row: company }">
      <div class="d-flex align-center">
        <VAvatar size="34" :color="getRandomColor()" variant="tonal" class="me-3">
          <span>{{ avatarText(company.name) }}</span>
        </VAvatar>
        <div class="d-flex flex-column">
          <h6 class="text-base font-weight-medium mb-0">
            {{ company.name || 'N/A' }}
          </h6>
          <span class="text-disabled text-sm">{{ company.sub_domains || 'N/A' }}</span>
        </div>
      </div>
    </template>
    <template #cell-location="{ row: company }">
      {{ (company.address) ? `${company.address?.city}, ${company.address?.country}` : 'N/A' }}
    </template>
    <template #cell-industry="{ row: company }">
      {{ company.industry || 'N/A' }}
    </template>
    <template #cell-date="{ row: company }">
      {{ formatDate(company.created_at) || 'N/A' }}
    </template>
    <template #cell-status="{ row: company }">
      <VChip label :color="resolveDataStatusVariant(company.status).variant">
        {{ company.status }}
      </VChip>
    </template>
    <template #cell-actions="{ row: company }">
      <VBtn icon variant="text" color="default" size="x-small">
        <VIcon :size="22" icon="tabler-dots-vertical" />

        <VMenu activator="parent">
          <VList>
            <VListItem :to="{ name: 'system-settings-company-id', params: { id: company.id } }">
              <template #prepend>
                <VIcon size="24" class="me-3" icon="tabler-eye" />
              </template>

              <VListItemTitle>View</VListItemTitle>
            </VListItem>

            <VListItem v-if="!company.status" @click="$emit('deactivateCompany', { id: company.id, status: true })">
              <template #prepend>
                <VIcon size="24" class="me-3" icon="tabler-check" />
              </template>

              <VListItemTitle>
                Activate
              </VListItemTitle>
            </VListItem>
            <VListItem v-if="company.status" @click="$emit('deactivateCompany', { id: company.id, status: false })">
              <template #prepend>
                <VIcon size="24" class="me-3" icon="tabler-x" />
              </template>

              <VListItemTitle>
                Deactivate
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </VBtn>
    </template>
  </Table>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-actions {
    inline-size: 8rem;
  }

  .invoice-list-filter {
    inline-size: 12rem;
  }
}
</style>
