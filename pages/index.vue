<script setup lang="ts">
// TODO: Fix the motion and animate-presence stuff. Or consider removing.
import { onMounted } from "vue";
import { AnimatePresence } from "motion-v";
import { isAfter } from "date-fns";
import useProgress from "~/composables/useProgress";
import type { Job } from "~/types/Job";
import type { Company } from "~/types/Company";
import DownloadResumeComponent from "~/components/DownloadResumeComponent.vue";

const { progress } = useProgress();
const companies = ref<Company[]>([]);
const skills = ref<string[]>();
const isLoading = ref(true);

onMounted(async () => {
  watchEffect(() => {
    if (progress.value > 1) {
      document.body.classList.add("styled");
    } else {
      document.body.classList.remove("styled");
    }
  });

  const companyQuery = await queryCollection("companies").all();
  const workQuery = await queryCollection("work").all();
  isLoading.value = false;

  const jobs: Job[] = workQuery.map((job) => {
    return {
      path: job.path,
      name: job.meta.name,
      company: job.meta.company,
      impact: job.meta.impact,
      tools: job.meta.tools,
      challenges: job.meta.challenges,
      content: job.body,
    } as Job;
  });

  skills.value = jobs.reduce(
    (previousValue, currentValue) =>
      previousValue.concat(...currentValue.tools),
    [] as string[],
  );

  companies.value = companyQuery
    .sort((a, b) =>
      isStringDateAfter(a.meta.end as string, b.meta.end as string) ? 0 : 1,
    )
    .map((company) => {
      return {
        path: company.path,
        name: company.meta.name,
        url: company.meta.url,
        logo: company.meta.logo,
        position: company.meta.position,
        start: company.meta.start,
        end: company.meta.end,
        content: company.body,
        jobs: jobs.filter((job) => job.company === company.meta.name),
      } as Company;
    });
});

function isStringDateAfter(
  dateStringFirst: string,
  dateStringSecond: string,
): boolean {
  const dateFirst = new Date(dateStringFirst);
  const dateSecond = new Date(dateStringSecond);

  return isAfter(dateFirst, dateSecond);
}
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
        <div
          :class="[
            'md:col-span-2 flex justify-between items-center',
            {
              hidden: progress < 75,
            },
          ]"
        >
          <AnimatePresence>
            <a href="/" class="no-underline">~/</a>
          </AnimatePresence>
          <AnimatePresence>
            <DownloadResumeComponent>
              <SvgIconComponent class="inline" name="arrow-down" />&nbsp;CV
            </DownloadResumeComponent>
          </AnimatePresence>
        </div>
        <div class="h-full">
          <div class="flex flex-col gap-xl sticky top-[40px]">
            <div class="flex flex-col gap-sm">
              <ul :class="['list-none', { 'flex gap-sm': progress > 20 }]">
                <li class="p-0">
                  <a
                    href="https://www.linkedin.com/in/bnardus/"
                    target="_blank"
                  >
                    <AnimatePresence>
                      <span
                        :class="{
                          hidden: progress > 75,
                        }"
                        >LinkedIn</span
                      >
                      <SvgIconComponent
                        name="linkedin"
                        :class="{ hidden: progress <= 75 }"
                      />
                    </AnimatePresence>
                  </a>
                </li>
                <li class="p-0">
                  <a href="https://github.com/bvdmerwe" target="_blank">
                    <AnimatePresence>
                      <span
                        :class="{
                          hidden: progress > 75,
                        }"
                        >Github</span
                      >
                      <SvgIconComponent
                        name="github"
                        :class="{ hidden: progress <= 75 }"
                      />
                    </AnimatePresence>
                  </a>
                </li>
                <li class="p-0">
                  <a href="https://www.linkedin.com/in/bnardus/">
                    <AnimatePresence>
                      <span
                        :class="{
                          hidden: progress > 75,
                        }"
                      >
                        <DownloadResumeComponent>
                          Download my Resume
                        </DownloadResumeComponent>
                      </span>
                    </AnimatePresence>
                  </a>
                </li>
              </ul>
              <AnimatePresence>
                <span
                  :class="{
                    hidden: progress < 15,
                    'text-highlight': progress > 75,
                  }"
                >
                  <AnimatePresence>
                    <span
                      :class="{
                        hidden: progress < 30,
                      }"
                      >//</span
                    ></AnimatePresence
                  >Senior Frontend Engineer
                </span>
              </AnimatePresence>
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
                  I’m a senior Frontend engineer. My friends call me Bernie, and
                  I made this thing for you to enjoy and learn about my journey.
                </p>
                <p>I’m have a passion for coding and a love for technology.</p>
                <p>
                  I like to focus on Frontend development and am dedicated to
                  staying current with the latest technologies and trends.
                </p>
                <InlineCtaComponent
                  href="mailto:barny.vdm@gmail.com?subject=I%20like%20your%20style!%20Let's%20collaborate!"
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
                    'Angular 13',
                    'PHP',
                    'Laravel',
                    'WordPress',
                    'CraftCMS',
                    'Git / Github Actions',
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
            <h2>Things I’ve done:</h2>
            <p>
              Over the last decade I’ve had the opportunity to work on some
              amazing projects in a variety of industries. I’ve worked in
              Energy, Telecoms, Advertising, and Finance! Come with me to see
              what I’ve done over the years.
            </p>
          </div>

          <div v-if="companies.length" class="flex flex-col gap-xl">
            <CompanyComponent
              v-for="company in companies"
              :key="company.name"
              :company="company as Company"
            />
          </div>
          <div v-else><h2>Loading...</h2></div>
        </div>
      </div>
    </div>
  </div>
</template>
