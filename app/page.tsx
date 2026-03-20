'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <style>{`
        :root {
          --bg: #060c16;
          --surface: #0b1624;
          --card: #0e1c33;
          --card2: #111f38;
          --border: #18304f;
          --border2: #1e3a5f;
          --accent: #00d4ff;
          --accent2: #0081f1;
          --accent3: #005fc4;
          --green: #00f59b;
          --amber: #ffc130;
          --red: #ff3f5c;
          --purple: #b06cff;
          --teal: #1de9d4;
          --orange: #ff8c42;
          --pink: #ff6eb4;
          --text: #c8e6ff;
          --muted: #3d6080;
          --muted2: #5a80a0;
          --mono: 'Share Tech Mono', monospace;
          --head: 'Rajdhani', sans-serif;
          --body: 'Exo 2', sans-serif;
          --sidebar: 260px;
          --header: 58px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          height: 100%;
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--body);
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 212, 255, 0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.022) 1px, transparent 1px);
          background-size: 44px 44px;
          pointer-events: none;
          z-index: 0;
        }

        .topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header);
          z-index: 100;
          background: rgba(6, 12, 22, 0.97);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 0 1.25rem 0 0;
          backdrop-filter: blur(14px);
        }

        .topbar-logo {
          width: var(--sidebar);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 1.25rem;
          border-right: 1px solid var(--border);
          height: 100%;
        }

        .topbar-logo-text {
          font-family: var(--head);
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          line-height: 1.15;
        }

        .topbar-logo-text span {
          color: var(--accent);
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        .topbar-center {
          flex: 1;
          padding: 0 1.5rem;
        }

        .topbar-title {
          font-family: var(--head);
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--text);
          text-transform: uppercase;
        }

        .topbar-sub {
          font-family: var(--mono);
          font-size: 0.6rem;
          color: var(--muted2);
          margin-top: 0.1rem;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .clock {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--muted2);
          text-align: right;
          line-height: 1.6;
        }

        .clock b {
          color: var(--accent);
        }

        .pulse-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.8rem;
          border-radius: 50px;
          border: 1px solid rgba(0, 245, 155, 0.2);
          background: rgba(0, 245, 155, 0.05);
          font-family: var(--mono);
          font-size: 0.62rem;
          color: var(--green);
          white-space: nowrap;
        }

        .pulse-badge::before {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--green);
          box-shadow: 0 0 5px var(--green);
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .layout {
          display: flex;
          height: 100vh;
          padding-top: var(--header);
        }

        .content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }
      `}</style>

      <div className={styles.topbar}>
        <div className={styles.topbarLogo}>
          <div className={styles.topbarLogoText}>
            SLA
            <span>DIEGO</span>
          </div>
        </div>
        <div className={styles.topbarCenter}>
          <div className={styles.topbarTitle}>PAINEL ENGENHARIA</div>
          <div className={styles.topbarSub}>BRASIL DIGITAL</div>
        </div>
        <div className={styles.topbarRight}>
          <div className={styles.clock}>
            Horário:<br />
            <b>{time}</b>
          </div>
          <div className={styles.pulseBadge}>● ONLINE</div>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.content}>
          <h1>Bem-vindo ao Painel de Engenharia</h1>
          <p>
            Este é o seu dashboard de controle. Configure seu banco de dados no Supabase e comece a usar.
          </p>
        </div>
      </div>
    </div>
  );
}
