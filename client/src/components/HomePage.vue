<template>
    <div>
        <b-row class="row1">
            <b-col>
                <span>Hello row1</span>
                <div>
                    {{thoughts}}
                </div>
            </b-col>
        </b-row>
        <b-row class="row2">
            <b-col>Hello row2</b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            thoughts: []
        }
    },
    async mounted() {
        try {
            const requestGet = await axios.get('/api/getThoughtRandom');
            this.thoughts.push(...requestGet.data.data);
        } catch (error) {
            this.thoughts.push('No data');
            if(error.response.status === 0){
                console.log('CORS problem');
            }
            if(error.response.status === 404){
                console.log('Not found');
            }
        }
    },
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