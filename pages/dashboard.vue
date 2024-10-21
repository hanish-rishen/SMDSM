<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-10 relative inline-block text-white">
      Dashboard
      <span class="absolute left-0 -bottom-1 w-full h-0.5 bg-green-500"></span>
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <section class="bg-gray-800 p-4 rounded-lg shadow-lg text-white flex flex-col h-full">
        <h2 class="text-lg font-semibold mb-3">Password Policy</h2>
        <div class="space-y-2 flex-grow">
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Min Length: 12</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Uppercase: Yes</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Lowercase: Yes</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Numbers: Yes</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Special Chars: Yes</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Expiration: 90 days</span>
          </div>
        </div>
        <div class="mt-auto pt-3">
          <UButton @click="router.push('/password-policy')" color="green" class="w-full text-sm">Manage</UButton>
        </div>
      </section>

      <section class="bg-gray-800 p-4 rounded-lg shadow-lg text-white flex flex-col h-full">
        <h2 class="text-lg font-semibold mb-3">Backup & Recovery</h2>
        <div class="space-y-2 flex-grow">
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Backup: Daily</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Encryption: On</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">RPO: 4h</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">RTO: 2h</span>
          </div>
        </div>
        <div class="mt-auto pt-3">
          <UButton @click="router.push('/backup-recovery')" color="green" class="w-full text-sm">Manage</UButton>
        </div>
      </section>

      <section class="bg-gray-800 p-4 rounded-lg shadow-lg text-white flex flex-col h-full">
        <h2 class="text-lg font-semibold mb-3">Auditing & Monitoring</h2>
        <div class="space-y-2 flex-grow">
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Logs: Active</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Anomaly Detection: On</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">IDS: Configured</span>
          </div>
        </div>
        <div class="mt-auto pt-3">
          <UButton @click="router.push('/auditing-monitoring')" color="green" class="w-full text-sm">Manage</UButton>
        </div>
      </section>

      <section class="bg-gray-800 p-4 rounded-lg shadow-lg text-white flex flex-col h-full">
        <h2 class="text-lg font-semibold mb-3">Security Rules</h2>
        <div class="space-y-2 flex-grow">
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">SQL Injection: Protected</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Firewall: Active</span>
            <span class="bg-gray-700 text-xs py-1 px-2 rounded-full">Geofencing: On</span>
          </div>
        </div>
        <div class="mt-auto pt-3">
          <UButton @click="router.push('/security-rules')" color="green" class="w-full text-sm">Manage</UButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>