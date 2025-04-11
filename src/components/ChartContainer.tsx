import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/Card';

interface DataPoint {
  label: string;
  value: number;
}

interface ChartContainerProps {
  title: string;
  data: DataPoint[];
  type?: 'bar' | 'line';
  loading?: boolean;
}

export function ChartContainer({ title, data, type = 'bar', loading = false }: ChartContainerProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card>
      <div style={{ fontWeight: 600, marginBottom: '16px' }}>{title}</div>
      {loading ? (
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
          Loading chart...
        </div>
      ) : data.length === 0 ? (
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
          No data available
        </div>
      ) : (
        <div ref={canvasRef} style={{ height: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', gap: '4px' }}>
            {data.map((point, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: (point.value / maxValue) * 100 + '%',
                  backgroundColor: '#2563eb',
                  borderRadius: '2px 2px 0 0',
                  minHeight: '2px',
                  transition: 'height 0.3s',
                }}
                title={point.label + ': ' + point.value}
              />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
