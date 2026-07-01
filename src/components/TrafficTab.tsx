import React from 'react'
import { Globe, TrendingUp, Search, BarChart3 } from 'lucide-react'

interface TrafficData {
  monthly_visits?: number
  bounce_rate?: number
  pages_per_visit?: number
  avg_duration?: number
  global_rank?: number
  top_countries?: Array<{country: string, visits: number, share: number}>
  top_keywords?: Array<{keyword: string, visits: number, position: number}>
  traffic_sources?: {
    search?: number
    direct?: number
    social?: number
    referral?: number
    mail?: number
    paid?: number
  }
}

interface TrafficTabProps {
  data: TrafficData | null
  isPro?: boolean
}

const TrafficTab: React.FC<TrafficTabProps> = ({ data, isPro: _isPro }) => {

  if (!data) return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px 20px', textAlign: 'center'
    }}>
      <BarChart3 size={48} color="#E2E8F0" strokeWidth={1} />
      <p style={{color: '#94A3B8', marginTop: '16px', fontSize: '15px'}}>
        No traffic data available for this domain.
      </p>
      <p style={{color: '#CBD5E1', fontSize: '13px', marginTop: '8px'}}>
        Traffic data is sourced from SimilarWeb via RapidAPI.
      </p>
    </div>
  )

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '16px'
  }

  const sectionHeading: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  }

  const statCard: React.CSSProperties = {
    background: '#F8FAFC',
    border: '1px solid #F1F5F9',
    borderRadius: '10px',
    padding: '16px',
    textAlign: 'center'
  }

  const statValue: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#4F46E5',
    display: 'block'
  }

  const statLabel: React.CSSProperties = {
    fontSize: '11px',
    color: '#94A3B8',
    marginTop: '4px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse' as const
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left' as const,
    fontSize: '11px',
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    padding: '8px 12px',
    borderBottom: '1px solid #F1F5F9'
  }

  const tdStyle: React.CSSProperties = {
    padding: '10px 12px',
    fontSize: '13px',
    color: '#374151',
    borderBottom: '1px solid #F8FAFC'
  }

  const formatNumber = (n?: number) => {
    if (!n) return '—'
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M'
    if (n >= 1000) return (n/1000).toFixed(1) + 'K'
    return n.toLocaleString()
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '—'
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
  }

  return (
    <div style={{padding: '8px 0'}}>

      {/* Overview Stats */}
      <div style={cardStyle}>
        <div style={sectionHeading}>
          <BarChart3 size={16} color="#4F46E5" />
          Traffic Overview
          {data.global_rank && (
            <span style={{
              marginLeft: 'auto', fontSize: '12px',
              background: '#EEF2FF', color: '#4F46E5',
              padding: '3px 10px', borderRadius: '20px',
              fontWeight: '500'
            }}>
              Global Rank #{data.global_rank.toLocaleString()}
            </span>
          )}
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px'
        }}>
          <div style={statCard}>
            <span style={statValue}>{formatNumber(data.monthly_visits)}</span>
            <span style={statLabel}>Monthly Visits</span>
          </div>
          <div style={statCard}>
            <span style={statValue}>
              {data.bounce_rate ? (data.bounce_rate * 100).toFixed(1) + '%' : '—'}
            </span>
            <span style={statLabel}>Bounce Rate</span>
          </div>
          <div style={statCard}>
            <span style={statValue}>
              {data.pages_per_visit ? data.pages_per_visit.toFixed(1) : '—'}
            </span>
            <span style={statLabel}>Pages/Visit</span>
          </div>
          <div style={statCard}>
            <span style={statValue}>{formatDuration(data.avg_duration)}</span>
            <span style={statLabel}>Avg Duration</span>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      {data.traffic_sources && (
        <div style={cardStyle}>
          <div style={sectionHeading}>
            <TrendingUp size={16} color="#4F46E5" />
            Traffic Distribution
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {Object.entries(data.traffic_sources)
              .filter(([_, v]) => v && v > 0)
              .sort(([_,a], [__,b]) => (b||0) - (a||0))
              .map(([source, value]) => (
              <div key={source}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '5px'
                }}>
                  <span style={{fontSize: '13px', color: '#374151', textTransform: 'capitalize'}}>
                    {source} Traffic
                  </span>
                  <span style={{fontSize: '13px', fontWeight: '600', color: '#0F172A'}}>
                    {((value||0) * 100).toFixed(1)}%
                  </span>
                </div>
                <div style={{
                  height: '6px', background: '#F1F5F9',
                  borderRadius: '3px', overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${((value||0) * 100).toFixed(1)}%`,
                    background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
                    borderRadius: '3px',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Countries */}
      {data.top_countries && data.top_countries.length > 0 && (
        <div style={cardStyle}>
          <div style={sectionHeading}>
            <Globe size={16} color="#4F46E5" />
            Top Countries
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Country</th>
                <th style={{...thStyle, textAlign: 'right'}}>Visits</th>
                <th style={{...thStyle, textAlign: 'right'}}>Share</th>
              </tr>
            </thead>
            <tbody>
              {data.top_countries.slice(0, 8).map((c, i) => (
                <tr key={i} style={{background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}}>
                  <td style={tdStyle}>
                    <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                      <span style={{
                        width: '20px', height: '20px',
                        background: '#EEF2FF', borderRadius: '50%',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '10px',
                        color: '#4F46E5', fontWeight: '700',
                        flexShrink: 0
                      }}>{i+1}</span>
                      {c.country}
                    </div>
                  </td>
                  <td style={{...tdStyle, textAlign: 'right', fontWeight: '500'}}>
                    {formatNumber(c.visits)}
                  </td>
                  <td style={{...tdStyle, textAlign: 'right'}}>
                    <span style={{
                      background: '#EEF2FF', color: '#4F46E5',
                      padding: '2px 8px', borderRadius: '10px',
                      fontSize: '12px', fontWeight: '500'
                    }}>
                      {typeof c.share === 'number'
                        ? (c.share < 1 ? (c.share * 100).toFixed(1) : c.share.toFixed(1)) + '%'
                        : c.share}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Top Keywords */}
      {data.top_keywords && data.top_keywords.length > 0 && (
        <div style={cardStyle}>
          <div style={sectionHeading}>
            <Search size={16} color="#4F46E5" />
            Top Organic Keywords
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Keyword</th>
                <th style={{...thStyle, textAlign: 'right'}}>Monthly Visits</th>
                <th style={{...thStyle, textAlign: 'center'}}>Position</th>
              </tr>
            </thead>
            <tbody>
              {data.top_keywords.slice(0, 10).map((kw, i) => {
                const keyword = kw.keyword || ''
                const visits = kw.visits || 0
                const position = kw.position || 0
                return (
                  <tr key={i} style={{background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}}>
                    <td style={{...tdStyle, color: '#94A3B8', width: '30px'}}>
                      {i+1}
                    </td>
                    <td style={{...tdStyle, fontWeight: '500', color: '#0F172A'}}>
                      {keyword}
                    </td>
                    <td style={{...tdStyle, textAlign: 'right'}}>
                      {formatNumber(visits)}
                    </td>
                    <td style={{...tdStyle, textAlign: 'center'}}>
                      <span style={{
                        background: position === 1
                          ? '#F0FDF4' : '#F8FAFC',
                        color: position === 1
                          ? '#16A34A' : '#64748B',
                        padding: '2px 8px', borderRadius: '10px',
                        fontSize: '12px', fontWeight: '600'
                      }}>
                        #{position}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default TrafficTab
