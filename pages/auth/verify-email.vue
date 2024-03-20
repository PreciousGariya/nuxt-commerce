<template>
    <section class="pt-150 pb-150">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 m-auto">
                    <div class="row">
                        <div class="col-lg-12">
                            <div
                                class="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                                <div class="padding_eight_all bg-white">
                                    <div class="heading_s1">
                                        <h3 class="mb-30">Verify Your Email</h3>
                                    </div>
                                    <form method="post" @submit.prevent="handleResendVerification">
                                        <div class="form-group">
                                            <input type="text" required="" name="email" v-model="verifyEmail.email"
                                                placeholder="Your Email">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-fill-out btn-block hover-up"
                                                name="login">Resend Email Verification</button>
                                        </div>
                                        {{ verifyEmail }}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { z } from 'zod';
const loader = useState('loader')

const { requestEmailVerify } = useAuth();

const verifyEmail = ref({
    email: ''
})

const verifySchema = z.object({
    email: z.string().email().min(1),
});

const handleResendVerification = async () => {
    const { data, error } = verifySchema.safeParse(verifyEmail.value);

    try {
        // Check if validation succeeded
        if (error) {
            loader.value = false
            error.errors.forEach(validationError => {
                push.error(validationError.message)
            });
            return;
        }
        const email = await requestEmailVerify(verifyEmail.value.email);
        if (email.status === 'ok') {
            push.success('Please check your email for verification link.')
        }
        loader.value = false

    } catch (error: any) {
        console.log(error);
        loader.value = false
        push.error(error)
    }
}

</script>
