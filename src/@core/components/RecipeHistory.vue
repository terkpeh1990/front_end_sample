<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
</script>

<template>
  <VTimeline
    side="end"
    align="start"
    truncate-line="both"
    density="compact"
    class="v-timeline-density-compact"
  >
    <VTimelineItem
      dot-color="success"
      size="x-small"
    >
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between">
        <h6 class="text-base font-weight-semibold me-3">
          Added Raw Material
        </h6>
        <span class="text-sm text-disabled">Today</span>
      </div>

      <!-- 👉 Content -->
      <p class="mb-1">
        Successfully added Salt
      </p>
    </VTimelineItem>

    <VTimelineItem
      dot-color="success"
      size="x-small"
    >
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between">
        <h6 class="text-base ight-semibold me-3">
          Added Raw Material
        </h6>
        <span class="text-sm text-disabled">2 Day Ago</span>
      </div>

      <!-- 👉 Content -->
      <p class="mb-1">
        Successfully added Citric
      </p>
    </VTimelineItem>

    <VTimelineItem
      dot-color="error"
      size="x-small"
    >
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between">
        <h6 class="text-base font-weight-semibold me-3">
          Removed Raw Material
        </h6>
        <span class="text-sm text-disabled">6 Day Ago</span>
      </div>

      <!-- 👉 Content -->
      <p class="mb-1">
        <span class="me-2">Successfully removed Ginger</span>
      </p>
    </VTimelineItem>

    <VTimelineItem
      dot-color="warning"
      size="x-small"
    >
      <!-- 👉 Header -->
      <div class="d-flex justify-space-between">
        <h6 class="text-base font-weight-semibold me-3">
          Quantity Update
        </h6>
        <span class="text-sm text-disabled">10 Day Ago</span>
      </div>

      <!-- 👉 Content -->
      <p class="mb-1">
        Updated Salt quantity from 300 to 500
      </p>
    </VTimelineItem>
  </VTimeline>
</template>
