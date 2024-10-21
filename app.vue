<template>
  <div class="app-container">
    <Navbar v-if="user" />
    <main class="main-content">
      <LoginPage v-if="!user" />
      <NuxtPage v-else :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { user, fetchUser } = useAuth()

// Use useAsyncData to fetch the user on the server side
const { data } = await useAsyncData('user', () => fetchUser(), {
  server: false,
  lazy: true
})
</script>

<style>
html, body, #__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}
</style>
