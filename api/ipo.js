import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://www.38.co.kr/html/fund/index.htm?o=k', {
      responseType: 'arraybuffer'
    });
    const utf8Data = iconv.decode(response.data, 'EUC-KR');
    const $ = cheerio.load(utf8Data);
    const ipoList = [];

    $('table[summary="공모청약일정"] tbody tr').each((_, el) => {
      const cols = $(el).find('td');
      if (cols.length >= 4) {
        const name = $(cols[0]).text().trim();
        const date = $(cols[1]).text().trim();
        const price = $(cols[3]).text().trim();
        const underwriter = $(cols[5]).text().trim();

        if (name && date) {
          ipoList.push({ name, date, price, underwriter });
        }
      }
    });

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(ipoList);
  } catch (error) {
    return res.status(500).json({ error: 'IPO Fetch Failed' });
  }
}
