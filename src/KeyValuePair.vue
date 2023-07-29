<script>

export default {
    props: {
        property: {
            type: String,
            required: true,
        },
        value: {
            type: [Number, String, Boolean],
            required: true,
        },
    },
}
</script>

<template>
    <div class="row">
        <div class="col d-flex">
            <p class="text-start flex-grow-1">{{ property }}</p>
            <p class="text-end flex-shrink-0">{{ value || '-' }}</p>
        </div>
    </div>
</template>