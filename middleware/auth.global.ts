export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuth()
  
  if (!user.value && to.path !== '/login' && to.path !== '/') {
    return navigateTo('/login')
  }

  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }

  if (user.value && to.path === '/') {
    return navigateTo('/dashboard')
  }
})
