import React, { useState, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';

export function Settings() {
  const { authState, updatePreferences, logout } = useAuthContext();
  const [displayName, setDisplayName] = useState(authState.user?.displayName || '');
  const [darkMode, setDarkMode] = useState(authState.user?.preferences.darkMode || false);
  const [currency, setCurrency] = useState(authState.user?.currency || 'USD');
  const [notice, setNotice] = useState('');

  const handleSave = useCallback(() => {
    updatePreferences({
      darkMode,
      currencyPosition: currency === 'EUR' ? 'after' : 'before',
    });
    setNotice('Settings saved');
    setTimeout(() => setNotice(''), 3000);
  }, [darkMode, currency, updatePreferences]);

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Settings</h1>
      <Card>
        <div style={{ display: 'grid', gap: '16px' }}>
          <Input label="Display Name" value={displayName} onChange={setDisplayName} />
          <Select
            label="Currency"
            options={[
              { value: 'USD', label: 'USD - US Dollar' },
              { value: 'EUR', label: 'EUR - Euro' },
              { value: 'GBP', label: 'GBP - British Pound' },
              { value: 'INR', label: 'INR - Indian Rupee' },
            ]}
            value={currency}
            onChange={setCurrency}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
            <span>Dark Mode</span>
          </div>
          <Button onClick={handleSave}>Save Settings</Button>
          {notice && <div style={{ color: '#16a34a', fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: notice }} />}
        </div>
      </Card>
      <div style={{ marginTop: '24px' }}>
        <Button variant="danger" onClick={logout}>Sign Out</Button>
      </div>
    </div>
  );
}

