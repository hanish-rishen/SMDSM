<template>
  <nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div class="flex items-center mb-4 md:mb-0 cursor-pointer" @click="router.push('/dashboard')">
        <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 mr-2" />
        <span class="text-lg font-bold">SMDSM</span>
      </div>
      <ul class="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-2">
        <li><UButton variant="ghost" to="/access-control">Access Control</UButton></li>
        <li><UButton variant="ghost" to="/password-policy">Password Policy</UButton></li>
        <li><UButton variant="ghost" to="/encryption">Encryption</UButton></li>
        <li><UButton variant="ghost" to="/auditing-monitoring">Auditing & Monitoring</UButton></li>
        <li><UButton variant="ghost" to="/security-rules">Security Rules</UButton></li>
        <li><UButton variant="ghost" to="/backup-recovery">Backup & Recovery</UButton></li>
        <li><UButton variant="ghost" icon="i-heroicons-home" to="/dashboard" /></li>
        <li><UButton variant="ghost" icon="i-heroicons-power" @click="logout" class="text-red-500" /></li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const { clearUser } = useAuth()
const router = useRouter()

const logout = async () => {
  const supabase = useSupabaseClient()
  await supabase.auth.signOut()
  clearUser()
  router.push('/login')
}
</script>
