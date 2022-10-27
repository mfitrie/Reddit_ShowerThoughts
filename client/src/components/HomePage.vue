<template>
    <div>
        <div class="SectionOne">
            <b-row class="SectionOne__header">
                <span class="SectionOne__title">
                    <Icon icon="fa6-solid:shower"  class="SectionOne__iconTitle"/>
                    Reddit ShowerThoughts
                </span>
                <ul class="SectionOne__listMenu">
                    <li class="SectionOne__github">
                        <Icon icon="akar-icons:github-fill" class="SectionOne__githubIcon" />
                        <a href="https://github.com/mfitrie/Reddit_ShowerThoughts" target="__blank" class="SectionOne__linkGithub">
                            GitHub
                        </a>
                    </li>
                </ul>
            </b-row>
            <b-row class="SectionOne__main">
                <b-col class="SectionOne__mainContainer">
                    <div class="SectionOne__titleContainer">
                        <span class="SectionOne__mainTitle">ShowerThoughts</span>
                    </div>
                    <p class="SectionOne__mainDescription">A place A place where everyone's deepest must peculiar about humanity can be witnessed firsthand.</p>
                    <div class="SectionOne__btnContainer">
                        <button class="SectionOne__btnStarted" title="Get Started" @click="scrollThePage">
                            GET STARTED
                            <Icon icon="akar-icons:chevron-right" class="SectionOne__iconGetStarted"/>
                        </button>
                    </div>
                </b-col>
            </b-row>
        </div> 
        <div class="SectionTwo" id="SectionTwo">
            <b-row class="SectionTwo__cardContainer">
                <div v-for="item in thoughts" :key="item.index">
                    <home-card :image="item.image" :description="item.thought"></home-card>
                </div>
            </b-row>
            <b-row class="SectionTwo__btnRefreshContainer">
                <button class="SectionTwo__btnRefresh" title="Refresh" @click="refreshData">
                    Refresh
                    <Icon icon="eva:refresh-outline" class="SectionTwo__iconBtnRefresh" />
                </button>
            </b-row>
        </div> 
    </div>
</template>

<script>
import {Icon} from '@iconify/vue2';
import axios from 'axios';

import HomeCard from './HomeCard.vue'
export default {
    components: {
        Icon,
        HomeCard
    },
    data() {
        return {
            thoughts: []
        }
    },
    methods: {
        async initData(){
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
        async refreshData(){
            try {
                this.thoughts = [];
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
        scrollThePage(){
            document.getElementById('SectionTwo').scrollIntoView({
                behavior:'smooth'
            });
        }
    },
    async mounted() {
        await this.initData();
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    :root{
        --reddit-color: #FF4500;
    }

    *{
        font-size: 1rem;
        font-family: 'Roboto', Arial;
        margin: 0;
        padding: 0;
        color: var(--reddit-color);
    }

    body{
        .row{
            margin-right: 0;
            margin-left: 0;
        }
    }

    .SectionOne{
        height: 100vh;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FF4500' fill-opacity='1' d='M0 256L288 288L576 192L864 160L1152 128L1440 160L1440 320L1152 320L864 320L576 320L288 320L0 320Z'%3E%3C/path%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: cover;

        &__header{
            height: 10vh;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            font-size: 2rem;
            justify-content: center;
            align-content: center;
            gap: 40rem;

            .SectionOne__title{
                padding: 1rem;
                font-size: 1.5rem;
                font-weight: 600;
                // background-color: yellow;

                .SectionOne__iconTitle{
                    width: 2rem;
                    height: 2rem;
                }
            }

            .SectionOne__listMenu{
                // background-color: aqua;
                margin-top: auto;
                margin-bottom: auto;

                .SectionOne__github{
                    list-style: none;
                    padding: 0.5rem 1rem 0.5rem 1rem;
                    cursor: pointer;

                    .SectionOne__linkGithub{
                        text-decoration: none;
                        color: var(--reddit-color);
                    }

                    .SectionOne__githubIcon{
                        margin-right: 0.2rem;
                    }
                }
            }
        }

        &__main{
            // background-color: orange;
            height: 90vh;
            max-height: 90vh;

            .SectionOne__mainContainer{
                padding: 10rem;
                display: grid;
                grid-template-rows: 30% 30% 20%;
                justify-content: center;
                align-content: center;
                text-align: center;
    
                .SectionOne__titleContainer{
                    padding: 1rem;
                    // background-color: yellow;
                    
                    .SectionOne__mainTitle{
                        font-size: 3rem;
                        font-weight: 600;
                        text-shadow: 0px 4px 3px rgba(0,0,0,0.1),
                                        0px 8px 13px rgba(0,0,0,0.1),
                                        0px 18px 23px rgba(0,0,0,0.1);
                    }
                }
    
                .SectionOne__mainDescription{
                    // background-color: aqua;
                    font-size: 1.2rem;
                    width: 70%;
                    height: 100%;
                    padding: 1rem;
                    justify-self: center;
                }
                .SectionOne__btnContainer{
                    // background-color: wheat;

                    .SectionOne__btnStarted{
                        border: 2px solid var(--reddit-color);
                        font-weight: 600;
                        height: 3rem;
                        width: 11rem;
                        border-radius: 5px;
                        padding: 0.5rem;
                        cursor: pointer;
                        background-color: #fff;
                        box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

                        .SectionOne__iconGetStarted{
                            height: 100%;
                        }
                    }
                }
            }

        }
    }

    .SectionTwo{
        height: 100vh;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FF4500' fill-opacity='1' d='M0 256L288 288L576 192L864 160L1152 128L1440 160L1440 320L1152 320L864 320L576 320L288 320L0 320Z'%3E%3C/path%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: cover;

        &__cardContainer{
            padding: 4rem 1rem 4rem 1rem;
            height: 75vh;
        }

        &__btnRefreshContainer{
            height: 25vh;
            // background-color: aqua;
            padding: 1rem;
            display: flex;
            justify-content: center;
            align-content: center;

            .SectionTwo__btnRefresh{
                border: 2px solid var(--reddit-color);
                font-weight: 600;
                height: 3rem;
                width: 11rem;
                border-radius: 5px;
                padding: 0.5rem;
                cursor: pointer;
                background-color: #fff;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

            }    
        }
    }

    
</style>