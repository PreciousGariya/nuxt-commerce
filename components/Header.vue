<template>
    <header class="header-area header-style-5">
        <div class="header-top header-top-ptb-1 d-none d-lg-block">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-xl-3 col-lg-4">
                        <div class="header-info">
                            <ul>
                                <li><i class="fi-rs-smartphone"></i> <a href="#">(+01) - 2345 - 6789</a></li>
                                <li><i class="fi-rs-marker"></i>
                                    <NuxtLink to="contact">Our location</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-4">
                        <div class="text-center">
                            <div id="news-flash" class="d-inline-block">
                                <ul>
                                    <li>Get great devices up to 50% off <a href="shop-grid-right.html">View details</a>
                                    </li>
                                    <li>Supper Value Deals - Save more with coupons</li>
                                    <li>Trendy 25silver jewelry, save up 35% off today <a
                                            href="shop-grid-right.html">Shop now</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4">
                        <div class="header-info header-info-right">
                            <ul>
                                <li>
                                    <a class="language-dropdown-active" href="#"> <i class="fi-rs-world"></i> English <i
                                            class="fi-rs-angle-small-down"></i></a>
                                    <ul class="language-dropdown">
                                        <li><a href="#"><img src="assets/imgs/theme/flag-fr.png" alt="">Français</a>
                                        </li>
                                        <li><a href="#"><img src="assets/imgs/theme/flag-dt.png" alt="">Deutsch</a></li>
                                        <li><a href="#"><img src="assets/imgs/theme/flag-ru.png" alt="">Pусский</a></li>
                                    </ul>
                                </li>
                                <li v-if="!user"><i class="fi-rs-user"></i>
                                    <NuxtLink href="/auth/login" v>Log In / Sign Up {{ count }}</NuxtLink>
                                </li>
                                <li v-else>
                                    <a class="language-dropdown-active" href="app/dashboard"> <i class="fi-rs-user"></i>
                                        {{ user.name }} <i class="fi-rs-angle-small-down"></i></a>
                                    <ul class="language-dropdown">
                                        <li><a href="/user/profile">Account</a></li>
                                        <li><a href="/user/orders">Orders</a></li>
                                        <li><a href="#" @click="logout()">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <StickyHeader />
    </header>
    <MobileMenu />
</template>

<script setup>
const count = useState('counter', () => Math.round(Math.random() * 100))
const auth = useAuthSession();
const { logout } = useAuth();

const user = auth.user.value;
console.log('user', user)
// console.log('getAllSessions', auth.getAllSessions())
</script>