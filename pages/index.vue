<script setup lang="ts">
import { onMounted } from "vue";
import { AnimatePresence, motion } from "motion-v";
import useProgress from "~/composables/useProgress";
import DownloadResumeComponent from "~/components/DownloadResumeComponent.vue";
import AnimateInComponent from "~/components/animation/AnimateInComponent.vue";

const { progress } = useProgress();
const isLoading = ref(true);
const { data: companyData } = await useAsyncData(() =>
  queryCollection("companies").order("end", "DESC").all(),
);
const { data: workData } = useAsyncData(() => queryCollection("work").all());

onMounted(() => {
  watchEffect(() => {
    if (progress.value > 1) {
      document.body.classList.add("styled");
    } else {
      document.body.classList.remove("styled");
    }
  });

  // Remove loading classes on load.
  window.setTimeout(() => {
    document.body.classList.remove("no-animation");
  }, 1000);

  window.setTimeout(() => {
    isLoading.value = false;
    document.body.classList.add("bg-image");
  }, 3000);

  isLoading.value = false;
});
</script>
<template>
  <div class="duration-1000">
    <div
      class="transition fixed inset-0 opacity-100 object-cover bg-repeat-y h-full bg-center backdrop-blur-[80px]"
    ></div>
    <div
      :class="[
        'relative transition',
        {
          reveal: isLoading,
          'bg-white text-primary-dark': progress <= 1,
          'text-primary-light text-paragraph bg-primary-dark': progress > 1,
          'duration-[3000ms]': progress > 50,
          'bg-primary-dark/70': progress == 100,
        },
      ]"
    >
      <div
        class="container mx-auto px-md grid gap-lg grid-cols-1 md:grid-cols-[320px_1fr] lg:max-w-[800px] pt-[40px] pb-[150px] min-h-screen"
      >
        <AnimatePresence>
          <AnimateInComponent
            v-if="progress > 75"
            display="block"
            class="md:col-span-2"
          >
            <div class="flex justify-between items-center">
              <a href="/" class="no-underline">~/</a>
              <DownloadResumeComponent>
                <SvgIconComponent class="inline" name="arrow-down" />&nbsp;CV
              </DownloadResumeComponent>
            </div>
          </AnimateInComponent>
        </AnimatePresence>

        <div class="h-full">
          <div class="flex flex-col gap-lg sticky top-[40px]">
            <div class="flex flex-col gap-sm">
              <ul :class="['list-none', { 'flex gap-sm': progress > 20 }]">
                <li class="p-0">
                  <a
                    href="https://www.linkedin.com/in/bnardus/"
                    target="_blank"
                  >
                    <AnimatePresence>
                      <AnimateInComponent
                        v-if="progress <= 75"
                        display="inline"
                      >
                        LinkedIn
                      </AnimateInComponent>
                      <AnimateInComponent v-if="progress > 75" display="inline">
                        <SvgIconComponent
                          name="linkedin"
                          :class="{ hidden: progress <= 75 }"
                        />
                      </AnimateInComponent>
                    </AnimatePresence>
                  </a>
                </li>
                <li class="p-0">
                  <a href="https://github.com/bvdmerwe" target="_blank">
                    <AnimatePresence>
                      <AnimateInComponent
                        v-if="progress <= 75"
                        display="inline"
                      >
                        GitHub
                      </AnimateInComponent>
                      <AnimateInComponent v-if="progress > 75" display="inline">
                        <SvgIconComponent name="github" />
                      </AnimateInComponent>
                    </AnimatePresence>
                  </a>
                </li>
                <li class="p-0">
                  <a href="/assets/Bernard-CV.pdf" download>
                    <AnimatePresence>
                      <AnimateInComponent
                        v-if="progress <= 75"
                        display="inline"
                        class="whitespace-nowrap"
                      >
                        <DownloadResumeComponent>
                          Download my Resume
                        </DownloadResumeComponent>
                      </AnimateInComponent>
                    </AnimatePresence>
                  </a>
                </li>
              </ul>
              <AnimatePresence>
                <AnimateInComponent
                  v-if="progress > 15"
                  :class="{
                    'text-highlight': progress > 75,
                  }"
                  display="block"
                >
                  <AnimatePresence>
                    <AnimateInComponent v-if="progress > 45" display="inline"
                      >//</AnimateInComponent
                    ></AnimatePresence
                  >Frontend Developer
                </AnimateInComponent>
              </AnimatePresence>
              <h1>
                Hey! I&apos;m Bernard<span
                  :class="{
                    'text-highlight': progress > 45,
                  }"
                  >.</span
                >
              </h1>
              <div>
                <p>
                  I&apos;m a Frontend developer. My friends call me Bernie, and
                  I made this thing for you to enjoy and learn about my journey.
                </p>
                <p>I have a passion for coding and a love for technology.</p>
                <p>
                  I like to focus on Frontend development and am dedicated to
                  staying current with the latest technologies and trends.
                </p>
                <InlineCtaComponent
                  href="mailto:hello@bernardus.dev?subject=I%20like%20your%20style!%20Let's%20collaborate!"
                >
                  Let's chat!
                </InlineCtaComponent>
              </div>
            </div>
            <div class="flex flex-col gap-sm">
              <div class="grid gap-sm">
                <h2>My Skills</h2>
                <ChipContainerComponent
                  :chips="[
                    'TypeScript',
                    'JavaScript',
                    'Vue',
                    'NuxtJS',
                    'React',
                    'NextJS',
                    'PHP',
                    'Laravel',
                    'WordPress',
                    'CraftCMS',
                    'Git',
                    'GitHub Actions',
                    'GitLab Pipelines',
                    'AWS (S3, ECR, ECS, SSM, SES)',
                    'Kubernetes',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-sm md:mt-[55px]">
          <div class="flex flex-col gap-md">
            <h2>Things I&apos;ve done:</h2>
            <p>
              Over the last decade I&apos;ve had the opportunity to work on some
              amazing projects in a variety of industries. I&apos;ve worked in
              Renewable Energy, Telecoms, Advertising, and Finance! Come with me
              to see what I&apos;ve done over the years.
            </p>
          </div>

          <div v-if="companyData?.length" class="flex flex-col gap-lg">
            <CompanyComponent
              v-for="company in companyData"
              :key="company.name"
              :company="company"
              :works="
                workData?.filter(
                  (work) =>
                    work.company.toLowerCase() === company.name.toLowerCase(),
                ) ?? []
              "
            />
          </div>
          <div v-else><h2>Loading...</h2></div>
        </div>
      </div>
    </div>
  </div>
</template>
