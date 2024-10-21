<template>
  <div class="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
    <canvas ref="starsCanvas" class="absolute inset-0 w-full h-full"></canvas>
    <UCard class="w-full max-w-md z-10 backdrop-blur-sm bg-white/10">
      <template #header>
        <div class="flex items-center justify-center mb-6">
          <UIcon name="i-heroicons-lock-closed" class="text-primary w-12 h-12" />
          <h1 class="text-2xl font-bold ml-2 text-white">SMDSM</h1>
        </div>
        <h2 class="text-xl font-semibold text-center mb-4 text-white">Stock Market Database Security Management</h2>
      </template>
      <UForm :state="formState" @submit="onSubmit" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="formState.email" type="email" placeholder="Enter your email" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
          <UInput v-model="formState.password" type="password" placeholder="Enter your password" />
        </UFormGroup>
        <UButton 
          type="submit" 
          :class="['mt-6 transition-all duration-300 ease-in-out w-full', 
                   loginError ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-primary hover:bg-primary-dark text-white']"
          :loading="loading"
        >
          <template v-if="!loading">
            <div class="flex items-center justify-center">
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 mr-2" />
              <span class="text-center">Log In</span>
            </div>
          </template>
        </UButton>
        <p v-if="loginError" class="text-red-500 text-center mt-2">
          Invalid email or password. Please try again.
        </p>
      </UForm>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const { setUser } = useAuth()
const router = useRouter()

const loading = ref(false)
const loginError = ref(false)

const formState = ref({
  email: '',
  password: '',
})

const onSubmit = async () => {
  loading.value = true
  loginError.value = false
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formState.value.email,
      password: formState.value.password,
    })
    if (error) throw error
    setUser(data.user)
    router.push('/dashboard')
  } catch (error) {
    console.error('Error logging in:', error)
    loginError.value = true
  } finally {
    loading.value = false
  }
}

const starsCanvas = ref<HTMLCanvasElement | null>(null)

let starsInstance: any = null

onMounted(() => {
  const Stars = function(this: any, args: any = {}) {
    const _scope = this

    this.stars = []
    this.vel = args.vel || 1
    this.radius = args.radius || 1
    this.alpha = 0.5
    this.starsCounter = args.stars || 300
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }
    let canvas: HTMLCanvasElement, context: CanvasRenderingContext2D

    this.init = function() {
      canvas = starsCanvas.value!
      context = canvas.getContext('2d')!
      context.lineCap = 'round'
      this.start()
      this.resize()
      window.addEventListener('resize', this.resize.bind(this))
    }

    this.start = function() {
      this.stars = []
      for (let i = 0; i < this.starsCounter; i++) {
        setTimeout(function() {
          _scope.stars.push(new Star())
        }, i * 30)
      }
    }

    this.resize = function() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      center.x = canvas.width / 2
      center.y = canvas.height / 2
    }

    this.animate = function() {
      this.animationFrame = window.requestAnimationFrame(this.animate.bind(this))
      this.render()
    }

    this.render = function() {
      context.fillStyle = 'rgba(1, 4, 35, 0.8)'
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.strokeStyle = 'white'
      for (let i = 0; i < this.stars.length; i++) this.stars[i].update()
    }

    const Star = function(this: any) {
      this.x = center.x
      this.y = center.y

      this.init = function() {
        this.radius = Math.random() * _scope.radius
        this.x = center.x
        this.y = center.y
        this.lineWidth = 0
        this.vel = {
          x: Math.random() * 10 - 5,
          y: Math.random() * 10 - 5
        }
      }

      this.update = function() {
        this.vel.x *= 1.05
        this.vel.y *= 1.05
        this.lineWidth += 0.035
        this.x0 = this.x
        this.y0 = this.y
        this.x += this.vel.x
        this.y += this.vel.y
        this.draw()
        if (this.isDead()) this.init()
      }

      this.draw = function() {
        context.beginPath()
        context.moveTo(this.x0, this.y0)
        context.lineTo(this.x, this.y)
        context.lineWidth = this.lineWidth
        context.stroke()
      }

      this.isDead = function() {
        return (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
      }

      this.init()
      return this
    }

    this.init()
    this.animate()
    return this
  }

  starsInstance = new Stars()
})

onUnmounted(() => {
  if (starsInstance && starsInstance.animationFrame) {
    window.cancelAnimationFrame(starsInstance.animationFrame)
  }
  window.removeEventListener('resize', starsInstance.resize)
})
</script>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: #000;
  overflow: hidden;
}

.bg-primary {
  background-color: #3498db;
}

.bg-primary-dark {
  background-color: #2980b9;
}

.bg-red-500 {
  background-color: #e74c3c;
}

.bg-red-600 {
  background-color: #c0392b;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
