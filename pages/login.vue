<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <UCard>
      <template #header>
        <Placeholder class="h-8" />
      </template>

      <Placeholder class="h-32" />
      <div class="d-flex align-center justify-center">
        <v-sheet width="400" class="mx-auto">
          <v-form fast-fail @submit.prevent=" ">
            <label class="text-body-2 font-weight-regular">Username</label>
            <UInput placeholder="Username"></UInput>
            <label class="text-body-2 font-weight-regular">Password</label>
            <UInput placeholder="Password"></UInput>
            <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

            <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

          </v-form>
          <div class="mt-2">
            <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
          </div>
        </v-sheet>
      </div>

      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </div>
</template>

