<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-10 relative inline-block">
      Password Policy
      <span class="absolute left-0 -bottom-1 w-full h-0.5 bg-green-500"></span>
    </h1>
    <div class="password-policy-manager">
      <h3 class="text-xl font-semibold mb-4">Password Policy Management</h3>
      <UForm :state="formState" @submit="savePolicy">
        <UFormGroup label="Minimum Length" name="minLength">
          <UInput v-model="formState.minLength" type="number" min="8" max="32" />
        </UFormGroup>
        <UFormGroup label="Require Uppercase" name="requireUppercase">
          <UToggle v-model="formState.requireUppercase" />
        </UFormGroup>
        <UFormGroup label="Require Lowercase" name="requireLowercase">
          <UToggle v-model="formState.requireLowercase" />
        </UFormGroup>
        <UFormGroup label="Require Numbers" name="requireNumbers">
          <UToggle v-model="formState.requireNumbers" />
        </UFormGroup>
        <UFormGroup label="Require Special Characters" name="requireSpecialChars">
          <UToggle v-model="formState.requireSpecialChars" />
        </UFormGroup>
        <UFormGroup label="Password Expiration (days)" name="expirationDays">
          <UInput v-model="formState.expirationDays" type="number" min="0" max="365" />
        </UFormGroup>
        <UButton type="submit" color="primary" class="mt-4">Save Policy</UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formState = ref({
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  expirationDays: 90
})

const savePolicy = () => {
  // Here you would typically send the form data to your backend
  console.log('Password policy saved:', formState.value)
  // You might want to add some feedback to the user here, like a success message
}
</script>

<style scoped>
.password-policy-manager {
  max-width: 500px;
  margin: 0 auto;
}
</style>