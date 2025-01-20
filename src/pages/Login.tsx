import React, { useState, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { isValidEmail, isValidPassword } from '../utils/validators';

export function Login() {
  const { login, authState } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = useCallback(async () => {
    const newErrors: Record<string, string> = {};
    if (!isValidEmail(email)) newErrors.email = 'Invalid email';
    if (!isValidPassword(password)) newErrors.password = 'Password must be at least 8 characters';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    await login({ email, password });
  }, [email, password, login]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Card padding="lg">
        <div style={{ width: '360px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Sign In</h1>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Welcome back</p>
          {authState.error && (
            <div style={{ padding: '8px 12px', backgroundColor: '#fee2e2', borderRadius: '6px', marginBottom: '16px', color: '#dc2626' }}>
              {authState.error}
            </div>
          )}
          <div style={{ display: 'grid', gap: '12px' }}>
            <Input label="Email" type="email" value={email} onChange={setEmail} error={errors.email} />
            <Input label="Password" type="password" value={password} onChange={setPassword} error={errors.password} />
            <Button fullWidth loading={authState.isLoading} onClick={handleLogin}>Sign In</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

