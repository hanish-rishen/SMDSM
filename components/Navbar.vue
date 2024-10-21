<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center cursor-pointer" @click="router.push('/dashboard')">
        <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 mr-2" />
        <span class="text-lg font-bold">SMDSM</span>
      </div>
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <div class="hamburger" :class="{ 'open': isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      <ul :class="['md:flex md:space-x-2 transition-all duration-300 ease-in-out', 
             isMenuOpen ? 'flex flex-col items-center fixed top-16 left-0 right-0 bg-gray-800 shadow-lg py-4 z-50' : 'hidden md:flex']">
        <li v-for="(item, index) in menuItems" :key="index" :style="{ '--li-index': index }">
          <UButton v-if="item.to" variant="ghost" :to="item.to" :icon="item.icon">{{ item.label }}</UButton>
          <UButton v-else variant="ghost" :icon="item.icon" @click="item.onClick" :class="item.class" />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { clearUser } = useAuth()
const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  clearUser()
  router.push('/login')
}

const menuItems = computed(() => [
  { to: '/access-control', label: 'Access Control' },
  { to: '/password-policy', label: 'Password Policy' },
  { to: '/encryption', label: 'Encryption' },
  { to: '/auditing-monitoring', label: 'Auditing & Monitoring' },
  { to: '/security-rules', label: 'Security Rules' },
  { to: '/backup-recovery', label: 'Backup & Recovery' },
  { to: '/dashboard', icon: 'i-heroicons-home' },
  { icon: 'i-heroicons-power', onClick: logout, class: 'text-red-500' }
])
</script>

<style scoped>
.hamburger {
  width: 30px;
  height: 20px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #ffffff;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger span:nth-child(1) {
  top: 0px;
}

.hamburger span:nth-child(2) {
  top: 8px;
}

.hamburger span:nth-child(3) {
  top: 16px;
}

.hamburger.open span:nth-child(1) {
  top: 9px;
  transform: rotate(135deg) translate(5px, -5px);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger.open span:nth-child(3) {
  top: 9px;
  transform: rotate(-135deg) translate(5px, 5px);
}

@media (max-width: 768px) {
  ul {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  ul.flex {
    max-height: 100vh; /* Use viewport height instead of fixed value */
    opacity: 1;
    padding-bottom: 1rem; /* Add some padding at the bottom */
  }

  li {
    transform: translateY(-20px);
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ul.flex li {
    transform: translateY(0);
    opacity: 1;
    transition-delay: calc(0.1s * var(--li-index)); /* Add delay for staggered animation */
  }
}

/* Add this to ensure the hamburger menu is always visible */
.md\:hidden {
  z-index: 60;
}
</style>
