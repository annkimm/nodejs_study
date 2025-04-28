// 크롤링을 위해 2가지 모듈을 설치
// axios - 특정 웹사이트 페이지 내용을 가져오기 위해서 사용
// cheerio - 특정 페이지의 HTML 구조를 가지고 있는 일반 텍스트를 자바스크립트에서 document 객체의 내장 함수를 사용해서 HTML 요소에 접근하는 것과 유사한 함수를 제공

// const axios = require("axios");
const cheerio = require("cheerio");
// const puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const getHTML = async (keyword) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,               // 일부 방어체계는 headless=true만 차단
            args: ['--no-sandbox']
          });
          const page = await browser.newPage();
        
          // 필수 헤더들 설정
          await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
          );
          await page.setExtraHTTPHeaders({
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
            'Referer': 'https://www.inflearn.com/'
          });
        await page.goto(`https://www.inflearn.com/courses?s=${encodeURI(keyword)}`, {     waitUntil: 'networkidle0',   // 기존 networkidle2 → 0으로 변경
            timeout: 60000     // 필요시 타임아웃 늘리기
        });

        const html = await page.evaluate(() => document.documentElement.outerHTML); 
        
        await browser.close();

        return html
    } catch (error) {
        console.log(error);
    }
}

const parsing = async (page) => {
    const $ = cheerio.load(page);
    const courses = [];
    const $courseList = $(".css-sdr7qd.mantine-1avyp1d > li")

    //console.log($courseList);
    
    $courseList.each((idx, node) => {
        
        const title = $(node).find(".mantine-Text-root:eq(0)").text();
        const author = $(node).find(".mantine-Text-root:eq(1)").text();
        const originPrice = $(node).find(".mantine-Text-root:eq(2)").text() ?? '';
        const salePrice1 = $(node).find(".mantine-Text-root:eq(4)").text()
        const salePrice2 = $(node).find(".mantine-Text-root:eq(5)").text()
        const salePrice = salePrice1.includes('₩') ? salePrice1 : salePrice2
        const price = salePrice.length < 4 ? originPrice : salePrice
        const originRating1 = $(node).find(".mantine-Text-root:eq(8)").text()
        const originRating2 = originRating1.length > 10 ? salePrice : originRating1
        const rating = !isNaN(originRating2) ? originRating2 : '0.0'

        const reviewCount1 = $(node).find(".mantine-Text-root:eq(6)").text();
        const reviewCount2 = $(node).find(".mantine-Text-root:eq(9)").text();        
       // console.log(reviewCount1);
       const reviewCount3 = (reviewCount1.length < 10 ? reviewCount1 : reviewCount2).replace(/[(,)]/g, '')
       const reviewCount = !isNaN(reviewCount3) ? reviewCount3 : 0;
       const imgUrl = $(node).find("picture > img").attr("src")
        
        courses.push({
            title,
            author,
            originPrice,
            price,
            rating,
            reviewCount,
            imgUrl
        })
        
    })

    return courses
}

const getCourse = async(keyword) => {
    const html = await getHTML(keyword);
     const course = await parsing(html);

    return course
}

// while문을 이용해서 데이터가 없을때까지 끝까지 작업 -> 그것이 완벽한 작업
async function getAllCourses() {
    let courses = [];
    for (let i = 1; i <= 2; i++) {
      const pageCourses = await getCourse(`자바스크립트&page_number=${i}`);
      // 실제 배열 데이터를 합침
      courses = courses.concat(pageCourses);
    }
    console.log(courses);
    console.log(courses.length);
    
  }

getAllCourses()

