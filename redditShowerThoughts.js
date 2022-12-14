const e = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;

(async()=>{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    try {
        await page.goto('https://www.reddit.com/r/Showerthoughts/');
        await autoScroll(page);
        await page.waitForSelector('._1oQyIsiPHYt6nx7VOmd1sz');


        const thoughts = await page.evaluate(()=>{
            const parent = [...document.querySelectorAll('._1oQyIsiPHYt6nx7VOmd1sz')];
            const words = [];
            let count = 1;

            parent.forEach((el)=>{
                
                const divThought = el.querySelector('._1poyrkZ7g36PawDueRza-J');
                const isAds = divThought.children[0].children[0].children[0].children[2].children[0]; 
                
                if(!isAds){
                    const vote = el.children[1].querySelector("._1rZYMD_4xY3gRcSS3p8ODO").textContent === 'Vote'? "No Vote" : el.children[1].querySelector("._1rZYMD_4xY3gRcSS3p8ODO").textContent;

                    const text = divThought.querySelector('h3').textContent;
                    words.push({
                        index: count,
                        vote,
                        thought: text
                    });
                    
                    count++;
                }
            });
            
            

            return words;
        });

        console.log(thoughts);

        const json = JSON.stringify(thoughts);
        await fs.writeFile(`${__dirname}/ShowerThoughtsData.json`, json, 'utf8');


        browser.close();

    } catch (error) {
        console.log(error);
        browser.close();
    }
})();



async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 1000;
            const maxHeight = 1000*100;
            const seconds = 1000;

            const timer = setInterval(()=>{
                    // var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if(totalHeight === maxHeight){
                        clearInterval(timer);
                        resolve();
                    }
            }, seconds)
        });
    });
}