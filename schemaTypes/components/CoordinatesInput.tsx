import {useCallback, useState} from 'react'
import {set, type ObjectInputProps} from 'sanity'

/**
 * Parses coordinates from any of:
 *  - Full Google Maps URLs (the `!3d..!4d..` place pin, `@lat,lng` viewport, or `q=/ll=` params)
 *  - Degrees-minutes-seconds: 0°32'24.2"S 31°37'19.9"E
 *  - Plain decimal pairs: -0.5400625, 31.6221875
 */
function parseCoordinates(input: string): {lat: number; lng: number} | null {
  const s = input.trim()
  if (!s) return null

  // Google Maps place pin (most precise) — check before "@" which is only the viewport centre
  let m = s.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/)
  if (m) return {lat: Number(m[1]), lng: Number(m[2])}

  // Google Maps viewport: @lat,lng
  m = s.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
  if (m) return {lat: Number(m[1]), lng: Number(m[2])}

  // q= / ll= / query= URL params
  m = s.match(/[?&](?:q|ll|query)=(-?\d+(?:\.\d+)?)(?:,|%2C)(-?\d+(?:\.\d+)?)/i)
  if (m) return {lat: Number(m[1]), lng: Number(m[2])}

  // DMS: 0°32'24.2"S 31°37'19.9"E (minutes/seconds optional, ′″ variants accepted)
  const dms = s.match(
    /(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*['′]\s*)?(?:(\d+(?:\.\d+)?)\s*["″]\s*)?([NS])\s*,?\s*(\d+(?:\.\d+)?)\s*°\s*(?:(\d+(?:\.\d+)?)\s*['′]\s*)?(?:(\d+(?:\.\d+)?)\s*["″]\s*)?([EW])/i
  )
  if (dms) {
    const lat =
      (Number(dms[1]) + Number(dms[2] ?? 0) / 60 + Number(dms[3] ?? 0) / 3600) *
      (dms[4].toUpperCase() === 'S' ? -1 : 1)
    const lng =
      (Number(dms[5]) + Number(dms[6] ?? 0) / 60 + Number(dms[7] ?? 0) / 3600) *
      (dms[8].toUpperCase() === 'W' ? -1 : 1)
    return {lat: Number(lat.toFixed(7)), lng: Number(lng.toFixed(7))}
  }

  // Plain decimal pair: "lat, lng" or "lat lng"
  m = s.match(/^(-?\d+(?:\.\d+)?)\s*[,\s]\s*(-?\d+(?:\.\d+)?)$/)
  if (m) {
    const lat = Number(m[1])
    const lng = Number(m[2])
    if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return {lat, lng}
  }

  return null
}

const boxStyle: React.CSSProperties = {
  border: '1px solid rgba(128,128,128,0.35)',
  borderRadius: 4,
  padding: 10,
  marginBottom: 12,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '8px 10px',
  borderRadius: 3,
  border: '1px solid rgba(128,128,128,0.4)',
  background: 'transparent',
  color: 'inherit',
  fontSize: 13,
  fontFamily: 'inherit',
}

export function CoordinatesInput(props: ObjectInputProps) {
  const {onChange, renderDefault} = props
  const [raw, setRaw] = useState('')
  const parsed = parseCoordinates(raw)

  const apply = useCallback(() => {
    if (!parsed) return
    onChange(set({lat: parsed.lat, lng: parsed.lng}))
    setRaw('')
  }, [parsed, onChange])

  return (
    <div>
      <div style={boxStyle}>
        <div style={{fontSize: 12, fontWeight: 600, marginBottom: 6}}>
          Paste a Google Maps link or coordinates
        </div>
        <input
          type="text"
          value={raw}
          onChange={(e) => setRaw(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              apply()
            }
          }}
          placeholder={`e.g. https://www.google.com/maps/place/... or 0°32'24.2"S 31°37'19.9"E or -0.54006, 31.62219`}
          style={inputStyle}
        />
        {raw.trim() &&
          (parsed ? (
            <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 8}}>
              <span style={{fontSize: 12, color: '#3ab667'}}>
                ✓ Latitude {parsed.lat}, Longitude {parsed.lng}
              </span>
              <button
                type="button"
                onClick={apply}
                style={{
                  padding: '4px 12px',
                  borderRadius: 3,
                  border: '1px solid #3ab667',
                  background: 'transparent',
                  color: '#3ab667',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Use these coordinates
              </button>
            </div>
          ) : (
            <div style={{fontSize: 12, color: '#c98a1b', marginTop: 8}}>
              Could not read coordinates from this yet. For short links (maps.app.goo.gl), open the
              link in your browser first, then copy the full URL from the address bar.
            </div>
          ))}
      </div>
      {renderDefault(props)}
    </div>
  )
}
