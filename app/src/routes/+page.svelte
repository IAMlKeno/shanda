<script lang="ts">
  import HomePage from "../lib/components/HomePage.svelte";
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import { onMount } from "svelte";
  import type { Idea } from "$lib/models/idea";
  import type { PageData } from "./$types";

  let ideas: Idea[] = $state([]);
  let { data }: { data: PageData } = $props();
  onMount(async () => {
    // const client = new JsonApiClient("http://mindgames_cms:8086");
    // test = await client.getCollection("node--idea");
    // const api = getApiService();
    // ideas = await api.getIdeas();
    ideas = data.data;

    console.log(data);
  });
</script>

<hr />
<h1>Elkeno's SvelteKit</h1>
<div class="idea-block">
  {#each ideas as idea}
    <div class="" style="border: 2px solid black; width: 50%; margin-left: 0">
      <Accordion>
        <AccordionItem>
          <span slot="header">{idea.title}</span>
          <p class="mb-2 text-white-500 dark:text-white-400">
            {idea.field_description}
          </p>
          <div class="debug-idea-uuid"><small>(ID: {idea.uuid})</small></div>
        </AccordionItem>
      </Accordion>
    </div>
  {:else}
    <h3>loading...</h3>
  {/each}
</div>

<HomePage />
