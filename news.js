async function getNews() {
    const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=d2295a81e2794db482380961a61fe4b0");
    const data = await response.json();
    const articles = data.articles;
    console.log(articles);
    const newsHeadlines = document.getElementById("news-headlines");
    for (let i = 0; i < 5; i++) {
        const article = articles[i];
        const headline = document.createElement("li");
        headline.textContent = article.title;
        newsHeadlines.appendChild(headline);
    }
    console.log(newsHeadlines);
}

