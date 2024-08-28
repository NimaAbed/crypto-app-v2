const BASE_URL = "https://api.coingecko.com/api/v3"
const API_KEY = "CG-eZAxAYSvrFQepcmVhMPtaGgU"

const getCoinsList = (page, currency) => `${BASE_URL}/coins/markets?vs_currency=${currency}&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`

const searchCoin = query => `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`

const marketChart = (id, currency, days) => `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`

export { getCoinsList, searchCoin, marketChart }