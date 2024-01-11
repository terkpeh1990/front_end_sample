import {  useRoleStore } from '@/stores'

export const useRolesComposable = () => {
  const store = useRoleStore()


  const userGroups = ref([])
  const loading = ref(false)

  const fetchRoles = async () => {
    loading.value = true;

    const res = await store.fetchRoles(localStorage.getItem('baseUrl'))
    
    userGroups.value = res.data
    loading.value = false;
  }

  watchEffect(fetchRoles)

  return {
    userGroups,
    loading,
  }
}
