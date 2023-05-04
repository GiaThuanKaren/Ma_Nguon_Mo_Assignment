const puppeteer = require('puppeteer');
const Craw = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://dev.to/mariamarsh/building-a-minimal-linux-os-from-source-code-i1', { waitUntil: 'networkidle2' });
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    const styles = await page.evaluate(() => {
        const styleTags = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        return styleTags.map(tag => tag.outerHTML).join('\n');
    });


    await browser.close();
    
}

let reulst = Craw();
console.log(reulst)