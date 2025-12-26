import type { CleaningStrategy } from '../types/homeassistant';

interface CleaningModeModalProps {
  opened: boolean;
  onClose: () => void;
  cleaningMode: CleaningStrategy;
  onModeChange: (mode: CleaningStrategy) => void;
}

export function CleaningModeModal({
  opened,
  onClose,
  cleaningMode,
  onModeChange,
}: CleaningModeModalProps) {
  if (!opened) return null;

  const isCleanGenius = cleaningMode === 'CleanGenius';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 999,
        }}
      />
      
      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#f5f5f7',
          borderRadius: '20px 20px 0 0',
          padding: '0 20px 20px',
          zIndex: 1000,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: '36px',
            height: '5px',
            background: 'rgba(0,0,0,0.15)',
            borderRadius: '3px',
            margin: '12px auto 20px',
          }}
        />

        {/* Mode Toggle */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: '#e8e8e8', borderRadius: '12px', padding: '4px' }}>
          <button
            onClick={() => onModeChange('CleanGenius')}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              backgroundColor: cleaningMode === 'CleanGenius' ? 'white' : 'transparent',
              color: '#1a1a1a',
              boxShadow: cleaningMode === 'CleanGenius' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            CleanGenius
          </button>
          <button
            onClick={() => onModeChange('Custom')}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: 500,
              cursor: 'pointer',
              backgroundColor: cleaningMode === 'Custom' ? 'white' : 'transparent',
              color: '#1a1a1a',
              boxShadow: cleaningMode === 'Custom' ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Custom
          </button>
        </div>

        {isCleanGenius ? (
          <>
            {/* Free your hands section - CleanGenius only */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: '0 0 12px' }}>
                Free your hands
              </p>
              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '120px',
                }}
              >
                <span style={{ fontSize: '13px', color: '#999' }}>Room map visualization</span>
              </div>
            </div>

            {/* Intelligent Recommended Cleaning Parameters */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: '0 0 12px' }}>
                Intelligent Recommended Cleaning Parameters
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'white',
                  borderRadius: '12px',
                }}
              >
                <span style={{ fontSize: '15px', color: '#1a1a1a' }}>Reclean dirty rooms/zones (Optional)</span>
                <label style={{ position: 'relative', display: 'inline-block', width: '51px', height: '31px' }}>
                  <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                  <span
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: '#e0e0e0',
                      transition: '0.4s',
                      borderRadius: '31px',
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        height: '27px',
                        width: '27px',
                        left: '2px',
                        bottom: '2px',
                        backgroundColor: 'white',
                        transition: '0.4s',
                        borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    />
                  </span>
                </label>
              </div>
            </div>

            {/* Cleaning Mode */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: '0 0 12px' }}>
                Cleaning Mode
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div
                  style={{
                    position: 'relative',
                    border: '3px solid #D4AF37',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'white',
                    padding: '24px 16px',
                    boxShadow: '0 0 0 4px rgba(212, 175, 55, 0.15)',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '28px' }}>💧</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>Vac & Mop</span>
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#D4AF37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: 'white' }}>✓</span>
                  </div>
                </div>
                <div
                  style={{
                    border: '2px solid #e0e0e0',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    background: 'white',
                    padding: '24px 16px',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #A0E7FF 0%, #5AC8FA 100%)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>➜</span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a1a' }}>Mop after Vac</span>
                </div>
              </div>
            </div>

            {/* Deep Cleaning */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'white',
                borderRadius: '12px',
              }}
            >
              <span style={{ fontSize: '15px', color: '#1a1a1a' }}>Deep Cleaning</span>
              <label style={{ position: 'relative', display: 'inline-block', width: '51px', height: '31px' }}>
                <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                <span
                  style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#e0e0e0',
                    transition: '0.4s',
                    borderRadius: '31px',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      height: '27px',
                      width: '27px',
                      left: '2px',
                      bottom: '2px',
                      backgroundColor: 'white',
                      transition: '0.4s',
                      borderRadius: '50%',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  />
                </span>
              </label>
            </div>
          </>
        ) : (
          <>
            {/* Custom Mode - Cleaning Mode */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: '0 0 12px' }}>
                Cleaning Mode
              </p>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {[
                  { icon: '🌀', label: 'Vacuum', color: '#e0e0e0' },
                  { icon: '💧', label: 'Mop', color: '#e0e0e0' },
                  { icon: '🔄', label: 'Vac & Mop', color: '#D4AF37', selected: true },
                  { icon: '➜', label: 'Mop after Vac', color: '#e0e0e0' },
                  { icon: '⚙️', label: 'Custom...', color: '#e0e0e0' },
                ].map((mode, idx) => (
                  <div
                    key={idx}
                    style={{
                      minWidth: '80px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: mode.selected ? '#D4AF37' : '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '28px',
                        border: mode.selected ? '3px solid #D4AF37' : 'none',
                        boxShadow: mode.selected ? '0 0 0 4px rgba(212, 175, 55, 0.2)' : 'none',
                      }}
                    >
                      {mode.icon}
                    </div>
                    <span style={{ fontSize: '12px', color: '#666', textAlign: 'center', lineHeight: '1.2' }}>
                      {mode.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suction Power */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: '0 0 12px' }}>
                Suction Power
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {[
                  { icon: '🌙', label: 'Quiet' },
                  { icon: '🔄', label: 'Standard' },
                  { icon: '🌀', label: 'Turbo', selected: true },
                  { icon: '⚡', label: 'Max' },
                ].map((power, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: power.selected ? '#D4AF37' : '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '28px',
                        border: power.selected ? '3px solid #D4AF37' : 'none',
                        boxShadow: power.selected ? '0 0 0 4px rgba(212, 175, 55, 0.2)' : 'none',
                      }}
                    >
                      {power.icon}
                    </div>
                    <span style={{ fontSize: '13px', color: '#1a1a1a', textAlign: 'center' }}>
                      {power.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Max+ toggle */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500 }}>Max+</span>
                  <label style={{ position: 'relative', display: 'inline-block', width: '51px', height: '31px' }}>
                    <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
                    <span
                      style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#e0e0e0',
                        transition: '0.4s',
                        borderRadius: '31px',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          height: '27px',
                          width: '27px',
                          left: '2px',
                          bottom: '2px',
                          backgroundColor: 'white',
                          transition: '0.4s',
                          borderRadius: '50%',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      />
                    </span>
                  </label>
                </div>
                <p style={{ fontSize: '13px', color: '#999', margin: 0, lineHeight: '1.4' }}>
                  The suction power will be increased to the highest level, which is a single-use mode.
                </p>
              </div>
            </div>

            {/* Wetness */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: '0 0 12px' }}>
                Wetness
              </p>
              
              {/* Slider */}
              <div style={{ position: 'relative', padding: '0 8px', marginBottom: '12px' }}>
                <input
                  type="range"
                  min="0"
                  max="30"
                  defaultValue="20"
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '3px',
                    outline: 'none',
                    background: 'linear-gradient(to right, #D4AF37 0%, #D4AF37 66%, #e0e0e0 66%, #e0e0e0 100%)',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-32px',
                    left: '66%',
                    transform: 'translateX(-50%)',
                    background: '#D4AF37',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)',
                  }}
                >
                  20
                </div>
              </div>

              {/* Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px', marginTop: '24px' }}>
                <span style={{ fontSize: '13px', color: '#999' }}>Slightly dry</span>
                <span style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: 500 }}>Moist</span>
                <span style={{ fontSize: '13px', color: '#999' }}>Wet</span>
              </div>
            </div>

            {/* Mop-washing frequency */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: 'white',
                borderRadius: '12px',
                marginBottom: '16px',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '15px', color: '#1a1a1a' }}>Mop-washing frequency</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#999' }}>By Area 20m²</span>
                <span style={{ fontSize: '18px', color: '#999' }}>›</span>
              </div>
            </div>

            {/* Route */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <p style={{ fontSize: '15px', color: '#1a1a1a', fontWeight: 500, margin: 0 }}>
                  Route
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1.5px solid #999',
                    fontSize: '11px',
                    color: '#999',
                    fontWeight: 600,
                  }}
                >
                  ?
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {[
                  { icon: '⌇', label: 'Quick' },
                  { icon: '≡', label: 'Standard', selected: true },
                  { icon: '⋮⋮', label: 'Intensive' },
                  { icon: '⫴', label: 'Deep' },
                ].map((route, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: route.selected ? '#D4AF37' : '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '32px',
                        border: route.selected ? '3px solid #D4AF37' : 'none',
                        boxShadow: route.selected ? '0 0 0 4px rgba(212, 175, 55, 0.2)' : 'none',
                        fontWeight: 300,
                      }}
                    >
                      {route.icon}
                    </div>
                    <span style={{ fontSize: '13px', color: '#1a1a1a', textAlign: 'center' }}>
                      {route.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
