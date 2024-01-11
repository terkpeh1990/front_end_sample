export const store = [
  {
    id: 1,
    name: 'Sugar',
    status: 'Approved',
    balance: '500',
    createdAt: '28th March, 1990',

  },
  {
    id: 2,
    name: 'Oil',
    status: 'New',
    balance: '200',
    createdAt: '28th March, 1980',
  },
]

export const rawMaterials = [
  {
    id: 1,
    date: "28th March 2020",
    name: 'Sugar',
    waybillNumber: '0011345',
    totalQuantity: '245',
    batchNumber: 'SM56G012L',
    expiryDate: '1st June, 2022',
    status: 'Supplied',
  },
  {
    id: 2,
    date: "28th March 2020",
    name: 'Oil',
    waybillNumber: '0011345',
    totalQuantity: '245',
    batchNumber: 'SM56G012L',
    expiryDate: '1st June, 2022',
    status: 'New',
  },
]

export const requestMaterials = [
  {
    id: 1,
    date: "28th March 2020",
    name: 'Sugar',
    type: 'Raw Material',
    totalQuantity: '245',
    batchNumber: 'SM56G012L',
    expiryDate: '1st June, 2022',
    status: 'Pending',
  },
  {
    id: 2,
    date: "28th March 2020",
    name: 'Oil',
    type: 'Packaging Material',
    totalQuantity: '245',
    batchNumber: 'SM56G012L',
    expiryDate: '1st June, 2022',
    status: 'New',
  },
  {
    id: 3,
    date: "28th March 2020",
    name: 'Oil',
    type: 'Packaging Material',
    totalQuantity: '243',
    batchNumber: 'SM56G012L',
    expiryDate: '1st June, 2022',
    status: 'Supplied',
  },
  {
    id: 4,
    date: "28th March 2020",
    name: 'Oil',
    type: 'Packaging Material',
    totalQuantity: '243',
    batchNumber: 'SM56G012L',
    expiryDate: '1st June, 2022',
    status: 'Supplied',
  },
]

export const inventoryData = [
  {
    id: 1,
    date: "28th March 2020",
    name: 'Tipa Tomato Mix',
    changeTo: '133',
    changeFrom: '245',
    status: 'In-Stock',
    reason: 'Supply to Production Unit',
    createdBy: 'Isaac Anane',
  },
  {
    id: 2,
    date: "28th March 2020",
    name: 'Rain Tomato Mix',
    changeTo: '33',
    changeFrom: '245',
    status: 'In-Stock',
    reason: 'Restock from ABS Com. Ltd',
    createdBy: 'John Doe',

  },
  {
    id: 2,
    date: "28th March 2020",
    name: 'Sunshine Tomato Mix',
    changeTo: '143',
    changeFrom: '0',
    status: 'In-Stock',
    reason: 'The quick brown fox jumped',
    createdBy: 'George Addo',

  },
]

export const formData = [
  {
    id: 1,
    fieldName: 'Name',
    type: 'Text Field',
    isRequired: true,
  },
  {
    id: 2,
    fieldName: 'Description',
    type: 'Text Area',
    isRequired: true,
  },
  {
    id: 2,
    fieldName: 'Measurement',
    type: 'Dropdown',
    isRequired: false,
    options: [
      'Kg', 'Cartons',
    ],
  },
]


export const brandData = ref([
  {
    id: Math.floor(Math.random()),
    name: 'Shine Tomato Mix',
    stock: '240',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Rain Tomato Mix',
    stock: '1',
  },
])



export const brandHeaders = ref([
  {
    id: Math.floor(Math.random()),
    name: 'Brand Name',
    key: 'name',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Stock',
    key: 'stock',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Created At',
    key: 'date',
  },
  {
    id: Math.floor(Math.random()),
    name: 'Actions',
    key: 'actions',
  },
])
