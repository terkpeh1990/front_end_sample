import { useBrandStore, useCategoryStore, useRawMaterialsStore } from '@/stores'
import { groupBy } from '@/@core/utils'

export const useDropdowns = () => {

  const store = useBrandStore()
  const catStore = useCategoryStore()
  const materialStore = useRawMaterialsStore()
  const brands = ref([])
  const categories = ref([])
  const materials = ref([])
  const _materials = ref()


  const fetchBrands = async () => {
    const res = await store.fetchAllbrands(1, '', 50)
    const { data } = res;

    brands.value = data
  }

  const fetchCategories = async () => {
    const res = await catStore.fetchAllCategories(1, '', 50)
    const { data } = res;

    categories.value = data

  }

  const fetchMaterials = async () => {
    const res = await materialStore.fetchRawMaterials(1, '', 50)
  
    materials.value = res.data
  }

  const fetchMaterialsForCategory = computed(() => groupBy(materials.value, 'category_id'))
  
  watchEffect(() => fetchBrands())
  watchEffect(() => fetchCategories())
  watchEffect(() => fetchMaterials())


  return {
    brands,
    categories,
    materials,
    _materials,
    fetchMaterialsForCategory,
  }
}
