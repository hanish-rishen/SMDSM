<template>
  <div class="access-control-tab">
    <h1 class="text-2xl font-bold mb-10 relative inline-block">
      Access Control
      <span class="absolute left-0 -bottom-1 w-full h-0.5 bg-green-500"></span>
    </h1>
    <div class="mb-4">
      <UButton size="sm" color="primary" class="mr-2">Add User</UButton>
      <UButton size="sm" color="primary" class="mr-2">Remove Users</UButton>
      <UButton size="sm" color="primary" class="mr-2">Modify Users</UButton>
      <UButton size="sm" color="primary">Manage Roles</UButton>
    </div>
    <UTable :rows="accessControlData" :columns="columns">
      <template #user-cell="{ user }">
        {{ user }}
      </template>
      <template #role-cell="{ role }">
        {{ role }}
      </template>
      <template #permissions-cell="{ permissions }">
        {{ permissions.join(', ') }}
      </template>
      <template #mfa-cell="{ mfa, row }">
        <UToggle :model-value="mfa" @update:model-value="updateMfa(row.id, $event)" />
      </template>
    </UTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const accessControlData = ref([
  { id: 1, user: 'John Doe', role: 'Admin', permissions: ['Read', 'Write', 'Delete'], mfa: true },
  { id: 2, user: 'Jane Smith', role: 'Editor', permissions: ['Read', 'Write'], mfa: false },
  { id: 3, user: 'Bob Johnson', role: 'Viewer', permissions: ['Read'], mfa: false },
])

const columns = [
  { key: 'user', label: 'User' },
  { key: 'role', label: 'Role' },
  { key: 'permissions', label: 'Permissions' },
  { key: 'mfa', label: 'MFA' },
]

const updateMfa = (id: number, value: boolean) => {
  const index = accessControlData.value.findIndex(item => item.id === id)
  if (index !== -1) {
    accessControlData.value[index].mfa = value
  }
}
</script>

<style scoped>
.access-control-tab {
  padding: 1rem;
}
</style>
