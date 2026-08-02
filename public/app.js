function startClock() {
  const clockEl = document.getElementById('live-clock');
  function update() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    clockEl.innerText = `${y}.${m}.${d}. ${hh}:${mm}:${ss}`;
  }
  update();
  setInterval(update, 1000);
}

const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  themeBtn.innerText = next === 'dark' ? '라이트모드' : '다크모드';
});

function openChartModal(symbol, name) {
  const modal = document.getElementById('chart-modal');
  const title = document.getElementById('modal-title');
  const container = document.getElementById('tradingview-container');
  
  title.innerText = `${name} 차트`;
  container.innerHTML = '';
  modal.style.display = 'block';

  let tvSymbol = symbol;
  if (symbol === 'KOSPI') tvSymbol = 'KRX:KOSPI';
  else if (symbol === 'KOSDAQ') tvSymbol = 'KRX:KOSDAQ';
  else if (/^\d{6}$/.test(symbol)) tvSymbol = `KRX:${symbol}`;

  const iframe = document.createElement('iframe');
  iframe.src = `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${tvSymbol}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=[]&theme=${document.documentElement.getAttribute('data-theme') || 'dark'}&style=1&timezone=Asia%2FSeoul`;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  container.appendChild(iframe);
}

document.getElementById('close-modal').onclick = () => {
  document.getElementById('chart-modal').style.display = 'none';
};

function loadDashboardData() {
  const forexData = [
    { name: '달러 인덱스', symbol: 'DXY', price: '104.22', change: '+0.15%' },
    { name: '달러-원화', symbol: 'USD/KRW', price: '1,382.50', change: '-0.32%' },
    { name: '유로-원화', symbol: 'EUR/KRW', price: '1,498.10', change: '+0.08%' },
    { name: '엔-원화', symbol: '100JPY/KRW', price: '921.40', change: '-0.12%' },
    { name: '파운드-원화', symbol: 'GBP/KRW', price: '1,765.20', change: '+0.21%' },
    { name: '위안-원화', symbol: 'CNY/KRW', price: '190.85', change: '+0.05%' }
  ];

  const indicesData = [
    { name: '코스피', symbol: 'KOSPI', price: '2,752.40', change: '+0.85%' },
    { name: '코스닥', symbol: 'KOSDAQ', price: '810.15', change: '-0.24%' },
    { name: 'VOO (S&P500)', symbol: 'VOO', price: '$502.10', change: '+0.45%' },
    { name: 'QQQ (나스닥100)', symbol: 'QQQ', price: '$480.30', change: '+0.92%' }
  ];

  const watchlistData = [
    { name: 'HMM', symbol: '011200', price: '18,450원', change: '+1.20%' },
    { name: '현대제철', symbol: '004020', price: '32,100원', change: '-0.85%' }
  ];

  renderGrid('forex-grid', forexData);
  renderGrid('indices-grid', indicesData);
  renderGrid('watchlist-grid', watchlistData);
  fetchIPOData();
}

function renderGrid(containerId, data) {
  const container = document.getElementById(containerId);
  container.innerHTML = data.map(item => {
    const isUp = item.change.startsWith('+');
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-name">${item.name}</span>
          <button class="btn-chart" onclick="openChartModal('${item.symbol}', '${item.name}')">차트</button>
        </div>
        <div class="card-price">${item.price}</div>
        <div class="card-change ${isUp ? 'up' : 'down'}">${item.change}</div>
      </div>
    `;
  }).join('');
}

async function fetchIPOData() {
  const container = document.getElementById('ipo-container');
  try {
    const res = await fetch('/api/ipo');
    const data = await res.json();
    if (!data || data.length === 0) {
      container.innerHTML = '<p>현재 예정된 공모주 일정이 없습니다.</p>';
      return;
    }
    
    let html = `
      <table class="ipo-table">
        <thead>
          <tr>
            <th>종목명</th>
            <th>공모가</th>
            <th>청약일정</th>
            <th>주간사</th>
          </tr>
        </thead>
        <tbody>
    `;
    data.slice(0, 5).forEach(item => {
      html += `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td>${item.price || '미정'}</td>
          <td>${item.date}</td>
          <td>${item.underwriter || '-'}</td>
        </tr>
      `;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = '<p>IPO 정보를 가져오는데 실패했습니다.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  startClock();
  loadDashboardData();
});
