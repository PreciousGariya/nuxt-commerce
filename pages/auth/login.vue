<template>
  <section class="pt-150 pb-150">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 m-auto">
          <div class="row">
            <div class="col-lg-5">
              <div
                class="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                <div class="padding_eight_all bg-white">
                  <div class="heading_s1">
                    <h3 class="mb-30">Login</h3>
                  </div>
                  <form method="post" @submit.prevent="handleLoginSubmit">
                    <div class="form-group">
                      <input type="text" required="" name="email" v-model="loginUser.email" placeholder="Your Email">
                    </div>
                    <div class="form-group">
                      <input required="" type="password" name="password" v-model="loginUser.password"
                        placeholder="Password">
                    </div>
                    <div class="login_footer form-group">
                      <div class="chek-form">
                        <div class="custome-checkbox">
                          <input class="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1"
                            value="">
                          <label class="form-check-label" for="exampleCheckbox1"><span>Remember me</span></label>
                        </div>
                      </div>
                      <a class="text-muted" href="#">Forgot password?</a>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-fill-out btn-block hover-up" name="login">Log in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-6">
              <div class="login_wrap widget-taber-content p-30 background-white border-radius-5">
                <div class="padding_eight_all bg-white">
                  <div class="heading_s1">
                    <h3 class="mb-30">Create an Account</h3>
                  </div>
                  <p class="mb-50 font-sm">
                    Your personal data will be used to support your experience throughout this
                    website, to manage access to your account, and for other purposes described
                    in our privacy policy
                  </p>
                  <form method="post" @submit.prevent="handleRegisterSubmit" :schema="registerSchema">
                    <div class="form-group">
                      <input type="text" v-model="registerUser.name" required="" name="name" placeholder="Name">
                    </div>
                    <div class="form-group">
                      <input type="text" required="" v-model="registerUser.email" name="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <input required="" type="password" v-model="registerUser.password" name="password"
                        placeholder="Password">
                    </div>
                    <div class="form-group">
                      <input required="" type="password" v-model="registerUser.confirmPassword" name="password"
                        placeholder="Confirm password">
                    </div>
                    <div class="login_footer form-group">
                      <div class="chek-form">
                        <div class="custome-checkbox">
                          <input class="form-check-input" v-model="registerUser.terms" type="checkbox" name="checkbox"
                            id="exampleCheckbox12" value="">
                          <label class="form-check-label" for="exampleCheckbox12"><span>I
                              agree to terms &amp; Policy.</span></label>
                        </div>
                      </div>
                      <NuxtLink to="privacy-policy"><i class="fi-rs-book-alt mr-5 text-muted"></i>Lean more</NuxtLink>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-fill-out btn-block hover-up" name="login">Submit &amp;
                        Register</button>
                      <br>
                    </div>
                  </form>
                  <div class="divider-text-center mt-15 mb-15">
                    <span> or</span>
                  </div>
                  <ul class="btn-login list_none text-center mb-15">
                    <li><a href="#" class="btn btn-facebook hover-up mb-lg-0 mb-sm-4">Login With
                        Facebook</a></li>
                    <li><a href="#" class="btn btn-google hover-up">Login With Google</a></li>
                  </ul>
                  <div class="text-muted text-center">Already have an account? <a href="#">Sign in
                      now</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="ts" setup>

definePageMeta({ middleware: "guest" }); // Redirects to home route when loggedIn



import { z } from "zod";
const loader = useState('loader')

const registerSchema = z.object({
  name: z.string().min(5).max(15),
  email: z.string().email().min(1),
  password: z.string().min(8),
  confirmPassword: z.string(),
  terms: z.boolean().refine(data => data === true, {
    message: "You must accept the terms and conditions",
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
});
const loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string(),
});
// Initialize reactive object for registration form fields
const registerUser = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false
});

const loginUser = ref({
  email: "",
  password: "",

});

// Destructure necessary functions from authentication hook
const { login, register, requestEmailVerify } = useAuth();
const handleLoginSubmit = async () => {
  loader.value = true
  try {
    // Validate registration data using Zod schema
    const { data, error } = loginSchema.safeParse(loginUser.value);
    // Check if validation succeeded
    if (error) {
      loader.value = false
      console.log(error.message); // Log validation error
      //each error.message
      error.errors.forEach(validationError => {
        // console.log(validationError.message); // Log each validation error message
        // console.log(validationError.message)
        push.error(validationError.message)
      });
      return;

    }

    // Call register function from authentication hook
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginUser.value.email,
        password: loginUser.value.password
      })
    });
    loader.value = false
    console.log('response', response)
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response
      throw new Error(errorData.message); // Throw an error with the error message from the server
      push.error(errorData.message)
    }

    const res = await response.json();

    console.log('res', res)


    if (res.access_token) {
      await navigateTo('/app/dashboard');
    }

  } catch (error: any) {
    console.log('error', error.message);
    loader.value = false
    push.error(error.message)

    if (error.message === 'account-not-verified') {
      await navigateTo('/auth/verify-email');
    }
  }

}
// Function to handle the registration process
const handleRegisterSubmit = async () => {
  loader.value = true
  try {
    // Validate registration data using Zod schema
    const { data, error } = registerSchema.safeParse(registerUser.value);
    // Check if validation succeeded
    if (error) {
      loader.value = false
      console.log(error.message); // Log validation error
      //each error.message
      error.errors.forEach(validationError => {
        // console.log(validationError.message); // Log each validation error message
        // console.log(validationError.message)
        push.error(validationError.message)
      });
      return;

    }
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: registerUser.value.name,
      email: registerUser.value.email,
      password: registerUser.value.password
      })
    });
    loader.value = false
    console.log('response', response)
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response
      throw new Error(errorData.message); // Throw an error with the error message from the server
      push.error(errorData.message)
    }

    const res = await response.json();

    console.log('res', res)

    loader.value = true

    const email = await requestEmailVerify(registerUser.value.email);
    if (email.status === 'ok') {
      push.success('Please check your email for verification link.')
    }
    loader.value = false

  } catch (error: any) {
    console.log(error.message);
    loader.value = false
    if(error.message === 'email-used-with-default'){
      push.error('Please Register with your new email.')
      
    }else{
      push.error('Something went wrong. Please try again.')
    }
    //TODO: show the user a toast message for registration error
  }
};

</script>
