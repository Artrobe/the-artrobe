'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import { artworks } from '@/data/artworks';

type CameraState = 'idle' | 'requesting' | 'active' | 'denied' | 'nocamera' | 'insecure' | 'unsupported';

interface OverlayState {
  scale: number;
  x: number;
  y: number;
  rotation: number;
}

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [selectedArtwork, setSelectedArtwork] = useState(artworks[0]);
  const [overlay, setOverlay] = useState<OverlayState>({ scale: 0.6, x: 0, y: 0, rotation: 0 });
  const [artworkImage, setArtworkImage] = useState<HTMLImageElement | null>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) setPlatform('ios');
    else if (/Android/.test(ua)) setPlatform('android');
    else setPlatform('desktop');
  }, []);

  // Canvas drag
  const isDragging = useRef(false);
  const dragStart = useRef({ cx: 0, cy: 0, ox: 0, oy: 0 });

  // Pre-select artwork from URL ?id= param
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      const found = artworks.find(a => a.id === id);
      if (found) setSelectedArtwork(found);
    }
  }, []);

  // Do NOT auto-request. Safari (and increasingly Chrome) only show the camera
  // prompt in response to a user gesture — calling getUserMedia on mount fails
  // silently and strands the page on "waiting". We only probe the stored state
  // so an already-granted visitor skips the extra tap.
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState('unsupported');
      return;
    }
    // getUserMedia is only available over HTTPS or on localhost.
    if (!window.isSecureContext) {
      setCameraState('insecure');
      return;
    }
    navigator.permissions?.query({ name: 'camera' as PermissionName })
      .then(result => {
        if (result.state === 'granted') requestCamera();
        else if (result.state === 'denied') setCameraState('denied');
        else setCameraState('idle');
      })
      .catch(() => setCameraState('idle'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startStream(stream: MediaStream) {
    const video = videoRef.current;
    if (!video) return;
    video.srcObject = stream;
    // readyState >= HAVE_METADATA means dimensions are already known; waiting on
    // the event in that case would hang forever with the camera light on.
    if (video.readyState < 1) {
      await new Promise<void>(resolve => {
        const done = () => resolve();
        video.onloadedmetadata = done;
        setTimeout(done, 3000); // don't hang if the event never fires
      });
    }
    try { await video.play(); } catch {}
    setCameraState('active');
  }

  const requestCamera = async () => {
    setCameraState('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      await startStream(stream);
    } catch {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        await startStream(stream);
      } catch {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          await startStream(stream);
        } catch (err) {
          // Distinguish "user said no" from "there is no camera" — they need
          // different instructions.
          const name = (err as DOMException)?.name;
          if (name === 'NotFoundError' || name === 'OverconstrainedError') {
            setCameraState('nocamera');
          } else {
            setCameraState('denied');
          }
        }
      }
    }
  };

  // Stop camera tracks on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Load artwork image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setArtworkImage(img);
    img.src = selectedArtwork.img;
  }, [selectedArtwork]);

  // Draw canvas with video + overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !videoRef.current || cameraState !== 'active') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const video = videoRef.current;
    let rafId: number;

    const draw = () => {
      // Skip until video has real frames
      if (!video.videoWidth || !video.videoHeight || video.readyState < 2) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      if (artworkImage) {
        ctx.save();
        ctx.translate(canvas.width / 2 + overlay.x, canvas.height / 2 + overlay.y);
        ctx.rotate((overlay.rotation * Math.PI) / 180);
        const w = artworkImage.width * overlay.scale;
        const h = artworkImage.height * overlay.scale;
        ctx.drawImage(artworkImage, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [cameraState, overlay, artworkImage]);

  const captureImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${selectedArtwork.title}-scan-${Date.now()}.png`;
    link.click();
  };

  return (
    <PageShell>
      <div style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem) 1.25rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            Visualize
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
            fontWeight: 300, color: 'var(--text)', letterSpacing: '-0.01em',
            lineHeight: 1.1, marginBottom: '0.5rem',
          }}>
            Scan Your Wall
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)',
            lineHeight: 1.6, maxWidth: '50ch',
          }}>
            Point your camera at your wall and overlay artwork in real-time to see how it looks in your space.
          </p>
        </Reveal>
      </div>

      {/* Camera viewport */}
      <div style={{
        position: 'relative', width: '100%',
        height: 'clamp(260px, 55vw, 480px)',
        background: '#111', margin: '1.5rem 0', overflow: 'hidden',
      }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: 'absolute', width: '100%', height: '100%',
            objectFit: 'cover', display: cameraState === 'active' ? 'block' : 'none',
          }}
        />
        <canvas
          ref={canvasRef}
          onPointerDown={e => {
            if (cameraState !== 'active') return;
            isDragging.current = true;
            (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
            const canvas = canvasRef.current!;
            const rect = canvas.getBoundingClientRect();
            const sx = (canvas.width || 1280) / rect.width;
            const sy = (canvas.height || 720) / rect.height;
            dragStart.current = { cx: e.clientX * sx, cy: e.clientY * sy, ox: overlay.x, oy: overlay.y };
          }}
          onPointerMove={e => {
            if (!isDragging.current) return;
            const canvas = canvasRef.current!;
            const rect = canvas.getBoundingClientRect();
            const sx = (canvas.width || 1280) / rect.width;
            const sy = (canvas.height || 720) / rect.height;
            setOverlay(prev => ({
              ...prev,
              x: dragStart.current.ox + (e.clientX * sx - dragStart.current.cx),
              y: dragStart.current.oy + (e.clientY * sy - dragStart.current.cy),
            }));
          }}
          onPointerUp={() => { isDragging.current = false; }}
          style={{
            position: 'absolute', width: '100%', height: '100%',
            cursor: cameraState === 'active' ? 'grab' : 'default',
            touchAction: 'none',
          }}
        />

        {/* Drag hint — shown while camera is active */}
        {cameraState === 'active' && (
          <div style={{
            position: 'absolute', bottom: '0.6rem', left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.45)', borderRadius: '1rem',
            padding: '0.25rem 0.7rem', pointerEvents: 'none',
            fontFamily: 'var(--sans)', fontSize: '0.55rem',
            color: 'rgba(255,255,255,0.8)', letterSpacing: '0.1em',
            textTransform: 'uppercase', whiteSpace: 'nowrap', zIndex: 2,
          }}>
            Drag to move painting
          </div>
        )}

        {/* Permission prompt — shown before any request */}
        {cameraState === 'idle' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1.2rem',
            background: 'rgba(0,0,0,0.82)', padding: '2rem', textAlign: 'center',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(110,158,102,0.15)', border: '1px solid rgba(110,158,102,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
            }}>
              📷
            </div>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: '#fff', margin: '0 0 0.4rem' }}>
                Allow camera to continue
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
                Your browser will ask for permission. Nothing is uploaded — the
                preview stays on your device.
              </p>
            </div>
            <motion.button
              onClick={requestCamera}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: 'var(--green)', color: 'var(--text)', border: 'none',
                borderRadius: '2rem', padding: '0.85rem 2rem',
                fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(110,158,102,0.35)',
              }}
            >
              Open Camera →
            </motion.button>
          </div>
        )}

        {/* Requesting state */}
        {cameraState === 'requesting' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            background: 'rgba(0,0,0,0.8)', color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--sans)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem',
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: 'var(--green)', borderRightColor: 'var(--green)',
              }}
            />
            <p style={{ margin: 0 }}>Waiting for camera permission…</p>
            <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.6 }}>
              Check the address bar for a permission prompt
            </p>
          </div>
        )}

        {/* Denied state */}
        {(cameraState === 'insecure' || cameraState === 'unsupported' || cameraState === 'nocamera') && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.9rem',
            background: 'rgba(0,0,0,0.85)', padding: '2rem', textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: '#fff', margin: 0 }}>
              {cameraState === 'nocamera' ? 'No camera found' : 'Camera unavailable here'}
            </p>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.8rem', lineHeight: 1.7,
              color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: '32ch',
            }}>
              {cameraState === 'nocamera'
                ? 'This device does not report a usable camera. Try opening the page on your phone.'
                : cameraState === 'insecure'
                  ? 'Camera access needs a secure connection. Open this page over https:// (or on localhost) and try again.'
                  : 'This browser does not support camera access. Try Chrome or Safari on your phone.'}
            </p>
          </div>
        )}

        {cameraState === 'denied' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            background: 'rgba(0,0,0,0.92)', padding: '1.5rem', overflowY: 'auto',
          }}>
            <div style={{ fontSize: '2rem' }}>🚫</div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', color: '#fff', margin: 0, textAlign: 'center' }}>
              Camera blocked
            </p>

            {/* Steps */}
            <div style={{
              background: 'rgba(255,255,255,0.07)', borderRadius: 12,
              padding: '1rem 1.1rem', width: '100%', maxWidth: 300,
            }}>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.7rem',
              }}>
                {platform === 'ios' ? 'Fix on iPhone / iPad' : platform === 'android' ? 'Fix on Android' : 'Fix in Browser'}
              </p>

              {platform === 'ios' && [
                'Open iPhone Settings',
                'Scroll down → tap Safari (or Chrome)',
                'Tap Camera → select Allow',
                'Come back and refresh this page',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.55rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--sans)', fontSize: '0.65rem', fontWeight: 700,
                    color: 'var(--green)', minWidth: 18, paddingTop: 1,
                  }}>{i + 1}.</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}

              {platform === 'android' && [
                'Tap the 🔒 lock icon in the address bar',
                'Tap Permissions → Camera',
                'Change to Allow',
                'Refresh this page and tap Allow Camera',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.55rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--sans)', fontSize: '0.65rem', fontWeight: 700,
                    color: 'var(--green)', minWidth: 18, paddingTop: 1,
                  }}>{i + 1}.</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}

              {platform === 'desktop' && [
                'Click the 🔒 lock icon in the address bar',
                'Click Site settings → Camera',
                'Set to Allow',
                'Refresh this page',
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.55rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'var(--sans)', fontSize: '0.65rem', fontWeight: 700,
                    color: 'var(--green)', minWidth: 18, paddingTop: 1,
                  }}>{i + 1}.</span>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.button
                onClick={() => window.location.reload()}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'var(--green)', color: 'var(--text)', border: 'none',
                  borderRadius: '2rem', padding: '0.75rem 1.6rem',
                  fontFamily: 'var(--sans)', fontSize: '0.74rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(110,158,102,0.3)',
                }}
              >
                Refresh Page
              </motion.button>
              <motion.button
                onClick={requestCamera}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: '2rem',
                  padding: '0.75rem 1.4rem',
                  fontFamily: 'var(--sans)', fontSize: '0.74rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Try Again
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Artwork Selector */}
      <section style={{ padding: '0 1.25rem 1.5rem' }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.7rem',
        }}>
          Select Artwork
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: '0.7rem', maxHeight: '200px', overflowY: 'auto',
        }}>
          {artworks.map(art => (
            <motion.button
              key={art.id}
              onClick={() => setSelectedArtwork(art)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative', width: '100%', aspectRatio: '0.8',
                border: selectedArtwork.id === art.id ? '2px solid var(--green)' : '1px solid var(--border)',
                borderRadius: 8, background: 'var(--cream)', cursor: 'pointer',
                overflow: 'hidden', padding: 0,
              }}
            >
              <img src={art.img} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
              <span style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                color: '#fff', fontFamily: 'var(--sans)', fontSize: '0.5rem',
                padding: '0.3rem', textAlign: 'center',
              }}>
                {art.title}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Controls */}
      <section style={{ padding: '0 1.25rem 2rem' }}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem',
        }}>
          Adjust
        </p>
        <div style={{ display: 'grid', gap: '1.2rem' }}>
          {[
            { label: 'Size', key: 'scale', min: 0.2, max: 1.5, step: 0.05, display: `${(overlay.scale * 100).toFixed(0)}%` },
            { label: 'Horizontal', key: 'x', min: -300, max: 300, step: 10, display: `${overlay.x.toFixed(0)}px` },
            { label: 'Vertical', key: 'y', min: -300, max: 300, step: 10, display: `${overlay.y.toFixed(0)}px` },
            { label: 'Rotation', key: 'rotation', min: -180, max: 180, step: 5, display: `${overlay.rotation.toFixed(0)}°` },
          ].map(ctrl => (
            <div key={ctrl.key}>
              <label style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: 'var(--sans)', fontSize: '0.75rem', color: 'var(--text)', marginBottom: '0.5rem',
              }}>
                <span>{ctrl.label}</span>
                <span style={{ color: 'var(--green)' }}>{ctrl.display}</span>
              </label>
              <input
                type="range"
                min={ctrl.min}
                max={ctrl.max}
                step={ctrl.step}
                value={overlay[ctrl.key as keyof OverlayState]}
                onChange={e =>
                  setOverlay(prev => ({ ...prev, [ctrl.key]: parseFloat(e.target.value) }))
                }
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Capture */}
      <div style={{ padding: '0 1.25rem 3rem', display: 'flex', gap: '0.7rem' }}>
        <button
          onClick={captureImage}
          disabled={cameraState !== 'active'}
          style={{
            flex: 1, background: 'var(--green)', color: 'var(--text)', border: 'none',
            borderRadius: '2rem', padding: '1rem',
            fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase', cursor: cameraState === 'active' ? 'pointer' : 'not-allowed',
            boxShadow: '0 8px 22px rgba(110,158,102,0.25)',
            opacity: cameraState === 'active' ? 1 : 0.45,
          }}
        >
          Capture & Download
        </button>
        <button
          onClick={() => setOverlay({ scale: 0.6, x: 0, y: 0, rotation: 0 })}
          style={{
            background: 'var(--cream)', color: 'var(--text)',
            border: '1px solid var(--border)', borderRadius: '2rem', padding: '1rem 1.5rem',
            fontFamily: 'var(--sans)', fontSize: '0.78rem', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </PageShell>
  );
}
