<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

interface NodeType {
  id: number | string
  label: string
  group?: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
}

interface LinkType {
  source: number | string | NodeType
  target: number | string | NodeType
  weight?: number
}

interface GraphData {
  nodes: NodeType[]
  links: LinkType[]
}

const props = defineProps<{
  graphData: GraphData
}>()

const svgContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  const { nodes, links } = props.graphData

  const width = svgContainer.value!.clientWidth
  const height = svgContainer.value!.clientHeight

  const svg = d3
    .select(svgContainer.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
    .force("charge", d3.forceManyBody().strength(-250))
    .force("center", d3.forceCenter(width / 2, height / 2))

  const link = svg
    .append("g")
    .attr("stroke", "#aaa")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", (d) => (d.weight ? d.weight * 4 : 1))

  const node = svg
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 12)
    .attr("fill", "#4F46E5")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .call(drag(simulation) as any)

  node.append("title").text((d) => d.label)

  simulation.on("tick", () => {
    link
      .attr("x1", (d: any) => (d.source as NodeType).x!)
      .attr("y1", (d: any) => (d.source as NodeType).y!)
      .attr("x2", (d: any) => (d.target as NodeType).x!)
      .attr("y2", (d: any) => (d.target as NodeType).y!)

    node
      .attr("cx", (d: any) => d.x!)
      .attr("cy", (d: any) => d.y!)
  })
})

function drag(sim: any) {
  return d3
    .drag()
    .on("start", (event: any) => {
      if (!event.active) sim.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    })
    .on("drag", (event: any) => {
      event.subject.fx = event.x
      event.subject.fy = event.y
    })
    .on("end", (event: any) => {
      if (!event.active) sim.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    })
}
</script>

<template>
  <div ref="svgContainer" class="w-full h-[500px]"></div>
</template>

<style scoped>
circle {
  transition: 0.2s;
}
circle:hover {
  r: 15;
  fill: #6366F1; /* indigo-500 */
}
</style>
