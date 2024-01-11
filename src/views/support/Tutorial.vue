<script setup>
import TutorialModal from "./TutorialModal.vue";

const isvisible = ref(false)

const tutorial =
{
  id: '1',
  title: 'Admin Panel - How To Get Started Tutorial Create easy customizable applications',
  description: 'Been afraid to step away been focused on from v4 to v5 speaker approachable making focused a but from a step away afraid to step away been focused Writing a blog post is a little like driving; you can study the highway code (or read articles telling you how to write a blog post) for months, but nothing can prepare you for the real thing like getting behind the wheel',
};

const tutorials = [
  {
    id: '1',
    title: 'Admin Systems Setting - How To onboard other users....',
    description: 'Been afraid to step away been focused on from v4 to v5 speaker approachable making focused a but from a step away afraid to step away been focused Writing a blog post is a little like driving; you can study the highway code (or read articles telling you how to write a blog post) for months, but nothing can prepare you for the real thing like getting behind the wheel',
  },
  {
    id: '2',
    title: 'Admin Roles and Permission - How To Get Started Tutorial on managing roles....',
    description: 'We’ve been focused on making the from v4 to v5 but we have also not been afraid to step away been focused on from v4 to v5 speaker approachable making focused a but from a step away afraid to step away been focused Writing a blog post is a little like driving; you can study the highway code....',
  },
];

const toggle = () => {
  isvisible.value = false;
};

const open = () => {
  isvisible.value = true;
};
</script>

<template>
  <VCardText>
    <VCardTitle class="title px-2">
      Tutorial
    </VCardTitle>
    <VDivider class="my-4" />

    <VRow>
      <VCol col="12" md="6">
        <iframe width="530" height="330" src="https://www.youtube.com/embed/TWdDZYNqlg4" title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen />
        <div class="my-4">
          <VCardTitle class="px-0  chat-contact-header d-block text-primary text-xl font-weight-medium" @click="open">
            {{ tutorial.title }}
          </VCardTitle>
          <p class="px-0">
            {{ tutorial.description }}
          </p>
        </div>
      </VCol>
      <VCol col="12" md="6">
        <div v-for="tutorial in tutorials" :key="tutorial.id">
          <VCardTitle class="px-0 cursor-pointer chat-contact-header d-block text-primary text-xl font-weight-medium"
            @click="open">
            {{ tutorial.title }}
          </VCardTitle>
          <p class="px-0">
            {{ tutorial.description }}
          </p>
        </div>
      </VCol>
    </VRow>
    <TutorialModal :is-visible="isvisible" :toggle="toggle" />
  </VCardText>
</template>
