// App Controller
class App {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    async init() {
        console.log('Inicializando aplicação...');
        this.setupEventListeners();
        this.startClock();
        this.loadDashboard();
        this.checkAPIStatus();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchPage(e.currentTarget.dataset.page));
        });

        // Modal
        document.getElementById('btnNovaOS')?.addEventListener('click', () => this.openModal());
        document.getElementById('formNovaOS')?.addEventListener('submit', (e) => this.submitNovaOS(e));
    }

    switchPage(pageName) {
        // Remove active from all pages
        document.querySelectorAll('.page-section').forEach(page => {
            page.classList.remove('active');
        });

        // Remove active from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Set active
        const page = document.getElementById(pageName);
        if (page) {
            page.classList.add('active');
        }

        // Set active nav item
        const navItem = document.querySelector(`[data-page="${pageName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        this.currentPage = pageName;

        // Load page data
        switch(pageName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'os':
                this.loadOS();
                break;
            case 'sla-metrics':
                this.loadSLAMetrics();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }

        // Update title
        const titles = {
            'dashboard': 'Dashboard SLA',
            'os': 'Ordens de Serviço',
            'sla-metrics': 'Métricas SLA',
            'settings': 'Configurações'
        };
        document.getElementById('pageTitle').textContent = titles[pageName] || pageName;
    }

    async loadDashboard() {
        console.log('Carregando dashboard...');
        const data = await API.getSLADashboard();
        const assuntos = await API.getSLAPorAssunto();

        if (!data) {
            console.error('Falha ao carregar dados do dashboard');
            return;
        }

        // Update KPIs
        document.getElementById('kpi-total').textContent = data.total_os || 0;
        document.getElementById('kpi-pendentes').textContent = data.os_pendentes || 0;
        document.getElementById('kpi-concluidas').textContent = data.os_concluidas || 0;
        document.getElementById('kpi-sla').textContent = (data.taxa_sla_percentual || 0) + '%';

        // Render charts
        this.renderChartAssuntos(assuntos);
        this.renderChartStatus(data);
    }

    async loadOS() {
        console.log('Carregando Ordens de Serviço...');
        const os_list = await API.getOSList();

        const tbody = document.getElementById('osTableBody');
        tbody.innerHTML = '';

        if (!os_list || os_list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color: var(--muted);">Nenhuma OS encontrada</td></tr>';
            return;
        }

        os_list.forEach((os, index) => {
            const statusClass = os.status === 'concluida' ? 'status-ok' :
                              os.status === 'em_andamento' ? 'status-warn' : 'status-bad';
            const prioridades = {
                'alta': '🔴',
                'media': '🟡',
                'baixa': '🟢'
            };

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="mono">${os.id || index + 1}</td>
                <td>${os.numero || '-'}</td>
                <td>${os.assunto || '-'}</td>
                <td><span class="status-chip ${statusClass}">${os.status || '-'}</span></td>
                <td>${prioridades[os.prioridade] || '-'} ${os.prioridade || '-'}</td>
                <td>${os.responsavel || '-'}</td>
                <td class="center">${os.cumprimento_sla ? '✓' : '✗'}</td>
                <td>
                    <button onclick="app.deleteOS(${os.id})" style="color: var(--red); cursor: pointer;">×</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async loadSLAMetrics() {
        console.log('Carregando métricas SLA...');
        const assuntos = await API.getSLAPorAssunto();

        const container = document.getElementById('slaMetricsContainer');
        container.innerHTML = '';

        if (!assuntos || Object.keys(assuntos).length === 0) {
            container.innerHTML = '<p style="color: var(--muted);">Nenhuma métrica disponível</p>';
            return;
        }

        for (const [assunto, dados] of Object.entries(assuntos)) {
            const progressColor = dados.percentual >= 90 ? 'pf-green' :
                                dados.percentual >= 70 ? 'pf-amber' : 'pf-red';

            const div = document.createElement('div');
            div.innerHTML = `
                <div class="prog-hdr">
                    <span class="prog-name">${assunto}</span>
                    <span class="prog-pct">${dados.percentual.toFixed(1)}%</span>
                </div>
                <div class="prog-track">
                    <div class="prog-fill ${progressColor}" style="width: ${dados.percentual}%"></div>
                </div>
                <p style="font-size: 0.75rem; color: var(--muted); margin-top: 0.5rem;">
                    ${dados.cumpridas} de ${dados.total} cumpridas
                </p>
            `;
            container.appendChild(div);
        }
    }

    async loadSettings() {
        console.log('Carregando configurações...');
        const health = await API.healthCheck();
        const info = await API.getAPIInfo();

        const statusEl = document.getElementById('apiStatus');
        const versionEl = document.getElementById('apiVersion');

        if (health && health.status === 'ok') {
            statusEl.textContent = 'Conectado ✓';
            statusEl.style.color = 'var(--green)';
        } else {
            statusEl.textContent = 'Desconectado ✗';
            statusEl.style.color = 'var(--red)';
        }

        if (info) {
            versionEl.textContent = info.versao || 'N/A';
        }
    }

    renderChartAssuntos(assuntos) {
        const canvas = document.getElementById('chartAssuntos');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const labels = Object.keys(assuntos);
        const data = Object.values(assuntos).map(a => a.percentual);

        // Simple bar chart
        this.drawBarChart(ctx, labels, data, 200);
    }

    renderChartStatus(data) {
        const canvas = document.getElementById('chartStatus');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const labels = ['Pendentes', 'Concluídas'];
        const values = [data.os_pendentes || 0, data.os_concluidas || 0];

        this.drawPieChart(ctx, labels, values);
    }

    drawBarChart(ctx, labels, data, height) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const width = ctx.canvas.width;
        const padding = 40;
        const barWidth = (width - padding * 2) / labels.length;

        const maxValue = Math.max(...data);
        const scale = (height - padding) / maxValue;

        // Draw bars
        data.forEach((value, index) => {
            const x = padding + index * barWidth + barWidth / 4;
            const barHeight = value * scale;
            const y = height - barHeight - padding;

            ctx.fillStyle = `hsl(${180 + index * 30}, 80%, 50%)`;
            ctx.fillRect(x, y, barWidth / 2, barHeight);

            // Label
            ctx.fillStyle = '#c8e6ff';
            ctx.font = '12px Rajdhani';
            ctx.textAlign = 'center';
            ctx.fillText(value.toFixed(1) + '%', x + barWidth / 4, height - padding + 20);
        });
    }

    drawPieChart(ctx, labels, data) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;

        const total = data.reduce((a, b) => a + b, 1);
        let currentAngle = 0;

        const colors = ['#0081f1', '#00f59b'];

        data.forEach((value, index) => {
            const sliceAngle = (value / total) * Math.PI * 2;

            ctx.fillStyle = colors[index % colors.length];
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.fill();

            currentAngle += sliceAngle;
        });

        // Legend
        ctx.font = '12px Rajdhani';
        ctx.fillStyle = '#c8e6ff';
        labels.forEach((label, index) => {
            ctx.fillStyle = colors[index % colors.length];
            ctx.fillRect(width - 120, 20 + index * 25, 15, 15);
            ctx.fillStyle = '#c8e6ff';
            ctx.textAlign = 'left';
            ctx.fillText(label + ': ' + data[index], width - 100, 32 + index * 25);
        });
    }

    async submitNovaOS(event) {
        event.preventDefault();

        const os_data = {
            numero: document.getElementById('inputNumero').value,
            assunto: document.getElementById('inputAssunto').value,
            status: document.getElementById('inputStatus').value,
            prioridade: document.getElementById('inputPrioridade').value,
            responsavel: document.getElementById('inputResponsavel').value,
            sla_hours: parseInt(document.getElementById('inputSLA').value),
            descricao: document.getElementById('inputDescricao').value,
            cumprimento_sla: true
        };

        const result = await API.createOS(os_data);
        if (result) {
            this.closeModal();
            this.loadOS();
            alert('OS criada com sucesso!');
        } else {
            alert('Erro ao criar OS');
        }
    }

    async deleteOS(id) {
        if (confirm('Tem certeza que deseja deletar esta OS?')) {
            const result = await API.deleteOS(id);
            if (result) {
                this.loadOS();
                alert('OS deletada com sucesso!');
            }
        }
    }

    openModal() {
        document.getElementById('modalNovaOS').style.display = 'flex';
    }

    closeModal() {
        document.getElementById('modalNovaOS').style.display = 'none';
        document.getElementById('formNovaOS').reset();
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const date = now.toLocaleDateString('pt-BR');
            const time = now.toLocaleTimeString('pt-BR');

            document.getElementById('clk-date').textContent = date;
            document.getElementById('clk-time').textContent = time;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    async checkAPIStatus() {
        const health = await API.healthCheck();
        const badge = document.querySelector('.pulse-badge');
        if (health && health.status === 'ok') {
            badge.textContent = '✓ ATIVO';
            badge.style.borderColor = 'rgba(0, 245, 155, 0.3)';
        } else {
            badge.textContent = '✗ OFFLINE';
            badge.style.borderColor = 'rgba(255, 63, 92, 0.3)';
        }
    }
}

// Override fecharModal for global use
function fecharModal() {
    app.closeModal();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
