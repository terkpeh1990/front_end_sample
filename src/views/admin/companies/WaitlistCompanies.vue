<!-- eslint-disable import/no-unresolved -->
<script setup>
import { useAdminStore } from "@/stores"
import Search from "@/pages/components/Search.vue";
import WailistDialog from "./WaitlistActionDialog.vue"
import WaitlistTable from "./WaitlistTable.vue"
import { useRouter } from "vue-router"

const props = defineProps({
  openWaitlistModal: { type: Function, default: () => { } },
})

const emit = defineEmits([, 'editCompany', 'deactivateCompany'])

const store = useAdminStore();
const router = useRouter()
const message = inject('showToaster')

const page = ref(1);
const search = ref("")
const actionToPerform = ref("")
const companyId = ref("")
const loading = ref(false)
const isFetchingCompany = ref(false)
const showModal = ref(false)
const company = ref({})
const confirmDelete = ref(false)

const fetchWaitlist = async (page = 1, search = "") => {
  loading.value = true;
  await store.getWaitlist(page, search)
  loading.value = false;
}

watchEffect(fetchWaitlist(page.value, search.value))

const { waitlist, meta } = store;

const handleActionDone = () => {
  fetchWaitlist(page.value, search.value);
  showModal.value = false;
}


function handleRowClick(id) {
  const findCompany = waitlist.value.find(one => one.id = id);

  company.value = findCompany;
  showModal.value = true
}

const searchCompany = searchQuery => {
  isFetchingCompany.value = true;
  fetchWaitlist(page.value, searchQuery)
};

const dialogModelValueUpdate = val => {
  showModal.value = false;
};

const handlePageChange = val => { };

const approveremoveCompany = (id, action) => {
  companyId.value = id;
  actionToPerform.value = action
  confirmDelete.value = true;
};

const viewCompany = (id, action) => {
  companyId.value = id;
  actionToPerform.value = action;
  router.push({ name: 'companies-company-id', params: { id: id }, query: 'watlist' })
};


const handleConfirmDialog = async val => {
  try {
    const result = actionToPerform.value === 'approve'
      ? await store.approveWaitlist(companyId.value)
      : await store.removeFromWaitlist(companyId.value);

    if ([200, 201].includes(result.status)) {
      message(`Company ${actionToPerform.value}`, 'success')
    } else {
      message(`Could not ${actionToPerform.value} Company`, 'error')
    }

  } catch (error) {
    message('Error occured', 'error')
  } finally {
    handleActionDone()
  }
};
</script>

<template>
  <VCard class="px-5 py-5">
    <div class="d-flex justify-content-between mb-5">
      <Search :loading="isFetchingCompany" @search-query="searchCompany" />
      <VSpacer />
      <VBtn prepend-icon="tabler-plus" @click="props.openWaitlistModal">
        Add to waitlist
      </VBtn>
    </div>
    <WailistDialog :is-local-dialog-visible="showModal" :company="company"
      :dialog-model-value-update="dialogModelValueUpdate" :delete-company="approveremoveCompany"
      :view-company="viewCompany" :approve-company="approveremoveCompany" />
    <ConfirmDialog v-model:isDialogVisible="confirmDelete"
      :confirmation-msg="`Are you sure you want to ${actionToPerform.toUpperCase()} ${company.name} from the companies waitlist?`"
      @confirm="(isConfirmed) => {
          if (isConfirmed) {
            handleConfirmDialog()
          }
        }" />
    <WaitlistTable :handle-row-click="handleRowClick" :waitlist="waitlist" :meta="meta" :loading="loading"
      @page-change="handlePageChange" />
  </VCard>
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
