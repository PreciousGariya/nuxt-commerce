<template>
     <div id="preloader-active" v-if="pending">
        <div class="preloader d-flex align-items-center justify-content-center">
            <div class="preloader-inner position-relative">
                <div class="text-center">
                    <h5 class="mb-5">{{randomQuote}} </h5>
                    <div class="loader">
                        <div class="bar bar1"></div>
                        <div class="bar bar2"></div>
                        <div class="bar bar3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const pending = useState('loader');
const randomQuote = ref('');

watch(pending, (newVal) => {
    randomQuote.value = generateRandomQuote();
    // console.log('newVal', newVal, 'oldval', oldval)
    //   if (newVal) {
        
    //   }
    });

const quotes = [
   "Please wait...",
  "Waiting for greatness...",
  "Holding tight, something amazing is coming!",
  "Patience is the key to success!",
  "Good things come to those who wait!",
  "Stay calm, success is on the way!",
];
const generateRandomQuote = () => {
      // Generate and return a random quote
      const quotes = [
        "Waiting for greatness...",
        "Holding tight, something amazing is coming!",
        "Patience is the key to success!",
        "Good things come to those who wait!",
        "Stay calm, success is on the way!",
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    };
</script>