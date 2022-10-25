<template>
    <div>
        <b-row class="row1">
            <b-col>
                <span>Hello row1</span>
            </b-col>
        </b-row>
        <b-row class="row2">
            <b-col>Hello row2</b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    *{
        font-size: 1rem;
    }

    .row1{
        background-color: red;
    }
    .row2{
        background-color: yellow;
    }
</style>