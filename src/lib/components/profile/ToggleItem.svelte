<script lang="ts">
import Toggle from "../utils/Toggle.svelte"

    export let label : string 
    export let value : boolean
</script>

<div class="flex place-items-center place-content-between">
    <label for={label}>{label}</label>
    <Toggle {value} id="label"/>
</div>