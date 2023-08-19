<template>
  <div
    class="container mx-auto px-md grid gap-lg grid-cols-1 md:grid-cols-[320px_1fr] mt-[40px] mb-[150px] lg:max-w-[800px]"
  >
    <div
      :class="[
        'md:col-span-2 flex justify-between items-center',
        {
          hidden: progress < 30,
        },
        {
          hidden: progress < 30,
        },
      ]"
    >
      <a href="/" class="no-underline">~/</a>
      <a
        href="~/assets/Bernard-CV.pdf"
        download="Bernard-CV.pdf"
        class="no-underline"
        ><SvgIcon class="inline" name="arrow-down" />&nbsp;CV</a
      >
    </div>
    <div class="h-full">
      <div class="flex flex-col gap-xl sticky top-[40px]">
        <div class="flex flex-col gap-sm">
          <ul :class="['list-none', { 'flex gap-sm': progress > 20 }]">
            <li class="p-0">
              <a href="https://www.linkedin.com/in/bnardus/" target="_blank">
                <span
                  :class="{
                    hidden: progress > 30,
                  }"
                  >LinkedIn</span
                >
                <SvgIcon name="linkedin" :class="{ hidden: progress <= 30 }" />
              </a>
            </li>
            <li class="p-0">
              <a href="https://github.com/bvdmerwe" target="_blank">
                <span
                  :class="{
                    hidden: progress > 30,
                  }"
                  >Github</span
                >
                <SvgIcon name="github" :class="{ hidden: progress <= 30 }" />
              </a>
            </li>
            <li class="p-0">
              <a href="https://www.linkedin.com/in/bnardus/">
                <span
                  :class="{
                    hidden: progress > 30,
                  }"
                  >Download my Resume</span
                >
              </a>
            </li>
          </ul>
          <span
            :class="{
              hidden: progress < 15,
              'text-highlight': progress > 30,
            }"
          >
            <span
              :class="{
                hidden: progress < 30,
              }"
              >//</span
            >Senior Front-end Engineer
          </span>
          <h1 :class="{}">
            Hey! I'm Bernard<span
              :class="{
                'text-highlight': progress > 15,
              }"
              >.</span
            >
          </h1>
          <div>
            <p>
              I’m a senior front-end engineer. My friends call me Bernie, and I
              made this thing for you to enjoy and learn about my journey.
            </p>
            <p>I’m have a passion for coding and a love for technology.</p>
            <p>
              I like to focus on front-end development and am dedicated to
              staying current with the latest technologies and trends.
            </p>
            <InlineCta
              href="mailto:barny.vdm@gmail.com?subject=I%20like%20your%20style!%20Let's%20collaborate!"
            >
              Let's chat!
            </InlineCta>
          </div>
        </div>
        <div class="flex flex-col gap-sm">
          <div class="grid gap-sm">
            <h2>My Skills</h2>
            <ul
              :class="[
                {
                  'list-disc ps-md': progress < 10,
                  'flex flex-wrap !flex-row list-none ps-0': progress > 10,
                  'gap-xs': progress > 15,
                },
              ]"
            >
              <li><Chip>TypeScript</Chip></li>
              <li><Chip>JavaScript</Chip></li>
              <li><Chip>Vue</Chip></li>
              <li><Chip>NuxtJS</Chip></li>
              <li><Chip>React</Chip></li>
              <li><Chip>NextJS</Chip></li>
              <li><Chip>Angular 13</Chip></li>
              <li><Chip>PHP</Chip></li>
              <li><Chip>WordPress</Chip></li>
              <li><Chip>CraftCMS</Chip></li>
              <li><Chip>Git / Github Actions</Chip></li>
              <li><Chip>AWS (S3, ECR, ECS, SSM, SES)</Chip></li>
              <li><Chip>Kubernetes</Chip></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-sm md:mt-[55px]">
      <div class="flex flex-col gap-md">
        <h2>Things I’ve done:</h2>
        <p>
          Over the last 10 years I’ve had the opportunity to work on some
          amazing projects in a variety of industries! I’ve worked in Energy,
          Telecoms, Advertising, and Finance! Come with me to see what I’ve done
          over the years.
        </p>
      </div>

      <div class="flex flex-col gap-md"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import useProgress from "~/composables/useProgress";
const { progress } = useProgress();

onMounted(() => {
  watchEffect(() => {
    if (progress.value > 0) {
      document.body.classList.add("styled");
    } else {
      document.body.classList.remove("styled");
    }
  });
});
</script>
