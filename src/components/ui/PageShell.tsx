'use client';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import CursorSpotlight from '@/components/ui/CursorSpotlight';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScanBot from '@/components/ScanBot';
import { SCAN_ENABLED } from '@/data/features';

interface Props {
  children: ReactNode;
  hideFooter?: boolean;
}

export default function PageShell({ children, hideFooter }: Props) {
  return (
    <>
      <CursorSpotlight />
      <TopBar />
      <ScrollProgress />
      {SCAN_ENABLED && <ScanBot />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'var(--bottom-nav-h)', position: 'relative', zIndex: 2 }}
      >
        {children}
        {!hideFooter && <Footer />}
      </motion.main>
      <BottomNav />
    </>
  );
}
