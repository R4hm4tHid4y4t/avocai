'use client';

import { useState } from 'react';
import { BrandPanel } from '@/components/auth/BrandPanel';
import { LoginForm, RegisterForm } from '@/components/auth/AuthForms';

type Tab = 'login' | 'register';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>('login');

  return (
    <>
      {/* Reset body background untuk halaman login */}
      <style jsx global>{`
        body { background: #fff !important; }
        @media (max-width: 768px) {
          .brand-panel-wrapper { display: none !important; }
        }
        input:focus {
          border-color: var(--green-500) !important;
          box-shadow: 0 0 0 3px rgba(61,158,96,0.1) !important;
          outline: none;
        }
      `}</style>

      <style jsx>{`
        .login-page-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        .brand-panel-wrapper {
          display: flex;
          flex-shrink: 0;
        }

        .login-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          background: #fff;
          min-height: 100vh;
        }

        .login-form-card {
          width: 100%;
          max-width: 400px;
        }

        .login-tablist {
          display: flex;
          background: #f0ede8;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 36px;
        }

        .login-tab {
          flex: 1;
          padding: 9px 0;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          font-family: var(--font-body);
          border-radius: 7px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          color: rgba(0, 0, 0, 0.45);
        }

        .login-tab.active {
          background: #fff;
          color: #1a1a1a;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

        .login-tab:focus {
          outline: none;
        }
      `}</style>

      <div className="login-page-container">
        {/* ── Kiri: Brand Panel ── */}
        <div className="brand-panel-wrapper">
          <BrandPanel />
        </div>

        {/* ── Kanan: Form ── */}
        <div className="login-form-section">
          <div className="login-form-card">

            {/* Tab toggle */}
            <div role="tablist" aria-label="Pilihan autentikasi" className="login-tablist">
              {(['login', 'register'] as Tab[]).map((tab) => (
                <button
                  type="button"
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`login-tab${activeTab === tab ? ' active' : ''}`}
                >
                  {tab === 'login' ? 'Masuk' : 'Daftar'}
                </button>
              ))}
            </div>

            {/* Form */}
            <div key={activeTab} className="animate-fade-up">
              {activeTab === 'login'
                ? <LoginForm onSwitch={() => setActiveTab('register')} />
                : <RegisterForm onSwitch={() => setActiveTab('login')} />
              }
            </div>

          </div>
        </div>
      </div>
    </>
  );
}