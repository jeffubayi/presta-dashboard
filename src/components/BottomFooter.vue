<template>
  <div class="container px-4 pt-5 mx-auto md:pt-10 lg:px-0 dark:bg-gray-900">
    <h1
      class="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl sm:leading-none sm:tracking-tight dark:text-white"
    >
      Our loan plan made simple
    </h1>
    <p
      class="mb-6 text-lg font-normal text-gray-500 sm:text-xl dark:text-gray-400"
    >
      All types of businesses need access to development resources, so we give
      you the option to decide how much you need to use.
    </p>

    <!-- Pricing Cards -->
    <section
      class="grid grid-cols-1 space-y-12 md:space-y-0 md:grid-cols-2 lg:grid-cols-3 md:gap-x-6 md:gap-6 pt-9"
    >
      <!-- Pricing Card -->
      <div
        class="flex flex-col max-w-lg p-6 mx-auto text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 xl:p-8 dark:bg-gray-800 dark:text-white"
      >
        <h3 class="mb-4 text-2xl font-semibold">Starter</h3>
        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          Best option for personal use & for your next project.
        </p>
        <div class="flex items-baseline my-8">
          <span class="mr-2 text-5xl font-extrabold">$29</span>
          <span class="text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <!-- List -->
        <ul role="list" class="mb-8 space-y-4 text-left">
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Individual configuration</span>
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>No setup, or hidden fees</span>
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Team size: <span class="font-semibold">1 developer</span></span
            >
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Premium support:
              <span class="font-semibold">6 months</span></span
            >
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Free updates: <span class="font-semibold">6 months</span></span
            >
          </li>
        </ul>
        <a
          href="#"
          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
          >Get started</a
        >
      </div>
      <!-- Pricing Card -->
      <div
        class="flex flex-col max-w-lg p-6 mx-auto text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 xl:p-8 dark:bg-gray-800 dark:text-white"
      >
        <h3 class="mb-4 text-2xl font-semibold">Company</h3>
        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          Relevant for multiple users, extended & premium support.
        </p>
        <div class="flex items-baseline my-8">
          <span class="mr-2 text-5xl font-extrabold">$99</span>
          <span class="text-gray-500 dark:text-gray-400" dark:text-gray-400
            >/month</span
          >
        </div>
        <!-- List -->
        <ul role="list" class="mb-8 space-y-4 text-left">
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Individual configuration</span>
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>No setup, or hidden fees</span>
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Team size: <span class="font-semibold">10 developers</span></span
            >
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Premium support:
              <span class="font-semibold">24 months</span></span
            >
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Free updates: <span class="font-semibold">24 months</span></span
            >
          </li>
        </ul>
        <a
          href="#"
          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
          >Get started</a
        >
      </div>
      <!-- Pricing Card -->
      <div
        class="flex flex-col max-w-lg p-6 mx-auto text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 xl:p-8 dark:bg-gray-800 dark:text-white"
      >
        <h3 class="mb-4 text-2xl font-semibold">Enterprise</h3>
        <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          Best for large scale uses and extended redistribution rights.
        </p>
        <div class="flex items-baseline my-8">
          <span class="mr-2 text-5xl font-extrabold">$499</span>
          <span class="text-gray-500 dark:text-gray-400">/month</span>
        </div>
        <!-- List -->
        <ul role="list" class="mb-8 space-y-4 text-left">
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Individual configuration</span>
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>No setup, or hidden fees</span>
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Team size:
              <span class="font-semibold">100+ developers</span></span
            >
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Premium support:
              <span class="font-semibold">36 months</span></span
            >
          </li>
          <li class="flex items-center space-x-3">
            <!-- Icon -->
            <svg
              class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span
              >Free updates: <span class="font-semibold">36 months</span></span
            >
          </li>
        </ul>
        <a
          href="#"
          class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
          >Get started</a
        >
      </div>
    </section>
  </div>
</template>
