import {  useUserStore } from '@/stores'


export const useUserComposable = ({ userId, payload, refetch }) => {
  const loading = ref(false);
  const store = useUserStore()

  const message = inject('showToaster')


  const updateUserDetails = async () => {
    loading.value = true;
    try {
      const res = await store.updateSingleUserDetails({ userId: userId, payload: payload.value })
      if(res.status === 200) {
        message('User details updated', 'success')
      } else {
        message('User details update not successfull', 'error')
      }
    } catch (error) {
      return error
    } finally {
      loading.value = false;
      refetch()
    }
  }

  const updatetUserPassword = async () => {
    loading.value = true;
    try {
      const res = await store.updatetUserPassword(payload.value)
      if([200,201].includes(res.status)) {
        message('User password updated', 'success')
      } else {
        message('User password update not successfull', 'error')
      }
    } catch (error) {
      return error
    } finally {
      loading.value = false;
      refetch()
    }
  }

  return {
    updateUserDetails,
    updatetUserPassword,
    loading,
  }
}
