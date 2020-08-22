<template>
    <article class="product-card">
        <img
            :src="'./assets/product-images/' + product_name + '.jpg'"
            :alt="product_name"
        >
        <div>
            <h3>{{ product_name }}</h3>
            <span>{{ cost }} point{{ cost > 1 ? 's' : ''}}</span>
        </div>
    </article>
</template>

<script lang="ts">
    export default {
        name: 'product-card',

        props: {
            product_name: String,
            cost: Number
        }
    };
</script>

<style lang="scss" scoped>
    article {
        color: white;
        margin: 1rem 1rem 0 1rem;
        font-size: 0.8em;

        display: flex;

        img {
            width: 4em;
            height: 4em;
            object-fit: cover;

            border: 2px solid white;
            border-radius: 50%;
        }

        div {
            width: 0;
            opacity: 0;
            overflow: hidden;
            white-space: nowrap;
            transition: all 0.7s ease-out;

            margin-left: 10px;
        
            h3 {
                font-weight: normal;
                margin: 10px 0;
            }

            span {
                font-style: italic;
                font-size: 0.7em;
            }
        }

        &:hover {
            div {
                width: 5em;
                opacity: 1;
            }
        }
    }
</style>
