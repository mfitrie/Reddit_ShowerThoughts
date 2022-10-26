<template>
    <div>
        <b-col class="SectionTwo__cardHolder">
            <b-card
                class="SectionTwo__card"
                :img-src="image"
                tag="content"
            >
                <b-card-text>
                    {{description}}
                </b-card-text>
            </b-card>
        </b-col>
    </div>
</template>

<script>
export default {
    name: 'HomeCard',
    props:{
        image: {
            type: String,
            default: require('../assets/no_image.png')
        },
        description: {
            type: String,
            default: 'No info'
        }
    }
}
</script>

<style lang="scss">
    .SectionTwo{
        &__cardContainer{

            .SectionTwo__card{
                height: 100%;
                max-height: 100%;
                min-width: 16.5rem;
                max-width: 16.5rem;
                border-radius: 5px;
                text-align: justify;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

                img{
                    min-height: 8rem;
                    max-height: 10rem;
                }
            }
        }
    }
</style>