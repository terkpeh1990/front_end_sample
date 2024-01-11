<script setup>
import Notifications from '@core/components/Notifications.vue'

// Images
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar5 from '@images/avatars/avatar-5.png'
import paypal from '@images/svg/paypal.svg'

const notifications = [
  {
    text: 'Finished Goods',
    title: 'New finished good',
    subtitle: '5 hours ago',
    time: 'Yesterday',
  },
  {
    text: 'Production Unit',
    title: 'Raw Materials Request 📦',
    subtitle: 'New request received from Production Unit',
    time: 'Today',
  },
]
</script>

<template>
  <Notifications :notifications="notifications" />
</template>
