import React, { useState } from 'react'
import { Check, Crown, Mail, User, Building, Phone } from 'lucide-react'

const Upgrade: React.FC = () => {
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', plan: 'pro', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert('Please fill in your name and email.')
      return
    }
    setLoading(true)
    try {
      const apiBase = import.meta.env.VITE_API_URL || ''
      const res = await fetch(`${apiBase}/api/upgrade-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed to send')
      }
    } catch (e) {
      const subject = `Pro Upgrade Request — ${form.name}`
      const body = `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nPlan: ${form.plan}\nMessage: ${form.message}`
      window.location.href = `mailto:info@nexgenweblab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#F8FAFC'
    }}>
      <div style={{
        background: 'white', border: '1px solid #E2E8F0',
        borderRadius: '16px', padding: '48px',
        textAlign: 'center', maxWidth: '480px'
      }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: '#F0FDF4', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <Check size={28} color="#16A34A" />
        </div>
        <h2 style={{fontSize: '22px', fontWeight: '700', color: '#0F172A', marginBottom: '10px'}}>
          Request Received!
        </h2>
        <p style={{fontSize: '14px', color: '#64748B', lineHeight: '1.7'}}>
          Thank you for your interest in upgrading to Pro.
          Our team will contact you at <strong>{form.email}</strong> within 24 hours
          with payment details and account activation steps.
        </p>
        <p style={{fontSize: '13px', color: '#94A3B8', marginTop: '16px'}}>
          Questions? Email us at{' '}
          <a href="mailto:info@nexgenweblab.com" style={{color: '#4F46E5'}}>
            info@nexgenweblab.com
          </a>
        </p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight: '100vh', background: '#F8FAFC', padding: '40px 16px'}}>
      <div style={{maxWidth: '900px', margin: '0 auto'}}>

        <div style={{textAlign: 'center', marginBottom: '48px'}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#EEF2FF', color: '#4F46E5',
            padding: '6px 16px', borderRadius: '20px',
            fontSize: '13px', fontWeight: '500', marginBottom: '16px'
          }}>
            <Crown size={14} /> Upgrade to Pro
          </div>
          <h1 style={{
            fontSize: '32px', fontWeight: '700',
            color: '#0F172A', marginBottom: '12px'
          }}>
            Unlock the Full Power of NexGenWebLab
          </h1>
          <p style={{fontSize: '16px', color: '#64748B'}}>
            Fill out the form below and our team will contact you within 24 hours.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          <div style={{
            background: 'white', border: '1px solid #E2E8F0',
            borderRadius: '16px', padding: '28px'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              marginBottom: '24px'
            }}>
              <Crown size={20} color="#4F46E5" />
              <h2 style={{fontSize: '18px', fontWeight: '700', color: '#0F172A'}}>
                Pro Plan Features
              </h2>
            </div>

            {[
              'Unlimited SEO audits per day',
              'Full traffic analysis with SimilarWeb data',
              'AI-powered SEO recommendations',
              'White-label PDF & DOCX reports',
              'Bulk URL analysis (up to 50 URLs)',
              'Advanced keyword insights',
              'Domain authority metrics',
              'Technical security audit',
              'Priority email support',
              'API access for integrations'
            ].map((feature, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 0',
                borderBottom: i < 9 ? '1px solid #F8FAFC' : 'none'
              }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: '#F0FDF4', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={11} color="#16A34A" strokeWidth={2.5} />
                </div>
                <span style={{fontSize: '13px', color: '#374151'}}>{feature}</span>
              </div>
            ))}

            <div style={{
              marginTop: '24px', padding: '16px',
              background: '#EEF2FF', borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '28px', fontWeight: '800',
                color: '#4F46E5', marginBottom: '4px'
              }}>
                Contact Us
              </div>
              <div style={{fontSize: '12px', color: '#64748B'}}>
                for pricing — flexible plans available
              </div>
            </div>
          </div>

          <div style={{
            background: 'white', border: '1px solid #E2E8F0',
            borderRadius: '16px', padding: '28px'
          }}>
            <h2 style={{
              fontSize: '18px', fontWeight: '700',
              color: '#0F172A', marginBottom: '24px'
            }}>
              Request Pro Access
            </h2>

            {([
              { key: 'name', label: 'Full Name *', placeholder: 'John Smith', icon: User, type: 'text' },
              { key: 'email', label: 'Email Address *', placeholder: 'john@company.com', icon: Mail, type: 'email' },
              { key: 'company', label: 'Company / Agency', placeholder: 'Your company name', icon: Building, type: 'text' },
              { key: 'phone', label: 'Phone / WhatsApp', placeholder: '+1 234 567 8900', icon: Phone, type: 'tel' },
            ] as const).map(({ key, label, placeholder, icon: Icon, type }) => (
              <div key={key} style={{marginBottom: '16px'}}>
                <label style={{
                  display: 'block', fontSize: '13px',
                  fontWeight: '500', color: '#374151', marginBottom: '6px'
                }}>
                  {label}
                </label>
                <div style={{position: 'relative'}}>
                  <Icon size={15} color="#94A3B8" style={{
                    position: 'absolute', left: '12px',
                    top: '50%', transform: 'translateY(-50%)'
                  }} />
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={e => setForm({...form, [key]: e.target.value})}
                    style={{
                      width: '100%', height: '44px',
                      border: '1px solid #E2E8F0', borderRadius: '10px',
                      padding: '0 14px 0 36px', fontSize: '14px',
                      color: '#0F172A', outline: 'none',
                      fontFamily: 'inherit', boxSizing: 'border-box'
                    }}
                    onFocus={e => e.target.style.borderColor = '#4F46E5'}
                    onBlur={e => e.target.style.borderColor = '#E2E8F0'}
                  />
                </div>
              </div>
            ))}

            <div style={{marginBottom: '16px'}}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '500', color: '#374151', marginBottom: '6px'
              }}>
                Message (optional)
              </label>
              <textarea
                placeholder="Tell us about your needs, expected usage, or any questions..."
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                rows={3}
                style={{
                  width: '100%', border: '1px solid #E2E8F0',
                  borderRadius: '10px', padding: '12px 14px',
                  fontSize: '14px', color: '#0F172A',
                  fontFamily: 'inherit', resize: 'vertical',
                  outline: 'none', boxSizing: 'border-box'
                }}
                onFocus={e => e.target.style.borderColor = '#4F46E5'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', height: '48px',
                background: loading ? '#94A3B8' : '#4F46E5',
                color: 'white', border: 'none',
                borderRadius: '10px', fontSize: '15px',
                fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s'
              }}
            >
              {loading ? 'Sending Request...' : 'Request Pro Access'}
            </button>

            <p style={{
              fontSize: '12px', color: '#94A3B8',
              textAlign: 'center', marginTop: '12px'
            }}>
              We'll contact you within 24 hours with payment details.
              No commitment required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upgrade
