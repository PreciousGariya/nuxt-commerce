<template>
    <section class="pt-150 pb-150">
      <div class="container">
        <div class="row">
         Reset password
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  definePageMeta({ middleware: "auth" }); // Redirects to login route when not loggedIn


  </script>
  