import { useRawMaterialsStore } from '@/stores'

export const useFormComposable = props => {
  const loading = ref(false)
  const deleting = ref(false)

  const message = inject('showToaster')
  const store = useRawMaterialsStore();

  async function createForm() {
    loading.value = true;
    try {
      const res = props.type === "material" ? await store.createRawMaterialsForm({ materialform_data: { formFields: JSON.stringify(props.fields.value) } })
        : await store.createStockForm({ restockform_data: { formFields: JSON.stringify(props.fields.value) } })

      if([200, 201].includes(res.status)) {
        message('Form successfully created', 'success')
      } else {
        message('Error Occured', 'error')
      }
    } catch (error) {
      message('Form creation not successsfull', 'error')
    } finally {
      loading.value = false;
      props.type === "material" ? await store.fetchRawMaterialsForm() : await store.fetchStockForm()
    }
  }

  async function editForm() {
    loading.value = true;
 
    const editMat = { type: 'material_form', id: props.formId.value, payload: { materialform_data: { formFields: JSON.stringify(props.fields.value) } } }
    const editStock = { type: 'restock_form', id: props.formId.value, payload: { restockform_data: { formFields: JSON.stringify(props.fields.value) } } }
    try {
      const res = props.type === "material" ? await store.updateForm(editMat)
        : await store.updateForm(editStock)

      if(res.status === 200) {
        message('Form successfully edited', 'success')
      } else {
        message('Error Occured', 'error')
      }
    } catch (error) {
      message('Form creation not successsfull', 'error')
    } finally {
      loading.value = false;
      props.type === "material" ? await store.fetchRawMaterialsForm() : await store.fetchStockForm()
    }
  }
 
  async function sendForm() {
    props.editing.value ? await editForm() : await createForm();
  }

  async function deleteForm() {
    deleting.value = true
    try {
      const res = props.type === 'material' ? await store.deleteForm({ type: 'material_form', id: props.formId.value }) :
        await store.deleteForm({ type: 'restock_form', id: props.formId.value })

      console.log({ res })
    } catch (error) {
      message('Could not delete form', 'error')
    } finally {
      deleting.value = false
      props.type === 'material' ? store.fetchRawMaterialsForm() : store.fetchStockForm()
    }
  }

  return {
    sendForm,
    loading,
    deleteForm,
    deleting,
  }
}
